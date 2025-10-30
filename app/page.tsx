'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ThemeToggle from './components/ThemeToggle';
import Logo from './components/Logo';

// Mock search results generator
const generateMockResults = (query: string) => {
  const domains = ['example.com', 'wikipedia.org', 'github.com', 'medium.com', 'stackoverflow.com', 'reddit.com', 'twitter.com', 'youtube.com'];

  return Array.from({ length: 8 }, (_, i) => ({
    id: `result-${i}`,
    title: `${query.charAt(0).toUpperCase() + query.slice(1)} - ${['Guide', 'Tutorial', 'Documentation', 'Overview', 'Examples', 'Best Practices', 'Tips', 'Resources'][i]}`,
    url: `https://www.${domains[i]}/${query.toLowerCase().replace(/\s+/g, '-')}`,
    description: `Discover comprehensive information about ${query}. This resource provides detailed insights, practical examples, and expert guidance to help you understand and master ${query}. Perfect for beginners and advanced users alike.`
  }));
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setResults(generateMockResults(query));
    setHasSearched(true);
  };

  return (
    <main className="min-h-screen relative">
      <ThemeToggle />

      <AnimatePresence mode="wait">
        {!hasSearched ? (
          <motion.div
            key="home"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center min-h-screen px-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Logo size="large" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full max-w-2xl px-4"
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Search the web with beautiful simplicity
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen pt-6 pb-12 px-4"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-8 mb-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Logo size="small" />
                </motion.div>

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex-1"
                >
                  <SearchBar
                    onSearch={handleSearch}
                    initialQuery={searchQuery}
                    compact
                  />
                </motion.div>
              </div>

              <div className="border-b border-[var(--border)] mb-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex space-x-6 text-sm"
                >
                  <button className="pb-3 border-b-2 border-[var(--accent)] text-[var(--accent)] font-medium">
                    All
                  </button>
                  <button className="pb-3 text-gray-600 dark:text-gray-400 hover:text-[var(--foreground)] transition-colors">
                    Images
                  </button>
                  <button className="pb-3 text-gray-600 dark:text-gray-400 hover:text-[var(--foreground)] transition-colors">
                    Videos
                  </button>
                  <button className="pb-3 text-gray-600 dark:text-gray-400 hover:text-[var(--foreground)] transition-colors">
                    News
                  </button>
                </motion.div>
              </div>

              <SearchResults results={results} query={searchQuery} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </main>
  );
}
