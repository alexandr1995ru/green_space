'use client';

import { Fragment, useEffect } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { company } from '@/lib/site-data';
import type { HeroVariant } from '@/lib/hero-variants';

const SERVICES = [
  { label: 'Клещи', desc: 'от 3 500 ₽' },
  { label: 'Борщевик', desc: 'от 4 000 ₽' },
  { label: 'Кроты', desc: 'от 4 000 ₽' },
  { label: 'Короед', desc: 'от 6 000 ₽' },
  { label: 'Комары', desc: 'от 3 500 ₽' },
];

type HeroService = typeof SERVICES[number];

const ACCENT = '#2D6A4F';
const FRAME_BG = '#F5F5F0';

/* ═══ ANIMATIONS ═══ */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};
const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

/* ═══ GEOMETRY: FILLET CORNERS ═══ */
function Fillet({ position, size = 32, className = '', color = '#F5F5F0' }: { position: 'tl' | 'tr' | 'bl' | 'br'; size?: number; className?: string; color?: string }) {
  const gradients: Record<string, string> = {
    tl: `radial-gradient(circle at 100% 100%, transparent ${size}px, ${color} ${size}px)`,
    tr: `radial-gradient(circle at 0% 100%, transparent ${size}px, ${color} ${size}px)`,
    bl: `radial-gradient(circle at 100% 0%, transparent ${size}px, ${color} ${size}px)`,
    br: `radial-gradient(circle at 0% 0%, transparent ${size}px, ${color} ${size}px)`,
  };
  return (
    <div
      className={`absolute pointer-events-none z-[10] ${className}`}
      style={{ width: size, height: size, background: gradients[position] }}
    />
  );
}

