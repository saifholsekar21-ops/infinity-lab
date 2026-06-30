import { motion } from "motion/react";
import FadeIn from "./FadeIn";
import { useLanguage } from "../context/LanguageContext";

interface ServiceItem {
  num: string;
  nameKey: string;
  descKey: string;
}

const servicesList: ServiceItem[] = [
  {
    num: "01",
    nameKey: "serv1Title",
    descKey: "serv1Desc",
  },
  {
    num: "02",
    nameKey: "serv2Title",
    descKey: "serv2Desc",
  },
  {
    num: "03",
    nameKey: "serv3Title",
    descKey: "serv3Desc",
  },
  {
    num: "04",
    nameKey: "serv4Title",
    descKey: "serv4Desc",
  },
  {
    num: "05",
    nameKey: "serv5Title",
    descKey: "serv5Desc",
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative bg-[var(--body-contrast-bg)] text-[var(--body-contrast-text)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 
                 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] z-25 transition-colors duration-500"
      style={{ contentVisibility: "auto" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Services Heading */}
        <div className="text-center">
          <FadeIn delay={0} y={40}>
            <h2
              className="text-[var(--body-contrast-text)] font-black uppercase text-center leading-none tracking-tight transition-colors duration-500"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              {t("servicesHeading")}
            </h2>
          </FadeIn>
        </div>

        {/* Gap spec spacing */}
        <div className="h-16 sm:h-20 md:h-28" />

        {/* Services List */}
        <div className="flex flex-col">
          {servicesList.map((service, index) => (
            <div key={service.num} className="w-full">
              <FadeIn delay={index * 0.1} y={30} duration={0.8}>
                <div
                  className="flex flex-col md:flex-row items-start md:items-center justify-between 
                             py-8 sm:py-10 md:py-12 border-b border-[var(--body-contrast-text)]/15 
                             group transition-all duration-500 hover:px-4 hover:bg-[var(--body-contrast-text)]/[0.02]"
                >
                  {/* Left Column: Huge Number */}
                  <div
                    className="font-black leading-none text-[var(--body-contrast-text)] pr-6 md:pr-12 md:w-[25%] select-none
                               transition-all duration-300 group-hover:scale-105"
                    style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                  >
                    {service.num}
                  </div>

                  {/* Right Column: Title + Description */}
                  <div className="flex flex-col md:w-[75%] mt-4 md:mt-0 space-y-2">
                    <h3
                      className="font-medium uppercase text-[var(--body-contrast-text)] tracking-wide transition-colors duration-500"
                      style={{ fontSize: "clamp(1.2rem, 2.2vw, 2.1rem)" }}
                    >
                      {t(service.nameKey)}
                    </h3>
                    <p
                      className="font-light leading-relaxed text-[var(--body-contrast-text)]/60 max-w-2xl transition-colors duration-500"
                      style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                    >
                      {t(service.descKey)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
