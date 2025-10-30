'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'small' | 'large';
}

export default function Logo({ size = 'large' }: LogoProps) {
  const letterVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  const colors = ['text-blue-500', 'text-red-500', 'text-yellow-500'];
  const letters = ['X', 'C', 'R'];

  return (
    <div className={`flex items-center ${size === 'large' ? 'space-x-2' : 'space-x-1'}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className={`${colors[i]} font-bold ${size === 'large' ? 'text-7xl md:text-8xl' : 'text-3xl'}`}
          style={{ display: 'inline-block' }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}
