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
        <p>
          This version of the project is available for public use from my{' '}
          <Link
            className="text-blue-500 dark:text-blue-400 flex items-center"
            href="https://github.com/dfrho/nextjs-ai-chatbot"
            target="_blank"
          >
            GitHub repo.
          </Link>
        </p>
        <p>
          You can also deploy your own starter version to{' '}
          <Link
            className="text-blue-500 dark:text-blue-400"
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot&env=AUTH_SECRET,OPENAI_API_KEY&envDescription=Learn%20more%20about%20how%20to%20get%20the%20API%20Keys%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot%2Fblob%2Fmain%2F.env.example&demo-title=AI%20Chatbot&demo-description=An%20Open-Source%20AI%20Chatbot%20Template%20Built%20With%20Next.js%20and%20the%20AI%20SDK%20by%20Vercel.&demo-url=https%3A%2F%2Fchat.vercel.ai&stores=[{%22type%22:%22postgres%22},{%22type%22:%22blob%22}]"
            target="_blank"
          >
            Vercel with one click.
          </Link>
        </p>
      </div>
    </motion.div>
  );
};
