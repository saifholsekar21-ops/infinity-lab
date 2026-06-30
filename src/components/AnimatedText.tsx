import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.82", "end 0.25"],
  });

  // Split text into characters. To keep word layouts working nicely with wrapping,
  // we can split by words, and then map characters inside words, or split directly.
  // Splitting directly by characters works great, and spaces can be treated specially.
  const chars = useMemo(() => text.split(""), [text]);
  const total = chars.length;

  return (
    <p
      ref={containerRef}
      className={`${className} flex flex-wrap justify-center content-center`}
    >
      {chars.map((char, index) => (
        <Character
          key={index}
          char={char}
          index={index}
          total={total}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

interface CharacterProps {
  key?: number;
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Character({ char, index, total, progress }: CharacterProps) {
  const start = index / total;
  // A slight overlap makes the character reveal feel like a smooth fluid wave rather than stepping
  const end = Math.min(1, (index + 2) / total); 
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  // Handle spaces nicely so word wrapping isn't broken
  if (char === " ") {
    return <span className="inline-block">&nbsp;</span>;
  }

  return (
    <span className="relative inline-block select-none">
      <span className="invisible">{char}</span>
      <motion.span style={{ opacity }} className="absolute top-0 left-0">
        {char}
      </motion.span>
    </span>
  );
}
