import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Elegant delay to show the loader brand text before the curtain slides up
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Characters for animated staggered display text
  const brandWord = "INFINITY";
  const subWord = "LABS";

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isLoaded && (
        <motion.div
          id="page-loader"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { 
              duration: 1.1, 
              ease: [0.85, 0, 0.15, 1], // Custom premium cubic bezier for curtain slide up
            }
          }}
          className="fixed inset-0 w-screen h-screen bg-[#0C0C0C] text-[#D7E2EA] z-[9999] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          {/* Subtle glowing ambient spots in loader background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#B600A8]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-[#7621B0]/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative flex flex-col items-center justify-center text-center">
            {/* Elegant Brand Text Animation */}
            <div className="flex gap-2 sm:gap-3 overflow-hidden text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-[0.25em] pl-[0.25em] mb-3">
              {brandWord.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: index * 0.08,
                  }}
                  className="inline-block text-white"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle/Subword */}
            <div className="flex gap-1 overflow-hidden text-xs sm:text-sm font-semibold uppercase tracking-[0.5em] pl-[0.5em] text-[#D7E2EA]/40">
              {subWord.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.6 + index * 0.1,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Minimal High-End Progress Indicator */}
            <div className="mt-12 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{
                  duration: 2.0,
                  ease: "easeInOut",
                  repeat: 0,
                }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#B600A8] to-transparent"
              />
            </div>
          </div>

          {/* Premium Bottom Watermark details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] pl-[0.3em] text-[#D7E2EA]/50"
          >
            © 2026 INFINITY LABS // DIGITAL PORTFOLIO
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
