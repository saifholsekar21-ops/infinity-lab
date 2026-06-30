import { motion } from "motion/react";
import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";
import { Sparkles, Users, CheckCircle, Lightbulb } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface AboutSectionProps {
  onContactClick: () => void;
}

export default function AboutSection({ onContactClick }: AboutSectionProps) {
  const { t } = useLanguage();

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-screen w-full bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-500 px-5 sm:px-8 md:px-10 py-24 flex flex-col justify-center items-center overflow-hidden"
      style={{ contentVisibility: "auto" }}
    >
      {/* 4 DECORATIVE 3D IMAGES IN THE CORNERS */}
      {/* Top-left Moon Icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon Icon"
            referrerPolicy="no-referrer"
            className="w-[100px] sm:w-[140px] md:w-[190px] h-auto drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)] opacity-40 blur-[1px]"
          />
        </FadeIn>
      </div>

      {/* Bottom-left 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Abstract Object"
            referrerPolicy="no-referrer"
            className="w-[80px] sm:w-[120px] md:w-[160px] h-auto drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)] opacity-20"
          />
        </FadeIn>
      </div>

      {/* Top-right Lego Icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego Icon"
            referrerPolicy="no-referrer"
            className="w-[100px] sm:w-[140px] md:w-[190px] h-auto drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)] opacity-30 blur-[2px]"
          />
        </FadeIn>
      </div>

      {/* Bottom-right 3D Group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none select-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Icon"
            referrerPolicy="no-referrer"
            className="w-[110px] sm:w-[150px] md:w-[200px] h-auto drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)] opacity-30"
          />
        </FadeIn>
      </div>

      {/* INNER CONTENT CONTAINER */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* About heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            {t("aboutHeading")}
          </h2>
        </FadeIn>

        {/* Spacing element */}
        <div className="h-8 sm:h-12" />

        {/* Character scroll animation text */}
        <div className="w-full max-w-[680px] text-center mx-auto px-4">
          <AnimatedText
            text={t("aboutText")}
            className="text-[var(--text-color)] font-medium leading-relaxed"
          />
        </div>

        {/* Spacing element */}
        <div className="h-12 sm:h-16" />

        {/* Detailed Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl px-4 text-left">
          {/* Team Info Card */}
          <FadeIn delay={0.1} y={30} className="w-full">
            <div className="glass-card rounded-3xl p-6 flex flex-col h-full hover:border-[#B600A8]/40 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3 text-[#B600A8]">
                <Users className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">{t("teamTitle")}</span>
              </div>
              <p className="text-sm text-[var(--text-color)]/80 font-normal leading-relaxed">
                {t("teamDesc")}
              </p>
            </div>
          </FadeIn>

          {/* Philosophy Card */}
          <FadeIn delay={0.2} y={30} className="w-full">
            <div className="glass-card rounded-3xl p-6 flex flex-col h-full hover:border-[#7621B0]/40 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3 text-[#7621B0]">
                <Lightbulb className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">{t("philosophyTitle")}</span>
              </div>
              <p className="text-sm text-[var(--text-color)]/80 font-normal leading-relaxed">
                {t("philosophyDesc")}
              </p>
            </div>
          </FadeIn>

          {/* Specialties Card (Spans full width on desktop) */}
          <FadeIn delay={0.3} y={30} className="md:col-span-2 w-full">
            <div className="glass-card rounded-3xl p-6 flex flex-col hover:border-[#BE4C00]/40 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4 text-[#BE4C00]">
                <Sparkles className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">{t("specialtiesTitle")}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "spec1",
                  "spec2",
                  "spec3",
                  "spec4",
                  "spec5",
                ].map((specKey, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-color)]/90 uppercase tracking-wide">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                    <span>{t(specKey)}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Spacing element */}
        <div className="h-16 sm:h-20" />

        {/* Contact button */}
        <FadeIn delay={0.4} y={20}>
          <ContactButton onClick={onContactClick} label={t("contactMe")} />
        </FadeIn>
      </div>
    </motion.section>
  );
}
