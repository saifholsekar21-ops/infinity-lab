import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import FadeIn from "./FadeIn";

interface FaqItem {
  id: string;
  qKey: string;
  aKey: string;
}

const faqs: FaqItem[] = [
  { id: "q1", qKey: "faqQ1", aKey: "faqA1" },
  { id: "q2", qKey: "faqQ2", aKey: "faqA2" },
  { id: "q3", qKey: "faqQ3", aKey: "faqA3" },
  { id: "q4", qKey: "faqQ4", aKey: "faqA4" },
];

export default function FaqSection() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative bg-[var(--bg-color)] text-[var(--text-color)] px-5 sm:px-8 md:px-10 py-24 sm:py-32 w-full overflow-hidden transition-colors duration-500"
      style={{ contentVisibility: "auto" }}
    >
      {/* Decorative gradient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-[#7621B0]/5 rounded-full blur-[140px] pointer-events-none select-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: "clamp(3rem, 10vw, 120px)" }}
            >
              {t("faqHeading")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} y={20}>
            <p className="text-xs sm:text-sm text-[var(--text-color)]/60 uppercase tracking-widest mt-4 max-w-lg mx-auto font-medium transition-colors duration-500">
              {t("faqSubtitle")}
            </p>
          </FadeIn>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = expandedId === faq.id;

            return (
              <div key={faq.id}>
                <FadeIn delay={index * 0.1} y={30}>
                  <div
                    className={`glass-card rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "border-[#B600A8]/30 shadow-[0_10px_30px_rgba(182,0,168,0.05)]"
                        : "hover:border-[#7621B0]/30 hover:bg-white/[0.04]"
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between text-left p-6 sm:p-8 cursor-pointer group"
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        <HelpCircle className={`h-5 w-5 mt-1 sm:mt-0 flex-shrink-0 transition-colors duration-300 ${isOpen ? "text-[#B600A8]" : "text-[#7621B0]"}`} />
                        <span className="text-sm sm:text-base md:text-lg font-medium text-[var(--text-color)] uppercase tracking-wider leading-snug group-hover:text-[var(--text-color)]/90 transition-colors">
                          {t(faq.qKey)}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className={`rounded-full p-1.5 sm:p-2 bg-white/5 border border-white/10 flex-shrink-0 ml-4 transition-all duration-300 ${isOpen ? "border-[#B600A8]/20 bg-[#B600A8]/10 text-[#B600A8]" : "text-[var(--text-color)]/60 group-hover:text-[var(--text-color)]"}`}
                      >
                        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        >
                          <div className="px-6 pb-6 sm:px-8 sm:pb-8 border-t border-white/5 pt-4">
                            <p className="text-xs sm:text-sm md:text-base font-light text-[var(--text-color)]/75 leading-relaxed transition-colors duration-500">
                              {t(faq.aKey)}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
