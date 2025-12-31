import Fuse from 'fuse.js';
import { FAQ, CountryCode, WorkSituation, TopicId } from '@/lib/types';

/**
 * Create a Fuse.js search instance for FAQs
 */
export function createFAQSearch(faqs: FAQ[]) {
  return new Fuse(faqs, {
    keys: ['question', 'answer'],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  });
}

/**
 * Search FAQs with optional filters
 */
export function searchFAQs(
  faqs: FAQ[],
  query: string,
  filters?: {
    country?: CountryCode;
    situation?: WorkSituation;
    topic?: TopicId;
  }
): FAQ[] {
  let filteredFAQs = faqs;

  // Apply filters
  if (filters?.country) {
    filteredFAQs = filteredFAQs.filter(faq =>
      faq.countries.includes(filters.country!)
    );
  }

  if (filters?.situation) {
    filteredFAQs = filteredFAQs.filter(faq =>
      faq.situations.includes(filters.situation!)
    );
  }

  if (filters?.topic) {
    filteredFAQs = filteredFAQs.filter(faq =>
      faq.topics.includes(filters.topic!)
    );
  }

  // If no query, return filtered results
  if (!query.trim()) {
    return filteredFAQs;
  }

  // Search within filtered results
  const fuse = createFAQSearch(filteredFAQs);
  const results = fuse.search(query);
  return results.map(result => result.item);
}