function FloatingPointer({
  service,
  className = '',
  lineClass,
  reverse = false,
}: {
  service: HeroService;
  className?: string;
  lineClass?: string;
  reverse?: boolean;
}) {
  return (
    <motion.div
      variants={fadeScale}
      className={`relative z-[10] flex items-center gap-3 group cursor-pointer pointer-events-auto ${reverse ? 'flex-row-reverse' : ''} ${className}`}
    >
      <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full transition-all duration-300 group-hover:bg-[#F5F5F0] group-hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        {/* Minimalist Accent Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
        <span className="text-[#1D1D1F] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap">
          {service.label} <span className="opacity-40 font-bold ml-1">{service.desc}</span>
        </span>
      </div>
      <div className={`h-[1.5px] bg-white transition-colors group-hover:bg-white/70 ${lineClass}`} style={{ boxShadow: '0 0 8px rgba(0,0,0,0.2)' }} />
      <div className={`w-2 h-2 rounded-full bg-white transition-transform group-hover:scale-150 shadow-md`} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION — GLITCH REFERENCE 1:1
   ═══════════════════════════════════════════ */
export default function Hero({ variant }: { variant: HeroVariant }) {
  const showVideo = variant.showBackgroundVideo;
  const poster = variant.posterImage;
  const headingNode = variant.headingLines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));

  // Deferred video load: set src AFTER page paint, then autoplay
  useEffect(() => {
    if (!showVideo) return;
    const video = document.getElementById('hero-bg-video') as HTMLVideoElement;
    if (!video) return;

    const loadAndPlay = () => {
      if (!video.src || !video.src.includes('hero_bg')) {
        video.src = '/videos/hero_bg.mp4';
      }
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    // Delay video load slightly so the UI paints first
    const timerId = window.setTimeout(loadAndPlay, 800);

    // Also try on first interaction (iOS Low Power Mode fallback)
    window.addEventListener('scroll', loadAndPlay, { once: true, passive: true });
    window.addEventListener('touchstart', loadAndPlay, { once: true, passive: true });
    window.addEventListener('click', loadAndPlay, { once: true, passive: true });

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener('scroll', loadAndPlay);
      window.removeEventListener('touchstart', loadAndPlay);
      window.removeEventListener('click', loadAndPlay);
    };
  }, [showVideo]);

  return (
    <section className="relative w-full h-[100svh] p-3 lg:p-6 overflow-hidden flex flex-col" style={{ backgroundColor: FRAME_BG }}>
      {/* 
        MAIN CONTAINER (The "Black" Video Area)
        Section padding: 12px mobile, 24px desktop
        Container radius: 28px mobile, 32px desktop
        → inner radii = container - padding = 16px / 8px
      */}
      <div className="relative w-full h-full rounded-[28px] lg:rounded-[32px] overflow-hidden bg-[#111] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
        
        {/* Z-0: Poster background (instant paint) + deferred video */}
        {showVideo ? (
          <div
            className="absolute inset-0 w-full h-full z-0 opacity-90 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: `url(${poster})` }}
            dangerouslySetInnerHTML={{
              __html: `<video id="hero-bg-video" class="w-full h-full object-cover" poster="${poster}" autoplay loop muted playsinline preload="metadata"></video>`,
            }}
          />
        ) : (
          <div
            className="absolute inset-0 w-full h-full z-0 opacity-90 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: `url(${poster})` }}
          />
        )}
        
        {/* Z-1: Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-[1]" />

        {/* ═══════════════════════════════════════════
            WHITE PROTRUSIONS (Bento Cavities)
            ═══════════════════════════════════════════ */}

        {/* 1. TOP-LEFT: Logo / Branding Area */}
        <div className="absolute top-0 left-0 rounded-br-[24px] lg:rounded-br-[32px] h-[64px] lg:h-[100px] flex items-center pl-5 pr-6 lg:pl-6 lg:pr-8 z-[10]" style={{ backgroundColor: FRAME_BG }}>
           <img src="/icons/logo.svg" alt={company.brandName} className="h-[32px] lg:h-[48px] w-auto text-[#1D1D1F]" />
           <Fillet position="tl" size={24} className="-bottom-[24px] left-0 lg:hidden" color={FRAME_BG} />
           <Fillet position="tl" size={32} className="-bottom-[32px] left-0 hidden lg:block" color={FRAME_BG} />
           <Fillet position="tl" size={24} className="top-0 -right-[24px] lg:hidden" color={FRAME_BG} />
           <Fillet position="tl" size={32} className="top-0 -right-[32px] hidden lg:block" color={FRAME_BG} />
        </div>

        {/* 2. TOP-RIGHT: Navigation & Contact Pill */}
        <div className="absolute top-0 right-0 rounded-bl-[24px] lg:rounded-bl-[32px] h-[64px] lg:h-[100px] flex items-center px-3 lg:px-8 gap-2 lg:gap-4 z-[10]" style={{ backgroundColor: FRAME_BG }}>
           <div className="hidden lg:flex items-center gap-7 mr-2 text-[13px] font-semibold tracking-wide uppercase text-black/60">
             <a href="#services" className="hover:text-black transition-colors">Услуги</a>
             <a href="#about" className="hover:text-black transition-colors">О нас</a>
             <a href="#faq" className="hover:text-black transition-colors">Вопросы</a>
           </div>
           
           <a href={company.telegramUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-black text-white rounded-full hover:scale-105 hover:bg-[#111] transition-transform shrink-0 shadow-lg">
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 lg:w-[18px] lg:h-[18px]"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/></svg>
           </a>

           <a href={company.maxUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-black text-white rounded-full hover:scale-105 hover:bg-[#111] transition-transform shrink-0 shadow-lg">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1000 1000" fill="currentColor" className="lg:w-[18px] lg:h-[18px]">
                <path d="M512.095,308.192c-99.422-5.214-177.007,63.775-194.116,171.753 c-14.168,89.419,10.952,198.378,32.438,203.862 c9.113,2.326,31.044-14.448,46.999-29.494c3-2.829,7.536-3.305,11.053-1.154 c24.872,15.209,53.032,26.638,84.077,28.266 c102.069,5.352,192.52-74.531,197.866-176.608 C695.759,402.741,614.163,313.544,512.095,308.192z M345.605,826.578 c-3.849-2.725-9.153-1.986-12.379,1.455 c-43.12,45.99-153.474,78.25-158.529,15.48c0-49.18-11.046-90.623-23.208-136.252 c-14.895-55.885-31.465-118.049-31.465-208.398 c0-215.448,176.694-377.475,386.194-377.475S879.976,291.325,879.976,500.955 S710.49,876.337,508.201,876.337C436.434,876.337,401.607,866.228,345.605,826.578z"/>
             </svg>
           </a>
           
           <a href={`tel:${company.phone}`} className="hidden sm:flex items-center justify-center h-12 px-7 text-white rounded-full text-[14px] font-bold tracking-wider hover:brightness-110 transition-all shadow-lg" style={{ backgroundColor: ACCENT }}>
             {company.phoneDisplay}
           </a>
           
           <Fillet position="tr" size={24} className="-bottom-[24px] right-0 lg:hidden" color={FRAME_BG} />
           <Fillet position="tr" size={32} className="-bottom-[32px] right-0 hidden lg:block" color={FRAME_BG} />
           <Fillet position="tr" size={24} className="top-0 -left-[24px] lg:hidden" color={FRAME_BG} />
           <Fillet position="tr" size={32} className="top-0 -left-[32px] hidden lg:block" color={FRAME_BG} />
        </div>

        {/* 3. BOTTOM-RIGHT: Trust Badges - PURE TYPOGRAPHY AESTHETIC */}
        <div className="hidden lg:flex absolute bottom-0 right-0 rounded-tl-[32px] p-6 lg:p-8 flex-col gap-5 w-[360px] z-[10]" style={{ backgroundColor: FRAME_BG }}>
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
             Рейтинг подрядчика
           </h3>
           
           {/* Pure Typography Trust Badge 1 */}
           <div className="relative overflow-hidden flex flex-col justify-center gap-1.5 px-6 py-5 bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-black/[0.03] transition-transform hover:-translate-y-1 h-[110px]">
              <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] relative z-10 w-full flex justify-between items-center">
                 Рейтинг Авито
                 <div className="flex gap-0.5 opacity-80">
                   {[1, 2, 3, 4, 5].map((i) => (
                     <svg key={i} className={`w-3.5 h-3.5 ${i === 5 ? 'text-black/10' : 'text-[#2D6A4F]'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                   ))}
                 </div>
              </span>
              <div className="flex items-end gap-2 relative z-10">
                 <span className="text-[48px] font-black text-[#1D1D1F] leading-[0.85] tracking-tight">4.9</span>
                 <span className="text-xs font-bold text-black/20 pb-1 mb-0.5">/ 5.0</span>
              </div>
           </div>

           {/* Pure Typography Trust Badge 2 */}
           <div className="relative overflow-hidden flex flex-col justify-center gap-1.5 px-6 py-5 bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-black/[0.03] transition-transform hover:-translate-y-1 h-[110px]">
              <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] relative z-10 w-full flex justify-between items-center">
                 Рейтинг Яндекс
                 <div className="flex gap-0.5 opacity-80">
                   {[1, 2, 3, 4, 5].map((i) => (
                     <svg key={i} className={`w-3.5 h-3.5 ${i === 5 ? 'text-black/10' : 'text-[#2D6A4F]'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                   ))}
                 </div>
              </span>
              <div className="flex items-end gap-2 relative z-10">
                 <span className="text-[48px] font-black text-[#1D1D1F] leading-[0.85] tracking-tight">4.8</span>
                 <span className="text-xs font-bold text-black/20 pb-1 mb-0.5">/ 5.0</span>
              </div>
           </div>

           <Fillet position="br" size={32} className="-top-[32px] right-0" color={FRAME_BG} />
           <Fillet position="br" size={32} className="bottom-0 -left-[32px]" color={FRAME_BG} />
        </div>

        {/* 4. BOTTOM: "Оперативность 2 часа" — right on mobile, left on desktop */}
        <div className="flex absolute bottom-[32%] lg:bottom-0 right-0 lg:right-auto lg:left-0 rounded-l-[24px] lg:rounded-l-none lg:rounded-tr-[32px] p-3 lg:p-6 z-[10] items-center" style={{ backgroundColor: FRAME_BG }}>
           <div className="relative overflow-hidden flex flex-col justify-center gap-1 lg:gap-1.5 px-5 py-3.5 lg:px-6 lg:py-5 bg-white rounded-[12px] lg:rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-black/[0.03] w-[140px] h-[80px] lg:w-[200px] lg:h-[110px]">
              <span className="text-[9px] lg:text-[10px] font-black text-black/40 uppercase tracking-[0.15em] lg:tracking-[0.2em] relative z-10">
                Оперативность
              </span>
              <div className="flex items-end gap-1 lg:gap-1.5 relative z-10">
                 <span className="text-[28px] lg:text-[36px] font-black text-[#1D1D1F] leading-[0.85] tracking-tight">2</span>
                 <span className="text-[13px] lg:text-[15px] font-bold text-black/20 pb-0.5">часа</span>
              </div>
              <span className="hidden lg:block text-[10px] font-semibold text-black/30 mt-0.5">выезд на объект</span>
           </div>
           {/* Desktop fillets (bottom-left position) */}
           <Fillet position="bl" size={32} className="-top-[32px] left-0 hidden lg:block" color={FRAME_BG} />
           <Fillet position="bl" size={32} className="bottom-0 -right-[32px] hidden lg:block" color={FRAME_BG} />
           {/* Mobile fillets — only RIGHT side (left side uses rounded-l-[24px]) */}
           <Fillet position="br" size={24} className="-top-[24px] right-0 lg:hidden" color={FRAME_BG} />
           <Fillet position="tr" size={24} className="-bottom-[24px] right-0 lg:hidden" color={FRAME_BG} />
        </div>

        {/* ═══════════════════════════════════════════
            MOBILE CONTENT — 4 independent blocks
            ═══════════════════════════════════════════ */}



        {/* MOBILE 2: Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden absolute left-5 right-3 bottom-[52%] z-[10] text-[44px] min-[375px]:text-[50px] sm:text-[68px] font-black text-white leading-[1.05] tracking-[-0.03em] break-words hyphens-auto pointer-events-none"
          style={{ textShadow: '0 4px 60px rgba(0,0,0,0.5)' }}
        >
          {headingNode}
        </motion.h1>

        {/* MOBILE 3: Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden absolute left-5 right-[165px] bottom-[calc(32%+12px)] z-[10] text-white/80 text-[13px] min-[375px]:text-[14px] sm:text-[18px] leading-snug font-medium pointer-events-none"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
        >
          {variant.description}
        </motion.p>

        {/* MOBILE 4: CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden absolute left-5 right-5 bottom-6 z-[10] bg-white/95 backdrop-blur-xl p-1.5 sm:p-2.5 rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.18)] flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2 pointer-events-auto"
        >
          <a
            href="#quiz"
            className="group relative overflow-hidden flex items-center justify-between h-[48px] pl-5 pr-1.5 rounded-full bg-[#2D6A4F] text-white font-bold text-[13px] uppercase tracking-[0.1em] transition-all hover:bg-[#245640] active:scale-95 sm:w-auto w-full"
          >
            <div className="relative overflow-hidden inline-flex items-center h-[20px] mr-6">
              <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]">
                Рассчитать стоимость
              </span>
              <span className="absolute inset-0 flex items-center justify-start translate-y-[120%] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" aria-hidden="true">
                Рассчитать стоимость
              </span>
            </div>
            <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-md transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-45">
              <ArrowUpRight className="w-5 h-5 text-[#2D6A4F]" strokeWidth={2.5} />
            </div>
          </a>
          <a
            href="#services"
            className="group relative overflow-hidden flex items-center justify-between h-[48px] pl-5 pr-1.5 rounded-full bg-[#1D1D1F] text-white font-bold text-[13px] uppercase tracking-[0.1em] transition-all hover:bg-black active:scale-95 sm:w-auto w-full"
          >
            <div className="relative overflow-hidden inline-flex items-center h-[20px] mr-6">
              <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]">
                Наши цены
              </span>
              <span className="absolute inset-0 flex items-center justify-start translate-y-[120%] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" aria-hidden="true">
                Наши цены
              </span>
            </div>
            <div className="w-[40px] h-[40px] rounded-full bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-45 group-hover:bg-white">
              <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[#1D1D1F] transition-colors duration-300" strokeWidth={2.5} />
            </div>
          </a>
          <a
            href={`tel:${company.phone}`}
            className="group flex items-center justify-between h-[48px] pl-5 pr-1.5 rounded-full bg-black/[0.04] text-[#1D1D1F] font-bold text-[13px] tracking-[0.05em] transition-all hover:bg-black/[0.07] active:scale-95 w-full"
          >
            <span className="text-[13px] font-bold tracking-wider">{company.phoneDisplay}</span>
            <div className="w-[40px] h-[40px] rounded-full bg-[#2D6A4F] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Phone className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
          </a>
        </motion.div>

        {/* ═══════════════════════════════════════════
            DESKTOP CONTENT — heading + description only
            ═══════════════════════════════════════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="hidden lg:block absolute lg:left-16 lg:top-[50%] lg:-translate-y-1/2 z-[10] max-w-3xl pointer-events-none"
        >
          <motion.h1
            variants={fadeUp}
            className="text-[96px] font-black text-white leading-[1.05] tracking-[-0.03em] mb-6 break-words hyphens-auto"
            style={{ textShadow: '0 4px 60px rgba(0,0,0,0.5)' }}
          >
            {headingNode}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-white/80 text-[20px] max-w-[520px] leading-relaxed font-medium mb-8"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            {variant.description}
          </motion.p>
        </motion.div>


        {/* DESKTOP CTA — bottom-right inner corner, stacked in white pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex absolute bottom-[20px] right-[380px] z-[10] bg-white/95 backdrop-blur-xl p-2.5 rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.18)] flex-col gap-2 pointer-events-auto"
        >
          <a href="#contacts" className="group relative overflow-hidden flex items-center justify-between h-[60px] pl-7 pr-2 rounded-full bg-[#2D6A4F] text-white font-bold text-[13px] uppercase tracking-[0.08em] transition-all hover:bg-[#245640] active:scale-95 w-[340px]">
            <div className="relative overflow-hidden inline-flex items-center h-[24px] mr-4">
              <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]">Рассчитать стоимость</span>
              <span className="absolute inset-0 flex items-center justify-start translate-y-[120%] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" aria-hidden="true">Рассчитать стоимость</span>
            </div>
            <div className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-md transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-45">
              <ArrowUpRight className="w-5 h-5 text-[#2D6A4F]" strokeWidth={2.5} />
            </div>
          </a>
          <a href="#services" className="group relative overflow-hidden flex items-center justify-between h-[60px] pl-7 pr-2 rounded-full bg-[#1D1D1F] text-white font-bold text-[13px] uppercase tracking-[0.08em] transition-all hover:bg-black active:scale-95 w-[340px]">
            <div className="relative overflow-hidden inline-flex items-center h-[24px] mr-4">
              <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]">Наши цены</span>
              <span className="absolute inset-0 flex items-center justify-start translate-y-[120%] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" aria-hidden="true">Наши цены</span>
            </div>
            <div className="w-[44px] h-[44px] rounded-full bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-45 group-hover:bg-white">
              <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[#1D1D1F] transition-colors duration-300" strokeWidth={2.5} />
            </div>
          </a>
        </motion.div>

         <div className="hidden lg:flex absolute top-[15vh] right-[5%] lg:right-[8%] z-[5] pointer-events-none flex-col gap-10 items-end">
             <FloatingPointer service={SERVICES[0]} lineClass="w-12" />
             <FloatingPointer service={SERVICES[1]} lineClass="w-[80px]" />
             <FloatingPointer service={SERVICES[2]} lineClass="w-16" />
             <FloatingPointer service={SERVICES[3]} lineClass="w-[100px]" />
             <FloatingPointer service={SERVICES[4]} lineClass="w-[60px]" />
         </div>

      </div>
    </section>
  );
}
