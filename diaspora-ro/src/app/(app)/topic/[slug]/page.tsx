import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTopicBySlug, getAllTopics } from '@/lib/content/loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { TOPICS, COUNTRIES } from '@/lib/types';

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all topics
export async function generateStaticParams() {
  const topics = await getAllTopics();
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const topicInfo = TOPICS[topic.topic];
  const countryInfo = topic.countries[0] ? COUNTRIES[topic.countries[0]] : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Înapoi la Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl">{topicInfo.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{topic.title}</h1>
              {countryInfo && (
                <p className="text-sm text-gray-500">
                  {countryInfo.flag} {countryInfo.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Summary Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-700">{topic.summary}</p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MDXRemote source={topic.content} />
          </div>
        </div>

        {/* Related Documents */}
        {topic.relatedDocuments.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">📄 Documente Relevante</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topic.relatedDocuments.map((docId) => (
                  <Link
                    key={docId}
                    href={`/document/${docId}`}
                    className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-primary font-medium">
                      {docId.replace(/-/g, ' ').toUpperCase()}
                    </span>
                    <span className="ml-2">→</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sources */}
        {topic.sources && topic.sources.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">🔗 Surse Oficiale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topic.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-primary">{source.title}</p>
                        <p className="text-sm text-gray-500">{source.authority}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Last Updated */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Ultima actualizare: {new Date(topic.lastUpdated).toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
}
