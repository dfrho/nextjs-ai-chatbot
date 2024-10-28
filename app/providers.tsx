'use client';

import posthogClient from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { CookieBanner } from '@/components/custom/cookie-banner';

const consent =
  typeof window !== 'undefined' ? localStorage.getItem('cookie-consent') : null;

if (typeof window !== 'undefined') {
  posthogClient.init(process.env.POSTHOG_KEY || '', {
    api_host: process.env.POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'always', // or 'identified_only' to create profiles for only signed in users
    loaded: (posthog) => {
      //   if (process.env.NODE_ENV === 'development') posthog.debug();
      if (!consent || consent === 'false') {
        posthog.opt_out_capturing();
      }
    },
    capture_pageview: true, // We'll capture these manually
  });
}

export function PostHogProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostHogProvider posthog={posthogClient}>{children}</PostHogProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProviderWrapper>
      {children}
      <CookieBanner />
    </PostHogProviderWrapper>
  );
}
