'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import faqData from '@/content/faqs/all-faqs.json';
import { searchFAQs } from '@/lib/content/search';
import { FAQ } from '@/lib/types';
import { useProfile } from '@/hooks/useProfile';
import { TOPICS, COUNTRIES } from '@/lib/types';

const faqs = faqData.faqs as FAQ[];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByProfile, setFilterByProfile] = useState(true);
  const { profile } = useProfile();

  const filteredFAQs = useMemo(() => {
    let filters = {};

    if (filterByProfile && profile) {
      filters = {
        country: profile.destinationCountry,
        situation: profile.workSituation,
      };
    }

    return searchFAQs(faqs, searchQuery, filters);
  }, [searchQuery, filterByProfile, profile]);

  const allFAQs = useMemo(() => {
    return searchFAQs(faqs, searchQuery, {});
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Întrebări Frecvente</h1>
        <p className="text-gray-600 text-sm mt-1">
          Răspunsuri rapide la întrebările tale
        </p>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Caută în întrebări..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filter Toggle */}
        {profile && (
          <div className="mb-4">
            <button
              onClick={() => setFilterByProfile(!filterByProfile)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                filterByProfile
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtrează pentru situația mea
            </button>
            {filterByProfile && profile.destinationCountry && (
              <p className="text-sm text-gray-500 mt-2">
                Afișez întrebări relevante pentru{' '}
                {COUNTRIES[profile.destinationCountry]?.name}
              </p>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          {filterByProfile && profile ? (
            <>
              {filteredFAQs.length} {filteredFAQs.length === 1 ? 'rezultat' : 'rezultate'}{' '}
              pentru situația ta
              {allFAQs.length > filteredFAQs.length && (
                <span className="text-gray-400">
                  {' '}
                  ({allFAQs.length} total)
                </span>
              )}
            </>
          ) : (
            <>
              {allFAQs.length} {allFAQs.length === 1 ? 'rezultat' : 'rezultate'}
            </>
          )}
        </div>

        {/* FAQs List */}
        {filteredFAQs.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-3">
            {filteredFAQs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white rounded-lg border shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-gray-50">
                  <div className="text-left pr-4">
                    <p className="font-medium text-gray-900">{faq.question}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {faq.topics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-xs"
                        >
                          {TOPICS[topic]?.icon} {TOPICS[topic]?.title}
                        </Badge>
                      ))}
                      {faq.countries.slice(0, 3).map((country) => (
                        <Badge
                          key={country}
                          variant="outline"
                          className="text-xs"
                        >
                          {COUNTRIES[country]?.flag} {COUNTRIES[country]?.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <p className="font-medium">Nu am găsit întrebări.</p>
              <p className="text-sm mt-2">
                {searchQuery
                  ? 'Încearcă un alt termen de căutare sau elimină filtrele.'
                  : 'Nu există întrebări pentru această situație.'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Show All Button */}
        {filterByProfile &&
          profile &&
          allFAQs.length > filteredFAQs.length &&
          filteredFAQs.length > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setFilterByProfile(false)}
                className="text-primary font-medium text-sm hover:underline"
              >
                Vezi toate cele {allFAQs.length} întrebări →
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
