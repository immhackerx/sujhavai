import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { documents, analysisHistory } from '@/lib/db/schema';
import { verifyToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userDocs = await db.query.documents.findMany({
      where: eq(documents.userId, payload.userId),
    });

    const userHistories = await db.query.analysisHistory.findMany({
      where: eq(analysisHistory.userId, payload.userId),
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalDocuments: userDocs.length,
        totalAnalyses: userHistories.length,
      },
      recentUploads: userDocs.slice(-5).reverse(), // Last 5 docs
      user: {
        username: payload.username,
        role: payload.role
      }
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
