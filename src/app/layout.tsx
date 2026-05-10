import type { Metadata } from 'next';
import { Onest, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/layout/ScrollProgress';
import QuizModal from '@/components/layout/QuizModal';
import FloatingContact from '@/components/layout/FloatingContact';
import AnalyticsScripts from '@/components/layout/AnalyticsScripts';
import FilmGrain from '@/components/ui/FilmGrain';
import Preloader from '@/components/layout/Preloader';
import CookieBanner from '@/components/ui/CookieBanner';
import { cn } from "@/lib/utils";
import { absoluteUrl, aggregateRating, company, faqs, howToSteps, reviews, services, siteUrl } from '@/lib/site-data';

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: company.brandName,
  title: {
    default: `${company.brandName} | Уничтожение клещей, борщевика и арбористика`,
    template: `%s | ${company.brandName}`,
  },
  description: `${company.brandName} — профессиональная расчистка участков, уничтожение клещей, кротов, борщевика и безопасный спил аварийных деревьев. Работаем с выездом по Москве и Московской области. Гарантия по договору.`,
  keywords: ['уничтожение клещей', 'обработка от клещей', 'уничтожение борщевика', 'спил деревьев', 'удаление кротов', 'арбористика', 'расчистка участка', 'зеленый контур', 'дезинсекция'],
  authors: [{ name: company.brandName, url: siteUrl }],
  creator: company.brandName,
  publisher: company.brandName,
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${company.brandName} | Уничтожение клещей и арбористика`,
    description: 'Уничтожение клещей, борщевика и безопасный спил деревьев. Работаем с B2B и частными лицами по Москве и области.',
    url: siteUrl,
    siteName: company.brandName,
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: company.ogImage,
        width: 2752,
        height: 1536,
        alt: `${company.brandName} — профессиональная защита земельных участков`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.brandName} | Расчистка участков`,
    description: 'Профессиональные услуги арбористов и дезинсекторов с гарантией.',
    images: [company.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationId = `${siteUrl}/#organization`;
const businessId = `${siteUrl}/#local-business`;
const websiteId = `${siteUrl}/#website`;
const webPageId = `${siteUrl}/#webpage`;
const offerCatalogId = `${siteUrl}/#services`;
const howToId = `${siteUrl}/#how-to`;
const aggregateRatingId = `${siteUrl}/#aggregate-rating`;

const areaServed = company.areaServed.map((name) => ({
  '@type': 'AdministrativeArea',
  name,
}));

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: company.brandName,
      url: siteUrl,
      email: company.email,
      telephone: company.phone,
      sameAs: company.sameAs,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: company.phone,
          contactType: 'customer service',
          areaServed: 'RU',
          availableLanguage: ['ru'],
        },
      ],
    },
    {
      '@type': 'HomeAndConstructionBusiness',
      '@id': businessId,
      additionalType: ['https://schema.org/PestControl'],
      name: company.brandName,
      url: siteUrl,
      image: absoluteUrl(company.ogImage),
      email: company.email,
      telephone: company.phone,
      description: 'Официальная служба по расчистке территорий, уничтожению клещей, борщевика и безопасному спилу деревьев.',
      areaServed,
      priceRange: company.priceRange,
      parentOrganization: {
        '@id': organizationId,
      },
      hasOfferCatalog: {
        '@id': offerCatalogId,
      },
      aggregateRating: {
        '@id': aggregateRatingId,
      },
      review: reviews.map((review) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.name,
        },
        datePublished: review.dateIso,
        reviewBody: review.text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
        itemReviewed: {
          '@id': businessId,
        },
      })),
    },
    {
      '@type': 'AggregateRating',
      '@id': aggregateRatingId,
      itemReviewed: {
        '@id': businessId,
      },
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
      worstRating: aggregateRating.worstRating,
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: siteUrl,
      name: company.brandName,
      inLanguage: 'ru-RU',
      publisher: {
        '@id': organizationId,
      },
    },
    {
      '@type': 'WebPage',
      '@id': webPageId,
      url: siteUrl,
      name: `${company.brandName} | Уничтожение клещей, борщевика и арбористика`,
      description: metadata.description,
      inLanguage: 'ru-RU',
      isPartOf: {
        '@id': websiteId,
      },
      about: {
        '@id': businessId,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: absoluteUrl(company.ogImage),
        width: 2752,
        height: 1536,
      },
    },
    {
      '@type': 'OfferCatalog',
      '@id': offerCatalogId,
      name: `Услуги ${company.brandName}`,
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        name: `${service.pricingTitle} — ${service.price}`,
        url: `${siteUrl}/#services`,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'RUB',
          minPrice: service.minPrice,
        },
        itemOffered: {
          '@type': 'Service',
          name: service.pricingTitle,
          alternateName: service.title,
          description: service.description,
          image: absoluteUrl(service.image),
          provider: {
            '@id': businessId,
          },
          areaServed,
        },
      })),
    },
    {
      '@type': 'HowTo',
      '@id': howToId,
      name: 'Как мы обрабатываем участок — процесс от заявки до гарантии',
      description: 'Четыре прозрачных шага: от быстрой заявки до гарантийного сопровождения результата.',
      totalTime: 'P1D',
      supply: [],
      tool: [],
      step: howToSteps.map((step) => ({
        '@type': 'HowToStep',
        position: step.position,
        name: step.name,
        text: step.text,
        ...(step.duration ? { timeRequired: step.duration } : {}),
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn("h-full", "antialiased", "scroll-smooth scroll-pt-32 lg:scroll-pt-40", onest.variable, jetbrainsMono.variable, "font-sans")}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="font-sans bg-[#F5F5F0] text-foreground min-h-full flex flex-col">
        <AnalyticsScripts />
        <FilmGrain />
        <Preloader />
        <SmoothScroll>
          <ScrollProgress />
          {children}
          <FloatingContact />
          <QuizModal />
          <CookieBanner />
        </SmoothScroll>
      </body>
    </html>
  );
}
