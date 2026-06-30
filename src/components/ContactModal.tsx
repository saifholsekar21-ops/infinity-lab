import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[30px] border border-white/10 bg-[#121212] p-8 sm:p-10 md:p-12 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col items-center text-center space-y-8">
              <div>
                <h3 className="hero-heading text-3xl sm:text-4xl font-black uppercase tracking-tight">
                  {t("contactTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/60 uppercase tracking-widest mt-2">
                  {t("contactSubtitle")}
                </p>
              </div>

              {/* Direct Contact List */}
              <div className="w-full space-y-4">
                {/* Email address box */}
                <a
                  href="mailto:infinitylabs1845@gmail.com"
                  className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl border border-white/5 bg-[#1A1A1A]/50 hover:bg-[#1A1A1A] hover:border-[#B600A8]/30 transition-all duration-300 group"
                >
                  <div className="rounded-full bg-[#B600A8]/10 p-3.5 text-[#B600A8] group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold mb-0.5">
                      {t("emailLabel")}
                    </div>
                    <div className="text-base sm:text-lg font-medium text-white group-hover:text-[#B600A8] transition-colors font-sans">
                      infinitylabs1845@gmail.com
                    </div>
                  </div>
                </a>

                {/* Contact phone number box */}
                <a
                  href="tel:+919702966941"
                  className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl border border-white/5 bg-[#1A1A1A]/50 hover:bg-[#1A1A1A] hover:border-[#7621B0]/30 transition-all duration-300 group"
                >
                  <div className="rounded-full bg-[#7621B0]/10 p-3.5 text-[#7621B0] group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold mb-0.5">
                      {t("phoneLabel")}
                    </div>
                    <div className="text-base sm:text-lg font-medium text-white group-hover:text-[#7621B0] transition-colors font-sans">
                      +91 970296 6941
                    </div>
                  </div>
                </a>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-light">
                <MapPin className="h-4 w-4 text-[#BE4C00]" />
                <span>{t("locationBadge")}</span>
              </div>

              {/* Simple action button to close modal or act as a confirmation */}
              <button
                onClick={onClose}
                className="w-full relative rounded-full py-4 text-white uppercase tracking-widest text-xs font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{
                  background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                  boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
                  outline: "2px solid white",
                  outlineOffset: "-3px",
                }}
              >
                {t("closeWindow")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
