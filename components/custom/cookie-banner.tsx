'use client';

import { useState, useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/custom/alert-dialog';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const posthog = usePostHog();

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === null) {
      setShowBanner(true);
    } else if (consent === 'true') {
      posthog?.opt_in_capturing();
    } else {
      posthog?.opt_out_capturing();
    }
  }, [posthog]);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    posthog?.opt_in_capturing();
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'false');
    posthog?.opt_out_capturing();
    setShowBanner(false);
  };

  return (
    <AlertDialog open={showBanner} onOpenChange={setShowBanner}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cookie Consent</AlertDialogTitle>
          <AlertDialogDescription>
            We use cookies to improve your experience and analyze site usage.
            Read our{' '}
            <a href="/privacy-policy" className="underline hover:text-primary">
              Privacy Policy
            </a>{' '}
            for more information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={declineCookies}>
            Decline
          </AlertDialogCancel>
          <AlertDialogAction onClick={acceptCookies}>Accept</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
