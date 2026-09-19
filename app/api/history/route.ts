import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { analysisHistory, documents } from '@/lib/db/schema';
import { verifyToken } from '@/lib/auth';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const history = await db
      .select({
        id: analysisHistory.id,
        createdAt: analysisHistory.createdAt,
        documentId: analysisHistory.documentId,
        filename: documents.filename,
        analysisJson: analysisHistory.analysisJson,
      })
      .from(analysisHistory)
      .leftJoin(documents, eq(analysisHistory.documentId, documents.id))
      .where(eq(analysisHistory.userId, payload.userId))
      .orderBy(desc(analysisHistory.createdAt));

    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
