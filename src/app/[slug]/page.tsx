import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Home from '@/components/Home';
import { HERO_VARIANTS, getVariant } from '@/lib/hero-variants';
import { company, siteUrl } from '@/lib/site-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(HERO_VARIANTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = getVariant(slug);
  if (!v) return {};
  const ogTitle = v.meta.ogTitle ?? v.meta.title;
  return {
    title: { absolute: v.meta.title },
    description: v.meta.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: ogTitle,
      description: v.meta.description,
      url: `${siteUrl}/${slug}`,
      siteName: company.brandName,
      locale: 'ru_RU',
      type: 'website',
      images: [{ url: company.ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: v.meta.description,
      images: [company.ogImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const variant = getVariant(slug);
  if (!variant) notFound();
  return <Home variant={variant} />;
}
