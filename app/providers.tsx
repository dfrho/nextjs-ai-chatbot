'use client';

import posthogClient from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import { CookieBanner } from '@/components/custom/cookie-banner';

if (typeof window !== 'undefined') {
  const consent = localStorage.getItem('cookie-consent');

  posthogClient.init(process.env.POSTHOG_KEY || '', {
    api_host: process.env.POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'always', // or 'identified_only' to create profiles for only signed in users
    loaded: (posthog) => {
      //   if (process.env.NODE_ENV === 'development') posthog.debug();
      if (!consent || consent === 'false') {
        posthog.opt_out_capturing();
      }
    },
    capture_pageview: false, // We'll capture these manually
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthogClient}>
      {children}
      <CookieBanner />
    </PostHogProvider>
  );
}
