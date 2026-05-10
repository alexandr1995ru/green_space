export type ConsentValue = 'accepted' | 'declined';

const STORAGE_KEY = 'goslend_cookie_consent';
const EVENT_NAME = 'goslend:consent-change';

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === 'accepted' || raw === 'declined') return raw;
  // Migrate legacy 'true' value written by the previous one-button banner.
  if (raw === 'true') {
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    return 'accepted';
  }
  return null;
}

export function setConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(EVENT_NAME, { detail: value }));
}

export function subscribeConsent(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(EVENT_NAME, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVENT_NAME, cb);
    window.removeEventListener('storage', cb);
  };
}
