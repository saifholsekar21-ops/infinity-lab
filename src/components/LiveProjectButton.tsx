import { motion } from "motion/react";

interface LiveProjectButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  label?: string;
}

export default function LiveProjectButton({
  onClick,
  href,
  className = "",
  label = "Live Project",
}: LiveProjectButtonProps) {
  const commonProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    className: `rounded-full border-2 border-[var(--text-color)] text-[var(--text-color)] font-medium uppercase tracking-widest text-sm sm:text-base transition-all duration-200 px-8 py-3 sm:px-10 sm:py-3.5 cursor-pointer hover:bg-[var(--text-color)]/10 inline-flex items-center justify-center text-center ${className}`
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...commonProps}
      >
        {label}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      {...commonProps}
    >
      {label}
    </motion.button>
  );
}
