import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDocumentBySlug, getAllDocuments } from '@/lib/content/loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, FileText, Clock, Euro, Calendar } from 'lucide-react';
import Link from 'next/link';
import { DocumentPageClient } from './DocumentPageClient';

interface DocumentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all documents
export async function generateStaticParams() {
  const documents = await getAllDocuments();
  return documents.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { slug } = await params;
  const document = await getDocumentBySlug(slug as any);

  if (!document) {
    notFound();
  }

  return <DocumentPageClient document={document} />;
}
