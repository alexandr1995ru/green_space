import { MetadataRoute } from 'next';
import { absoluteUrl, company, services, siteUrl } from '@/lib/site-data';
import { HERO_VARIANTS } from '@/lib/hero-variants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: '2026-04-16',
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        absoluteUrl(company.ogImage),
        ...services.map((service) => absoluteUrl(service.image)),
      ],
    },
  ];

  const variantEntries: MetadataRoute.Sitemap = Object.keys(HERO_VARIANTS).map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: '2026-05-13',
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...base, ...variantEntries];
}
