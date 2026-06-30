import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ScrollToTop() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past the hero section (typically 100vh)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top-btn"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-4 rounded-full border shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-300 ${
            theme === "dark"
              ? "bg-[#0C0C0C]/60 border-white/10 text-white hover:bg-[#B600A8]/20 hover:border-[#B600A8]/50 hover:text-[#B600A8]"
              : "bg-white/60 border-black/10 text-[#121824] hover:bg-black/10 hover:border-black/30 hover:text-black"
          }`}
          aria-label="Scroll to Top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
