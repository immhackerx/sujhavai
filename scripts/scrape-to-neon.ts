import axios from 'axios';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { bisStandards } from '../lib/db/schema';
import * as path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Setup database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

async function scrapeAndIngest() {
  const url = 'https://search.worldbank.org/api/v2/projects?format=json&rows=50';
  console.log(`[+] Fetching procurement/project data from public API: ${url}`);
  
  const startTime = Date.now();
  
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'SUJHAV-AI-Procurement-Bot/1.0',
      }
    });
    
    let fetchedCount = 0;
    let insertedCount = 0;
    
    const projects = data.projects;
    if (!projects) {
      throw new Error("Invalid data format received from API");
    }
    
    const projectKeys = Object.keys(projects).filter(k => k !== 'type');
    console.log(`[+] Found ${projectKeys.length} records. Beginning ingestion...`);
    
    for (const key of projectKeys) {
      const project = projects[key];
      
      const reference_no = project.id || key;
      const title = project.project_name || 'Unknown Project';
      
      // Use Cheerio to strip any HTML tags from abstract/description if present
      let rawDescription = project.project_abstract?.cdata || 'No description available';
      const $ = cheerio.load(rawDescription);
      const description = $.text().trim() || rawDescription;
      
      const category = project.regionname || 'International Project';
      
      if (reference_no && title) {
        fetchedCount++;
        
        try {
          await db.insert(bisStandards).values({
            code: reference_no,
            title: title,
            description: description.substring(0, 500), // Limit length
            keywords: category, // Mapping category to keywords
          }).onConflictDoNothing({ target: bisStandards.code });
          insertedCount++;
        } catch (dbErr) {
          console.error(`[-] Error inserting ${reference_no}:`, dbErr);
        }
      }
    }
    
    const executionTime = (Date.now() - startTime) / 1000;
    console.log('\n--- Ingestion Complete ---');
    console.log(`Records Fetched: ${fetchedCount}`);
    console.log(`Records Inserted/Upserted: ${insertedCount}`);
    console.log(`Execution Time: ${executionTime.toFixed(2)}s`);
    
  } catch (error) {
    console.error('[-] Error during scraping and ingestion:', error);
  } finally {
    await pool.end();
  }
}

scrapeAndIngest().then(() => {
   process.exit(0);
});
