# 🇮🇳 Sujhav AI — Smart Procurement Intelligence

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-Fast_AI-f55036?style=for-the-badge)](https://groq.com/)
[![Neon](https://img.shields.io/badge/Neon-Serverless_Postgres-00e599?style=for-the-badge&logo=postgresql&logoColor=black)](https://neon.tech/)

**Sujhav AI** is an intelligent, RAG-powered procurement assistant built to automate technical specification drafting and Bureau of Indian Standards (BIS) compliance verification for government and public sector e-procurement. 

Developed for the **Smart India Hackathon (SIH) 2026** by **Team HexaCore**.

---

## 🚀 The Problem

Government departments and Public Sector Enterprises (PSEs) procure extensive equipment via portals like GeM. Drafting accurate tender specifications requires citing exact Indian Standards (IS). However, procurement officers face critical hurdles:
* **Overlapping Scopes:** Thousands of standards make it difficult to identify the correct base standard.
* **Complex Dependencies:** Primary standards rely on hidden normative references (testing, safety, materials) that must also be cited.
* **Outdated Specs:** Manual research often leads to quoting superseded versions or missing newly enacted amendments.
* **Compliance Risks:** Failing to mandate statutory requirements (like BIS ISI Mark, CRS, or Hallmarking) leads to supplier disputes and rejected tenders.

## 💡 Our Solution

Sujhav AI acts as a **Standards Compliance Dossier & Tender Maker**. Instead of relying on rigid keyword searches, users upload draft tenders (PDFs) or query the engine using natural, multilingual language. The AI semantically analyzes the requirements, maps the dependency tree of applicable standards, verifies versions, highlights mandatory compliance obligations, and automatically drafts tender-ready technical blueprints.

## ✨ Key Features

* **🧠 Semantic Retrieval Engine:** Uses vector embeddings to match requirements based on functional intent rather than exact keyword matching.
* **🔗 Knowledge Graph Mapping:** Distinctly identifies the **Primary Product Standard** while mapping out **Allied and Normative Standards** (categorized into Safety, Testing Methods, and Materials).
* **🔄 Version & Amendment Tracking:** Detects obsolete standards and recommends current, active editions alongside relevant amendments.
* **⚠️ Mandatory Certification Alerts:** Automatically evaluates if specified items fall under statutory Quality Control Orders (QCOs) and flags mandatory certifications (e.g., *BIS ISI Mark*, *CRS*).
* **📄 Automated Tender Maker:** Synthesizes verified standards and technical parameters into a formally structured, ready-to-publish procurement specification document.
* **🌍 Multilingual NLP:** Seamlessly processes queries in Hindi and regional languages, mapping colloquial phrasing to formal BIS engineering categories.

## 🛠️ Technical Architecture

* **Frontend:** Next.js (App Router), React, Tailwind CSS, Turbopack, `@tailwindcss/typography`
* **Backend:** Next.js API Routes (Node.js)
* **AI & NLP Pipeline:** Groq LPU inference running high-context LLMs (`openai/gpt-oss-120b`) for rapid specification extraction.
* **Database & ORM:** Neon Serverless PostgreSQL managed via Drizzle ORM.
* **Information Retrieval (RAG):** ChromaDB vector storage for fast semantic retrieval across BIS standard catalogs.

## 💻 Local Installation & Setup

**1. Clone the repository:**
```bash
git clone [https://github.com/your-username/sujhav-ai.git](https://github.com/your-username/sujhav-ai.git)
cd sujhav-ai
