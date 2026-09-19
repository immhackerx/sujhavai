import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { generateChatResponse } from '@/lib/services/chroma';
import { db } from '@/lib/db';
import { bisStandards } from '@/lib/db/schema';
import { or, ilike } from 'drizzle-orm';
import Groq from 'groq-sdk';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY is not configured in .env" }, { status: 400 });
    }

    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { documentId, query } = body;
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    let answer = null;
    let fallbackToDb = false;

    if (documentId) {
      try {
        answer = await generateChatResponse(documentId, query);
      } catch (chromaError) {
        console.error('[Chat API Error]: Chroma/Groq failed for document', chromaError);
        fallbackToDb = true;
      }
    } else {
      fallbackToDb = true;
    }

    if (fallbackToDb) {
      // Fallback to database search
      const searchTerm = `%${query}%`;
      const matchingStandards = await db.select().from(bisStandards).where(
        or(
          ilike(bisStandards.title, searchTerm),
          ilike(bisStandards.description, searchTerm),
          ilike(bisStandards.keywords, searchTerm)
        )
      ).limit(5);

      if (matchingStandards.length === 0) {
        return NextResponse.json({ success: true, answer: "No matching BIS standards found in the database." });
      }

      const context = matchingStandards.map(s => `Code: ${s.code}\nTitle: ${s.title}\nDescription: ${s.description}`).join('\n\n');

      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const prompt = `You are a helpful assistant. Use the following Indian Standards context to answer the user's query.\n\nContext:\n${context}\n\nQuery: ${query}`;

      const res = await groq.chat.completions.create({
        model: 'openai/gpt-oss-120b',
        messages: [{ role: 'user', content: prompt }],
      });

      answer = res.choices[0].message.content || 'No response generated.';
    }

    return NextResponse.json({ success: true, answer });

  } catch (error) {
    console.error('[Chat API Error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
