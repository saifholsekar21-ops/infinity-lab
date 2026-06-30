import { motion } from "motion/react";

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export default function ContactButton({
  onClick,
  className = "",
  label = "Contact Me",
}: ContactButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`relative rounded-full cursor-pointer overflow-hidden font-medium uppercase tracking-widest text-white transition-all duration-200 ${className}`}
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
        outline: "2px solid white",
        outlineOffset: "-3px",
      }}
    >
      <span className="relative z-10 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 block text-xs sm:text-sm md:text-base">
        {label}
      </span>
    </motion.button>
  );
}
