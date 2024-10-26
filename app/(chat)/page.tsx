'use client';

import { useEffect, useState } from 'react';

import { Chat } from '@/components/custom/chat';
import { fetchSuggestedActions, SuggestedAction } from '@/lib/suggestedActions';
import { generateUUID } from '@/lib/utils';

export default function Page() {
  const [randomSuggestedActions, setRandomSuggestedActions] = useState<
    SuggestedAction[]
  >([]);

  useEffect(() => {
    async function getSuggestedActions() {
      const actions = await fetchSuggestedActions();
      setRandomSuggestedActions(actions);
    }
    getSuggestedActions();
  }, []);

  const id = generateUUID();

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      randomSuggestedActions={randomSuggestedActions}
    />
  );
}
