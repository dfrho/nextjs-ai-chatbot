'use client';

import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Attachment, ChatRequestOptions, CreateMessage, Message } from 'ai'; // components/custom/multimodal-input.tsx
import { motion } from 'framer-motion';
import React, { useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import { SuggestedAction } from '@/lib/suggestedActions';

import useWindowSize from './use-window-size';

interface MultimodalInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading: boolean;
  messages: Array<Message>;
  stop: () => void;
  randomSuggestedActions: SuggestedAction[];
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}

export const MultimodalInput: React.FC<MultimodalInputProps> = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
  append,
  stop,
  randomSuggestedActions = [],
}) => {
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
      <div className="grid sm:grid-cols-2 gap-2 w-full md:px-0 mx-auto md:max-w-[500px]">
        {Array.isArray(randomSuggestedActions) &&
          randomSuggestedActions.map((suggestedAction, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.05 * index }}
              key={index}
              className="block"
            >
              <button
                onClick={async (event) => {
                  event.preventDefault();
                  try {
                    await append({
                      role: 'user',
                      content: suggestedAction.action,
                    });
                  } catch (error) {
                    console.error('Error handling suggested action:', error);
                  }
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
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleInput}
        placeholder="Send a question..."
        className="min-h-[24px] p-3 overflow-hidden resize-none rounded-lg text-base bg-muted"
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
        <button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5"
          onClick={(event) => {
            event.preventDefault();
            stop();
          }}
        >
          Stop
        </button>
      ) : (
        <button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5"
          onClick={(event) => {
            event.preventDefault();
            submitForm();
          }}
        >
          <ArrowUpIcon className="size-5" />
        </button>
      )}
    </div>
  );
};
