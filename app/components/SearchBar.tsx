'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  compact?: boolean;
}

export default function SearchBar({ onSearch, initialQuery = '', compact = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`w-full ${compact ? 'max-w-2xl' : 'max-w-2xl'}`}
      initial={compact ? {} : { scale: 0.9, opacity: 0 }}
      animate={compact ? {} : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div
        className={`relative flex items-center bg-[var(--input)] rounded-full search-shadow transition-all duration-300 ${
          isFocused ? 'ring-2 ring-[var(--accent)]' : ''
        }`}
      >
        <div className="pl-6 pr-3">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search anything..."
          className="flex-1 bg-transparent outline-none py-4 pr-4 text-[var(--foreground)] placeholder-gray-500 text-base"
          autoFocus={!compact}
        />
        {query && (
          <motion.button
            type="button"
            onClick={() => setQuery('')}
            className="mr-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <svg
              className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        )}
        <motion.button
          type="submit"
          className="mr-2 p-2 rounded-full hover:bg-[var(--card-hover)] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-5 h-5 text-[var(--accent)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </motion.button>
      </div>
    </motion.form>
  );
}
