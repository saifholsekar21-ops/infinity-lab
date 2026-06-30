import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Github, Twitter, Instagram } from "lucide-react";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import FaqSection from "./components/FaqSection";
import ContactModal from "./components/ContactModal";
import { useLanguage } from "./context/LanguageContext";
import { useAudio } from "./context/AudioContext";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";
import { useWebVitals } from "./hooks/useWebVitals";

export default function App() {
  // Monitor Web Vitals performance in real-time
  useWebVitals();

  const { playHoverSound, playScrollSound } = useAudio();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const { t } = useLanguage();

  // Setup global sound effect listeners for hover and scroll
  useEffect(() => {
    // 1. Subtle Hover Sound on all buttons, links, and interactive elements
    let lastHoveredElement: EventTarget | null = null;
    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("button, a, [role='button'], .interactive-hover");
      if (target && target !== lastHoveredElement) {
        lastHoveredElement = target;
        playHoverSound();
      } else if (!target) {
        lastHoveredElement = null;
      }
    };

    document.addEventListener("mouseover", handleGlobalMouseOver);

    // 2. Subtle Scroll Sound when snap-scrolling to different sections
    const sections = ["hero", "about", "services", "projects", "faq"];
    let currentActiveSection = "hero";

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // trigger when at least 50% of the section is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && sectionId !== currentActiveSection) {
            currentActiveSection = sectionId;
            playScrollSound();
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      document.removeEventListener("mouseover", handleGlobalMouseOver);
      observer.disconnect();
    };
  }, [playHoverSound, playScrollSound]);

  // Handle scroll lock during loading state
  useEffect(() => {
    if (isLoaderActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaderActive]);

  // Global Keyboard Navigation
  useEffect(() => {
    if (isContactOpen || isLoaderActive) return;

    const sections = ["hero", "about", "services", "projects", "faq"];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const isDown = e.key === "ArrowDown" || (e.key === " " && !e.shiftKey) || e.key === "PageDown";
      const isUp = e.key === "ArrowUp" || (e.key === " " && e.shiftKey) || e.key === "PageUp";

      if (!isDown && !isUp) return;

      // Find the currently most visible section
      let currentIdx = -1;
      let maxVisibleHeight = 0;

      sections.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const viewHeight = window.innerHeight;
          const visibleHeight = Math.max(0, Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0));
          
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            currentIdx = index;
          }
        }
      });

      if (currentIdx === -1) return;

      const currentEl = document.getElementById(sections[currentIdx]);
      if (!currentEl) return;

      const rect = currentEl.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      let nextIdx = currentIdx;

      if (isDown) {
        // If there's still content below in the current section, allow native scroll
        if (rect.bottom > viewHeight + 5) return;
        nextIdx = Math.min(currentIdx + 1, sections.length - 1);
      } else if (isUp) {
        // If there's still content above in the current section, allow native scroll
        if (rect.top < -5) return;
        nextIdx = Math.max(currentIdx - 1, 0);
      }

      if (nextIdx !== currentIdx) {
        e.preventDefault(); // Prevent default only when we are doing the jump
        const nextId = sections[nextIdx];
        const element = document.getElementById(nextId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isContactOpen, isLoaderActive]);

  // Scroll Progress Setup

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <div className="relative bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-500 font-sans antialiased overflow-x-hidden w-full selection:bg-[#B600A8]/30 selection:text-white">
      {/* Fixed Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Glow Effects */}
      <div className="pointer-events-none fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#B600A8]/10 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7621B0]/10 rounded-full blur-[160px] z-0" />

      {/* Main Sections Wrapper */}
      <main className="relative w-full z-10" style={{ overflowX: "clip" }}>
        {/* 1. HeroSection */}
        <HeroSection
          onContactClick={() => setIsContactOpen(true)}
          onNavClick={scrollToSection}
        />

        {/* 2. MarqueeSection */}
        <MarqueeSection />

        {/* 3. AboutSection */}
        <AboutSection onContactClick={() => setIsContactOpen(true)} />

        {/* 4. ServicesSection */}
        <ServicesSection />

        {/* 5. ProjectsSection */}
        <ProjectsSection />

        {/* 6. FaqSection */}
        <FaqSection />

        {/* Premium Low-profile Footer built into main layout */}
        <footer className="w-full bg-[#0C0C0C] border-t border-white/5 py-12 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-light relative z-20">
          <div>
            <span>© {new Date().getFullYear()} INFINITY LABS. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex gap-6 items-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Twitter className="h-3 w-3" />
              <span>Twitter</span>
            </a>
            <a
              href="https://www.instagram.com/infi.nitylabs/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Instagram className="h-3 w-3" />
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="h-3 w-3" />
              <span>Github</span>
            </a>
          </div>
        </footer>
      </main>

      {/* Interactive Contact Modal Overlay */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Floating Scroll-to-Top Button */}
      <ScrollToTop />

      {/* Full-screen Slide-up Curtain Page Loader */}
      <PageLoader onComplete={() => setIsLoaderActive(false)} />
    </div>
  );
}
