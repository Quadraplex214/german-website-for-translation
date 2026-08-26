"use client";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedText = ({
  text,
  className,
  delay = 0,
  duration = 0.5,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) => {
  const words = text.split(" ").map((word, index, allWords) => ({
    key: allWords.slice(0, index + 1).join(" "),
    word,
  }));

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring", // ✅ Explicitly valid type
        damping: 12,
        duration,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring", // ✅ Valid
        damping: 12,
        duration,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map(({ key, word }) => (
        <motion.span
          variants={child}
          style={{ marginRight: "8px" }}
          key={key}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const LetterPullUp = ({
  words,
  delay = 0,
  className,
}: {
  words: string;
  delay?: number;
  className?: string;
}) => {
  const letters = words.split("").map((letter, index, allLetters) => ({
    key: allLetters.slice(0, index + 1).join(""),
    letter,
  }));

  const pullupVariant: Variants = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <div className={cn("flex justify-center", className)}>
      {letters.map(({ key, letter }, i) => (
        <motion.span
          key={key}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          custom={i}
          transition={{
            delay: delay + i * 0.05,
            duration: 0.4,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className={letter === " " ? "w-2" : ""}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};
