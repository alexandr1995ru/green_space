'use client';

import { useSyncExternalStore } from 'react';
import Script from 'next/script';
import { getConsent, subscribeConsent } from '@/lib/consent';

const getServerSnapshot = () => null;

export default function AnalyticsScripts() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerSnapshot);

  if (consent !== 'accepted') return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=108582466','ym');
          ym(108582466,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",accurateTrackBounce:true,trackLinks:true});
        `}
      </Script>
      <Script
        id="callibri"
        src="//cdn.callibri.ru/callibri.js"
        strategy="afterInteractive"
      />
    </>
  );
}
