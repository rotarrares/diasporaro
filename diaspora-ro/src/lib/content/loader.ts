import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { TopicContent, DocumentContent, DocumentId, TopicId, CountryCode, WorkSituation } from '@/lib/types';

const contentDirectory = path.join(process.cwd(), 'src/content');

/**
 * Get all topic MDX files
 */
export async function getAllTopics(): Promise<TopicContent[]> {
  const topicsDir = path.join(contentDirectory, 'topics');
  const topics: TopicContent[] = [];

  // Read all topic subdirectories
  const topicFolders = fs.readdirSync(topicsDir);

  for (const folder of topicFolders) {
    const folderPath = path.join(topicsDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.mdx'));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      topics.push({
        slug: data.slug || file.replace('.mdx', ''),
        title: data.title,
        topic: folder as TopicId,
        countries: data.countries || [],
        situations: data.situations || [],
        summary: data.summary || '',
        content,
        faqs: data.faqs || [],
        relatedDocuments: data.relatedDocuments || [],
        sources: data.sources || [],
        lastUpdated: data.lastUpdated || new Date().toISOString(),
      });
    }
  }

  return topics;
}

/**
 * Get a single topic by slug
 */
export async function getTopicBySlug(slug: string): Promise<TopicContent | null> {
  const topics = await getAllTopics();
  return topics.find(topic => topic.slug === slug) || null;
}

/**
 * Get all document MDX files
 */
export async function getAllDocuments(): Promise<DocumentContent[]> {
  const documentsDir = path.join(contentDirectory, 'documents');
  const documents: DocumentContent[] = [];

  const files = fs.readdirSync(documentsDir).filter(file => file.endsWith('.mdx'));

  for (const file of files) {
    const filePath = path.join(documentsDir, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    documents.push({
      slug: data.slug as DocumentId,
      title: data.title,
      officialName: data.officialName,
      purpose: data.purpose,
      whoNeeds: data.whoNeeds || [],
      whoDoesntNeed: data.whoDoesntNeed || [],
      howToObtain: data.howToObtain || [],
      processingTime: data.processingTime || '',
      cost: data.cost || '',
      validityPeriod: data.validityPeriod || '',
      officialLink: data.officialLink || '',
      templateLink: data.templateLink,
      content,
    });
  }

  return documents;
}

/**
 * Get a single document by slug
 */
export async function getDocumentBySlug(slug: DocumentId): Promise<DocumentContent | null> {
  const documents = await getAllDocuments();
  return documents.find(doc => doc.slug === slug) || null;
}

/**
 * Get topics filtered by country and situation
 */
export async function getTopicsForProfile(
  country: CountryCode,
  situation: WorkSituation
): Promise<TopicContent[]> {
  const allTopics = await getAllTopics();
  return allTopics.filter(
    topic =>
      topic.countries.includes(country) &&
      topic.situations.includes(situation)
  );
}
