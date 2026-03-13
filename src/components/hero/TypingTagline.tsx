"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingTaglineProps {
  taglines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypingTagline({
  taglines,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2500,
  className = "",
}: TypingTaglineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentTagline = taglines[currentIndex];

  const handleTyping = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      if (displayText.length < currentTagline.length) {
        setDisplayText(currentTagline.slice(0, displayText.length + 1));
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % taglines.length);
      }
    }
  }, [displayText, isDeleting, isPaused, currentTagline, taglines.length, pauseDuration]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <div className={`font-mono ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <span className="text-nyala-white">{displayText}</span>
          <motion.span
            className="ml-0.5 inline-block text-nyala-yellow"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            ▋
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
