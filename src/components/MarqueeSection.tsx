import { useEffect, useRef } from "react";

const row1Images = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
];

const row2Images = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

// Tripled lists for seamless scrolling
const row1Tripled = [...row1Images, ...row1Images, ...row1Images];
const row2Tripled = [...row2Images, ...row2Images, ...row2Images];

export default function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      
      // Calculate offset: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      // Row 1 moves right (offset - 200)
      const translateX1 = offset - 200;
      // Row 2 moves left (-(offset - 200))
      const translateX2 = -(offset - 200);

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${translateX1}px, 0px, 0px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${translateX2}px, 0px, 0px)`;
      }
    };

    // Run once initially to position elements
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden marquee-strip"
      style={{ contentVisibility: "auto" }}
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Right direction marquee */}
        <div className="w-full overflow-hidden">
          <div
            ref={row1Ref}
            className="flex gap-3 will-change-transform"
            style={{
              width: "max-content",
              transform: "translate3d(-200px, 0px, 0px)",
              transition: "transform 0.1s linear",
            }}
          >
            {row1Tripled.map((url, i) => (
              <div
                key={`row1-${i}`}
                className="w-[320px] h-[200px] sm:w-[420px] sm:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 border border-white/10"
              >
                <img
                  src={url}
                  alt={`Marquee row1 asset ${i}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Left direction marquee */}
        <div className="w-full overflow-hidden">
          <div
            ref={row2Ref}
            className="flex gap-3 will-change-transform"
            style={{
              width: "max-content",
              transform: "translate3d(200px, 0px, 0px)",
              transition: "transform 0.1s linear",
            }}
          >
            {row2Tripled.map((url, i) => (
              <div
                key={`row2-${i}`}
                className="w-[320px] h-[200px] sm:w-[420px] sm:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 border border-white/10"
              >
                <img
                  src={url}
                  alt={`Marquee row2 asset ${i}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
