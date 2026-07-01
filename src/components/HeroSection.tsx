import { motion } from "motion/react";
import ContactButton from "./ContactButton";
import Magnet from "./Magnet";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useAudio } from "../context/AudioContext";
import { Sun, Moon, Volume2, VolumeX } from "lucide-react";

interface HeroSectionProps {
  onContactClick: () => void;
  onNavClick: (section: string) => void;
}

export default function HeroSection({ onContactClick, onNavClick }: HeroSectionProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isAudioPlaying, toggleAudio } = useAudio();

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="relative h-screen w-full flex flex-col justify-between bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-500 overflow-hidden"
      style={{ contentVisibility: "auto" }}
    >
      {/* NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0 }}
        className="w-full flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 z-30"
      >
        <div className="w-full flex justify-between items-center gap-4">
          {/* Nav links */}
          <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-12 flex-1 justify-center md:justify-start">
            <button
              onClick={() => onNavClick("about")}
              className="text-xs sm:text-base md:text-lg lg:text-[1.3rem] font-medium uppercase tracking-wider text-[var(--text-color)] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              {t("about")}
            </button>
            <button
              onClick={() => onNavClick("services")}
              className="text-xs sm:text-base md:text-lg lg:text-[1.3rem] font-medium uppercase tracking-wider text-[var(--text-color)] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              {t("price")}
            </button>
            <button
              onClick={() => onNavClick("projects")}
              className="text-xs sm:text-base md:text-lg lg:text-[1.3rem] font-medium uppercase tracking-wider text-[var(--text-color)] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              {t("projects")}
            </button>
            <button
              onClick={onContactClick}
              className="text-xs sm:text-base md:text-lg lg:text-[1.3rem] font-medium uppercase tracking-wider text-[var(--text-color)] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              {t("contact")}
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Interactive Sound Effects Toggle Button */}
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-1.5 justify-center p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                theme === "dark"
                  ? "border-white/10 bg-white/5 text-[#D7E2EA] hover:bg-white/10 hover:border-white/20"
                  : "border-black/10 bg-black/5 text-[#121824] hover:bg-black/10 hover:border-black/20"
              }`}
              title={isAudioPlaying ? "Mute Sound Effects" : "Enable Sound Effects"}
            >
              {isAudioPlaying ? (
                <Volume2 className="h-4 w-4 text-[#B600A8]" />
              ) : (
                <VolumeX className="h-4 w-4 opacity-60" />
              )}
              {isAudioPlaying && (
                <div className="flex gap-[1.5px] items-end h-3 w-2 mr-0.5">
                  <motion.div
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
                    className="w-[1.5px] bg-[#B600A8] rounded-full"
                  />
                  <motion.div
                    animate={{ height: ["45%", "100%", "45%"] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                    className="w-[1.5px] bg-[#B600A8] rounded-full"
                  />
                  <motion.div
                    animate={{ height: ["15%", "85%", "15%"] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.1 }}
                    className="w-[1.5px] bg-[#B600A8] rounded-full"
                  />
                </div>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                theme === "dark"
                  ? "border-white/10 bg-white/5 text-[#D7E2EA] hover:bg-white/10 hover:border-white/20"
                  : "border-black/10 bg-black/5 text-[#121824] hover:bg-black/10 hover:border-black/20"
              }`}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-600" />
              )}
            </button>

            {/* Sleek Language Switcher */}
            <button
              onClick={toggleLanguage}
              title={`Switch to ${language === "EN" ? "Spanish" : "English"}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 text-[10px] sm:text-xs font-semibold uppercase tracking-widest cursor-pointer hover:scale-105 active:scale-95 ${
                theme === "dark"
                  ? "border-white/10 bg-white/5 text-[#D7E2EA] hover:bg-white/10 hover:border-white/20"
                  : "border-black/10 bg-black/5 text-[#121824] hover:bg-black/10 hover:border-black/20"
              }`}
            >
              <span className={`transition-colors duration-300 ${language === "EN" ? (theme === "dark" ? "text-white font-black" : "text-black font-black") : (theme === "dark" ? "text-white/40" : "text-black/40")}`}>EN</span>
              <span className={theme === "dark" ? "text-white/20 font-light" : "text-black/20 font-light"}>|</span>
              <span className={`transition-colors duration-300 ${language === "ES" ? (theme === "dark" ? "text-white font-black" : "text-black font-black") : (theme === "dark" ? "text-white/40" : "text-black/40")}`}>ES</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* PORTRAIT IMAGE (Layered Depth) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
        className="absolute left-1/2 -translate-x-1/2 z-20 
                   w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]
                   top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="w-full flex justify-center items-end"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="INFINITY LABS Portrait"
            referrerPolicy="no-referrer"
            className="w-full object-contain select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(182,0,168,0.15)]"
          />
        </Magnet>
      </motion.div>

      {/* HERO HEADING (Massive size) */}
      <div className="w-full overflow-hidden flex items-center justify-center relative z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          className="w-full text-center"
        >
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full select-none
                         text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 px-4">
            {t("heroHeading")}
          </h1>
        </motion.div>
      </div>

      {/* BOTTOM BAR */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-30">
        {/* Left text description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 }}
          className="text-[var(--text-color)] font-light uppercase tracking-wide leading-snug text-left
                     max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
        >
          {t("heroDesc")}
        </motion.p>

        {/* Right Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
        >
          <ContactButton onClick={onContactClick} label={t("contactMe")} />
        </motion.div>
      </div>
    </motion.section>
  );
}
