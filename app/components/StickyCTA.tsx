'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyCTAProps {
  isVisible: boolean;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40"
      >
        <a
          href="#cta"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn btn-primary btn-lg cursor-pointer"
        >
          <span className="relative inline-flex h-1.5 w-1.5 mr-1">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#0A0A0B]/40 ping-soft text-[#0A0A0B]" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0A0A0B]" />
          </span>
          Umów darmową rozmowę
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </motion.div>
    )}
  </AnimatePresence>
);
