import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { documents, analysisHistory } from '@/lib/db/schema';
import { verifyToken } from '@/lib/auth';
import { parsePdf } from '@/lib/services/pdf';
import { runMultiAgentAnalysis } from '@/lib/services/ai';
import { eq } from 'drizzle-orm';
import { readFile } from 'fs/promises';
import { storeDocumentInChroma } from '@/lib/services/chroma';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const contentType = req.headers.get('content-type') || '';
    let buffer: Buffer;
    let documentId: number | null = null;
    let doc: any = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      if (!file) {
        return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 });
      }
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      let body;
      try {
        body = await req.json();
      } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
      }

      documentId = body.documentId;
      if (!documentId) return NextResponse.json({ error: 'Document ID required' }, { status: 400 });

      doc = await db.query.documents.findFirst({
        where: eq(documents.id, documentId)
      });

      if (!doc) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

      // Update status
      await db.update(documents).set({ status: 'processing' }).where(eq(documents.id, documentId));

      // Read file
      buffer = await readFile(doc.filepath);
    }

    let text = '';
    try {
      text = await parsePdf(buffer);
    } catch (e) {
      console.error('[PDF Parse Error in Route]:', e);
      return NextResponse.json({ error: 'Failed to extract text from PDF.' }, { status: 422 });
    }
    
    text = text.trim();
    if (!text || text.length < 10) {
      return NextResponse.json({ error: 'Extracted text is empty or too short. Possibly a scanned PDF without text layer.' }, { status: 422 });
    }

    // Run AI Analysis (Cross-reference with bis_standards)
    const analysisResult = await runMultiAgentAnalysis(text);

    let historyId = null;
    if (documentId && doc) {
      // Save to ChromaDB for RAG
      if (text.length > 50) {
        // Don't await to speed up response
        storeDocumentInChroma(documentId.toString(), text).catch(console.error);
      }

      // Save History
      const [history] = await db.insert(analysisHistory).values({
        userId: payload.userId,
        documentId: doc.id,
        analysisJson: analysisResult,
      }).returning();
      
      historyId = history.id;

      // Mark document completed
      await db.update(documents).set({ status: 'completed' }).where(eq(documents.id, documentId));
    }

    return NextResponse.json({ success: true, analysis: analysisResult, historyId });

  } catch (error: any) {
    console.error('[Analyze API Crash]:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
