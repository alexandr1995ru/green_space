import type { ReactNode } from 'react';

export type HeroVariant = {
  slug: string;
  headingLines: string[];
  description: ReactNode;
  posterImage: string;
  showBackgroundVideo: boolean;
  meta: {
    title: string;
    description: string;
    ogTitle?: string;
  };
};

export const HERO_VARIANTS = {
  klesch: {
    slug: 'klesch',
    headingLines: ['Сезон', 'без клещей!'],
    description: 'Производим обработку от клещей по Москве и области.',
    posterImage: '/images/hero/klesch.jpg',
    showBackgroundVideo: false,
    meta: {
      title: 'Обработка от клещей в Москве и области — Зеленый Контур',
      description:
        'Профессиональная акарицидная обработка участков от клещей. Гарантия результата. Выезд по Москве и Московской области.',
    },
  },
  borchevik: {
    slug: 'borchevik',
    headingLines: ['Уничтожение', 'борщевика', 'на участке'],
    description: 'Москва и область. Гарантия результата.',
    posterImage: '/images/hero/borchevik.jpg',
    showBackgroundVideo: false,
    meta: {
      title: 'Уничтожение борщевика в Москве и области — Зеленый Контур',
      description:
        'Гербицидная обработка борщевика на участке. Гарантия результата. Москва и Московская область.',
    },
  },
  kroty: {
    slug: 'kroty',
    headingLines: ['Избавим', 'от кротов', 'на участке'],
    description: 'Москва и область. Гарантия результата.',
    posterImage: '/images/hero/kroty.jpg',
    showBackgroundVideo: false,
    meta: {
      title: 'Уничтожение кротов в Москве и области — Зеленый Контур',
      description:
        'Эффективная газация и отлов кротов. Гарантия результата. Выезд по Москве и Московской области.',
    },
  },
} as const satisfies Record<string, HeroVariant>;

export const DEFAULT_VARIANT: HeroVariant = {
  slug: 'default',
  headingLines: ['Сезон', 'без клещей', 'и борщевика'],
  description: (
    <>
      Профессиональная защита территорий. Фиксируем цену в договоре{' '}
      <span className="text-white font-bold">от 3 500 ₽</span> с гарантией результата до 3 лет.
    </>
  ),
  posterImage: '/images/hero_poster.jpg',
  showBackgroundVideo: true,
  meta: {
    title: 'Зеленый Контур | Уничтожение клещей, борщевика и арбористика',
    description:
      'Зеленый Контур — профессиональная расчистка участков, уничтожение клещей, кротов, борщевика и безопасный спил аварийных деревьев.',
  },
};

export function getVariant(slug: string | undefined): HeroVariant | null {
  if (!slug) return null;
  return (HERO_VARIANTS as Record<string, HeroVariant>)[slug] ?? null;
}
