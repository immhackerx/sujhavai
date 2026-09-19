import pdf from 'pdf-parse-new';

export async function parsePdf(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    return data.text || '';
  } catch (error) {
    console.error('[PDF Parse Service Error]:', error);
    throw new Error('Failed to parse PDF document text.');
  }
}
