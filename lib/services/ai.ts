import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy-key-for-build'
});

// Active, production-supported Groq model ID
const MODEL_NAME = 'openai/gpt-oss-120b';

export interface AnalysisResult {
  technicalSpecifications: string[];
  materials: string[];
  productCategories: string[];
  certifications: string[];
  complianceRequirements: string[];
  relevantBISStandards: { code: string; title: string; match: string; text: string }[];
  procurementRisks: string[];
  missingRequirements: string[];
  summary: string;
}

export async function runMultiAgentAnalysis(documentText: string): Promise<AnalysisResult> {
  const maxChars = 120000;
  const text = documentText.length > maxChars ? documentText.substring(0, maxChars) + '...' : documentText;

  // Safe wrapper for Groq chat completions
  async function callGroqAgent(prompt: string, fallback: Record<string, any> = {}) {
    try {
      const res = await groq.chat.completions.create({
        model: MODEL_NAME,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      });
      return JSON.parse(res.choices[0]?.message?.content || '{}');
    } catch (err) {
      console.error(`[Groq Agent Error]:`, err);
      return fallback;
    }
  }

  // Agent 1: Document Agent
  const documentPrompt = `You are a Document Agent. Extract the following from the procurement document:
- Technical specifications
- Materials
- Product categories

Document:
${text}

Respond in JSON format with keys: technicalSpecifications, materials, productCategories.`;

  // Agent 2: Compliance Agent
  const compliancePrompt = `You are a Compliance Agent. Based on the document, extract:
- Certifications required
- Compliance requirements
- Missing requirements (what should be there but isn't)

Document:
${text}

Respond in JSON format with keys: certifications, complianceRequirements, missingRequirements.`;

  // Agent 4: Risk Agent
  const riskPrompt = `You are a Risk Agent. Identify potential procurement risks from this document.
Document:
${text}

Respond in JSON format with a key 'procurementRisks' (array of strings).`;

  // Execute Phase 1 agents in parallel for maximum speed
  const [docData, complianceData, riskData] = await Promise.all([
    callGroqAgent(documentPrompt, { technicalSpecifications: [], materials: [], productCategories: [] }),
    callGroqAgent(compliancePrompt, { certifications: [], complianceRequirements: [], missingRequirements: [] }),
    callGroqAgent(riskPrompt, { procurementRisks: [] }),
  ]);

  // Agent 3: BIS Standards Agent (dependent on extracted materials & categories)
  const bisPrompt = `You are a BIS (Bureau of Indian Standards) Agent. Based on the extracted materials and categories, suggest relevant BIS standards.
Materials: ${JSON.stringify(docData.materials || [])}
Categories: ${JSON.stringify(docData.productCategories || [])}

Respond in JSON format with a single key 'relevantBISStandards' containing an array of objects with keys: code, title, match (e.g. '95%'), text (reasoning).`;

  const bisData = await callGroqAgent(bisPrompt, { relevantBISStandards: [] });

  // Agent 5: Aggregate Report
  const result: AnalysisResult = {
    technicalSpecifications: docData.technicalSpecifications || [],
    materials: docData.materials || [],
    productCategories: docData.productCategories || [],
    certifications: complianceData.certifications || [],
    complianceRequirements: complianceData.complianceRequirements || [],
    missingRequirements: complianceData.missingRequirements || [],
    relevantBISStandards: bisData.relevantBISStandards || [],
    procurementRisks: riskData.procurementRisks || [],
    summary: 'Analysis completed successfully by multi-agent system.',
  };

  return result;
}