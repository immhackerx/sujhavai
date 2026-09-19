import { ChromaClient } from 'chromadb';
import OpenAI from 'openai';
import Groq from 'groq-sdk';

const chroma = new ChromaClient({ path: process.env.CHROMA_URL || 'http://localhost:8000' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build' });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy-key-for-build' });

const COLLECTION_NAME = 'procurement_documents';

async function getCollection() {
  return await chroma.getOrCreateCollection({
    name: COLLECTION_NAME,
    metadata: { "hnsw:space": "cosine" }
  });
}

function chunkText(text: string, maxTokens: number = 500): string[] {
  // Simplistic chunking by paragraphs/sentences
  const chunks: string[] = [];
  const paragraphs = text.split('\n\n');
  let currentChunk = '';

  for (const para of paragraphs) {
    if (currentChunk.length + para.length > maxTokens * 4) {
      chunks.push(currentChunk);
      currentChunk = para;
    } else {
      currentChunk += '\n\n' + para;
    }
  }
  if (currentChunk.trim().length > 0) chunks.push(currentChunk);
  
  return chunks;
}

export async function storeDocumentInChroma(documentId: string, text: string) {
  try {
    const collection = await getCollection();
    const chunks = chunkText(text);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      // Generate embedding using OpenAI
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk,
      });
      const embedding = embeddingResponse.data[0].embedding;

      await collection.add({
        ids: [`${documentId}-chunk-${i}`],
        embeddings: [embedding],
        metadatas: [{ documentId, chunkIndex: i }],
        documents: [chunk],
      });
    }
    console.log(`Stored ${chunks.length} chunks for document ${documentId} in ChromaDB.`);
  } catch (error) {
    console.error('Error storing document in ChromaDB:', error);
  }
}

export async function queryDocumentChroma(documentId: string, query: string, topK: number = 3) {
  try {
    const collection = await getCollection();
    
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });
    const queryEmbedding = embeddingResponse.data[0].embedding;

    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: topK,
      where: { documentId: documentId }
    });

    return results.documents[0] as string[];
  } catch (error) {
    console.error('Error querying ChromaDB:', error);
    return [];
  }
}

export async function generateChatResponse(documentId: string, query: string): Promise<string> {
  const contextChunks = await queryDocumentChroma(documentId, query);
  
  if (contextChunks.length === 0) {
    // If no context found in ChromaDB, fallback to normal LLM
    const res = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [{ role: 'user', content: `You are a procurement assistant. Answer the user's question.\n\nQuestion: ${query}` }],
    });
    return res.choices[0].message.content || 'No response generated.';
  }

  const context = contextChunks.join('\n\n---\n\n');
  const prompt = `You are a helpful procurement assistant. Use the following excerpts from the user's uploaded procurement document to answer their question. If the answer is not in the document, say so.\n\nDocument Context:\n${context}\n\nQuestion: ${query}\n\nAnswer clearly and concisely based on the context.`;

  const res = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
  });

  return res.choices[0].message.content || 'No response generated.';
}
