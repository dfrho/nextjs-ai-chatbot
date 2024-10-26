import { motion } from 'framer-motion';
import Link from 'next/link';

import { LogoOpenAI, MessageIcon, VercelIcon, GitHubIcon } from './icons';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-[500px] mt-20 mx-4 md:mx-0"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="border rounded-lg p-6 flex flex-col gap-4 text-zinc-500 text-sm dark:text-zinc-400 dark:border-zinc-700">
        <p className="flex flex-row justify-center gap-4 items-center text-zinc-900 dark:text-zinc-50">
          <VercelIcon />
          <span>+</span>
          <MessageIcon />
          <span>+</span>
          <LogoOpenAI />
        </p>
        <p>
          This is an open source Chatbot template built with Next.js and the AI
          SDK by Vercel. It uses the{' '}
          <code className="rounded-md bg-muted px-1 py-0.5">streamText</code>{' '}
          function on the server and the{' '}
          <code className="rounded-md bg-muted px-1 py-0.5">useChat</code> hook
          on the client to create a seamless chat experience.
        </p>
        <p>
          Abstraction Layer: The SDK provides an abstraction layer over
          different LLMs, allowing developers to interact with a unified API.
          This means zero worries about the specific details of each LLM API.
        </p>
        <p>
          Unified API: By offering a consistent API, the SDK makes it easier to
          switch between different LLMs or use multiple LLMs within the same
          application. This is particularly useful for experimenting with
          different models to see which one best suits your needs.
        </p>
        <p>
          UI Components: The SDK includes pre-built UI components that can be
          easily integrated into your React applications. These components
          handle common tasks such as text input, displaying responses, and
          streaming text.
        </p>
        <p>
          You can learn more about the AI SDK by visiting the{' '}
          <Link
            className="text-blue-500 dark:text-blue-400"
            href="https://sdk.vercel.ai/docs"
            target="_blank"
          >
            Docs
          </Link>
          .
        </p>
        <p className="flex flex-row items-center gap-2">
          This project is available for public use from the{' '}
          <Link
            className="text-blue-500 dark:text-blue-400 flex items-center gap-1"
            href="https://github.com/dfrho/nextjs-ai-chatbot"
            target="_blank"
          >
            <GitHubIcon /> GitHub repo.
          </Link>
        </p>
      </div>
    </motion.div>
  );
};
