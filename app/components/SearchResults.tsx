'use client';

import { motion } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full max-w-2xl mt-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-gray-600 dark:text-gray-400 mb-4"
      >
        About {results.length} results for "{query}"
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {results.map((result) => (
          <motion.div
            key={result.id}
            variants={item}
            className="result-card group"
          >
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {result.title.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {result.url}
                </span>
              </div>
              <h3 className="text-xl text-[var(--accent)] group-hover:underline mb-1 font-normal">
                {result.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {result.description}
              </p>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
