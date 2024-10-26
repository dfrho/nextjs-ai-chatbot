'use client';

import { Attachment, ChatRequestOptions, CreateMessage, Message } from 'ai';
import { motion } from 'framer-motion';
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import { toast } from 'sonner';

import { ArrowUpIcon, PaperclipIcon, StopIcon } from './icons';
import useWindowSize from './use-window-size';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const suggestedActions = [
  {
    title: 'How do you ensure data security?',
    label: 'Explain your security posture.',
    action: 'How does a solutions engineer help buyers ensure data security?',
  },
  {
    title: 'How to integrate with cloud services?',
    label: 'How do you integrate with cloud services?',
    action:
      'Explain broadly how a data engineer performs event or data stream integration with GCP, AWS, and Azure.',
  },
  {
    title: 'What is the role of a Solutions Engineer?',
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
  {
    title: 'What is your A/B testing strategy?',
    label: 'Describe a best practice approach to A/B testing.',
    action: 'Describe a best practice approach to A/B testing.',
  },
  {
    title: 'How do you manage event pipelines?',
    label: 'Explain best practice methods for handling event pipelines.',
    action:
      'What are best practices in data engineering for managing event pipelines?',
  },
  {
    title: 'What is a SQL access policy?',
    label: 'Describe how a data engineer should provide SQL access to users.',
    action: 'Describe how a data engineer should provide SQL access to users.',
  },
  {
    title: 'How do you maintain your data warehouse?',
    label: 'Explain your approach to data warehouse management.',
    action:
      'How does a data engineer best maintain Snowflake or Databricks data warehouse?',
  },
  {
    title: 'What is your approach to open-source community building?',
    label: 'Describe how you build and maintain an open-source community.',
    action: 'What is the best approach to open-source community building?',
  },
  {
    title: 'How do you handle customer feedback?',
    label:
      'Explain a sales or solutions engineering process for managing and acting on customer feedback.',
    action:
      'How should a tech seller or solutions engineer handle customer feedback on the product?',
  },
  {
    title: 'What is your strategy for multi-product adoption?',
    label: 'Describe how you drive adoption of multiple products.',
    action: 'What is a best practice strategy for multi-product adoption?',
  },
];

export function MultimodalInput({
  input,
  setInput,
  isLoading,
  stop,
  messages,
  append,
  handleSubmit,
}: {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  messages: Array<Message>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = useCallback(() => {
    handleSubmit(undefined, {
      experimental_attachments: [],
    });

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [handleSubmit, width]);

  return (
    <div className="relative w-full flex flex-col gap-4">
      {messages.length === 0 && (
        <div className="grid sm:grid-cols-2 gap-2 w-full md:px-0 mx-auto md:max-w-[500px]">
          {suggestedActions.map((suggestedAction, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.05 * index }}
              key={index}
              className={index > 1 ? 'hidden sm:block' : 'block'}
            >
              <button
                onClick={async () => {
                  append({
                    role: 'user',
                    content: suggestedAction.action,
                  });
                }}
                className="w-full text-left border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-lg p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex flex-col"
              >
                <span className="font-medium">{suggestedAction.title}</span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {suggestedAction.label}
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <Textarea
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        onChange={handleInput}
        className="min-h-[24px] overflow-hidden resize-none rounded-lg text-base bg-muted"
        rows={3}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            if (isLoading) {
              toast.error('Please wait for the model to finish its response!');
            } else {
              submitForm();
            }
          }
        }}
      />

      {isLoading ? (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5"
          onClick={(event) => {
            event.preventDefault();
            stop();
          }}
        >
          <StopIcon size={14} />
        </Button>
      ) : (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5"
          onClick={(event) => {
            event.preventDefault();
            submitForm();
          }}
          disabled={input.length === 0}
        >
          <ArrowUpIcon size={14} />
        </Button>
      )}
    </div>
  );
}
