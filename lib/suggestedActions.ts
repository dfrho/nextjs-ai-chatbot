// lib/suggestedActions.ts
export interface SuggestedAction {
  title: string;
  label: string;
  action: string;
}

export async function fetchSuggestedActions(): Promise<SuggestedAction[]> {
  const suggestedActions = [
    {
      title: 'Describe the responsibilities of a Solutions Engineer.',
      label: 'Describe the responsibilities of a Solutions Engineer.',
      action: 'What is the role of a Solutions Engineer?',
    },
    {
      title: 'What is a good POC cycle?',
      label: 'What is a good POC cycle?',
      action:
        'Describe the best practices for a technical POC cycle using MEDDICC, then Sales Challenger methodologies.',
    },
    {
      title: 'How do you support enterprise customers?',
      label: 'Explain your approach to supporting enterprise customers.',
      action:
        'How does a solutions engineer and solution architect support enterprise software customers?',
    },
    {
      title: 'What is your approach to AI?',
      label: 'Describe how you use AI to enhance knowledge work.',
      action:
        'What is the best approach to leveraging AI for data analysts, data engineers, and then solutions engineers?',
    },
    {
      title: 'What are the key skills for a Solutions Engineer in 2024?',
      label: 'List the key skills required for a Solutions Engineer.',
      action: 'What are the key skills for a Solutions Engineer?',
    },
    {
      title: 'How do you ensure product analytics accuracy?',
      label: 'Explain your methods for maintaining accurate product analytics.',
      action:
        'How does a data practitioner or data engineer ensure product analytics accuracy?',
    },
    {
      title: 'What is your approach to session recording?',
      label: 'Describe how you leverage session recording for user insights.',
      action: 'What is your approach to session recording?',
    },
    {
      title: 'How do you implement feature flags?',
      label: 'How do you implement feature flags?',
      action:
        'Explain the best process for using feature flags in product engineering development.',
    },
  ];

  const shuffled = suggestedActions
    .map((action) => ({
      action,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ action }) => action);

  return shuffled.slice(0, 4);
}
