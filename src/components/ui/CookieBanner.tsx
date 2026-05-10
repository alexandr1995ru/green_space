'use client';

import { useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getConsent, setConsent, subscribeConsent } from '@/lib/consent';

// Default to 'accepted' on the server so the banner stays hidden in SSR
// markup and doesn't flash for visitors who already made a choice.
const getServerSnapshot = () => 'accepted' as const;

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerSnapshot);
  const isVisible = consent === null;

  const handleAccept = () => setConsent('accepted');
  const handleDecline = () => setConsent('declined');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-1/2 sm:bottom-6 z-[100] w-[calc(100%-16px)] sm:w-auto max-w-2xl pointer-events-auto"
          style={{ x: '-50%' }}
        >
          <div className="bg-[#1D1D1F]/90 backdrop-blur-xl p-3 sm:pr-3 sm:pl-6 rounded-2xl sm:rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col sm:flex-row items-center gap-4 sm:gap-4 w-full">
            <div className="flex items-center gap-3 text-left w-full sm:w-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse shrink-0" />
              <p className="text-white/70 text-[11px] sm:text-[12px] leading-snug font-medium line-clamp-2 sm:line-clamp-1">
                Мы используем файлы cookie (согласно 152-ФЗ) для улучшения работы сайта.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-initial bg-transparent hover:bg-white/10 text-white/60 hover:text-white/90 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-xl sm:rounded-full transition-all active:scale-95 whitespace-nowrap"
              >
                Отклонить
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-initial bg-white hover:bg-neutral-200 text-[#1D1D1F] font-bold text-[10px] sm:text-[11px] uppercase tracking-widest px-6 py-2.5 rounded-xl sm:rounded-full transition-all active:scale-95 whitespace-nowrap"
              >
                Принять
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
