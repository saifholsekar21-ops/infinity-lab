import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Heart, 
  Volume2,
  X,
  CheckCircle2,
  Target,
  AlertCircle,
  Calendar,
  Briefcase
} from "lucide-react";
import { useLanguage, Language } from "../context/LanguageContext";

interface ProjectDetails {
  title: string;
  subtitle: string;
  duration: string;
  role: string;
  goals: string[];
  challenges: string[];
  solutions: string[];
  gallery: { src: string; caption: string; tag?: string }[];
}

const PROJECT_DETAILS_DATA: Record<Language, Record<"toonhub" | "quietpress" | "vex", ProjectDetails>> = {
  EN: {
    toonhub: {
      title: "ToonHub",
      subtitle: "Interactive 3D Art Gallery & Custom Toys Showcase",
      duration: "4 Weeks (Spring 2026)",
      role: "Bespoke WebGL Engineering & Visual Design",
      goals: [
        "Design a high-fidelity digital toy showcase that bridges high-end vinyl street culture with interactive Web3 presentation.",
        "Ensure lightning-fast asset loading and render speeds for heavy 3D assets on low-powered mobile devices.",
        "Implement fluid, physical inertia animations during carousel spins and interaction events."
      ],
      challenges: [
        "High-fidelity 3D model meshes were originally over 45MB each, creating severe loading lag and high frame-drops on standard browsers.",
        "Synchronizing dynamic radial lighting blooms with active streetwear color profiles required heavy custom GPU shader calculations."
      ],
      solutions: [
        "Re-topologized 3D geometry and baked lighting onto highly optimized GLTF/Draco formats, reducing individual asset size to less than 1.4MB.",
        "Built custom React-Three-Fiber hooks to dynamically interpolate lighting values on frame updates with strict dependency controls to avoid memory leaks."
      ],
      gallery: [
        { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png", caption: "STAY FOCUSED - Bold orange streetwear figurine design, reflecting raw industrial aesthetics.", tag: "Orange Strata" },
        { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png", caption: "ORGANIC STILLNESS - Matte rubber figurine pairing earthy plant tones with soft tactile curves.", tag: "Organic Green" },
        { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png", caption: "BUBBLEGUM DREAM - High-gloss pink resin design inspired by premium limited vinyl art toy cultures.", tag: "Glossy Pink" },
        { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png", caption: "AQUATIC ODYSSEY - Saturated neon-blue streetwear character with clean aquatic lines and sleek gradients.", tag: "Cerulean Blue" }
      ]
    },
    quietpress: {
      title: "QuietPress Records",
      subtitle: "Immersive Liquid Glass Turntable & Ambient Streaming Client",
      duration: "5 Weeks (Autumn 2025)",
      role: "Creative Audio Engineering & Full-Stack Architecture",
      goals: [
        "Create an audio platform that mimics the calm, deliberate ritual of listening to analog vinyl on a premium turntable.",
        "Render a physical needle arm that realistically moves and locks into place depending on active play states.",
        "Simulate dynamic liquid-glass translucent cards that reflect the color of the current track album."
      ],
      challenges: [
        "Ensuring low-latency, gapless, high-fidelity audio loops without standard browser cache constraints during track transitions.",
        "Managing heavy CSS/SVG path computations during the tonearm rotation to prevent animation stuttering on older devices."
      ],
      solutions: [
        "Architected a custom Web Audio API node tree with a custom gain compressor and high-shelf filters to mimic pleasant analog tube saturation.",
        "Utilized CSS hardware acceleration and tailored SVGs with native `will-change` properties to delegate needle movement entirely to the GPU."
      ],
      gallery: [
        { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsPtd1qZN8ijyNEEnoKxKIojsgdqmkGmdJZJjyWMtXpavX7OGJCWnF2CMlycw5BZqioyarSUA0Jqoc6EV5A0bXZTPAIPGEt0aX80MmxF9J6WvhvHPoh4uKol_ca0ermaMFWO-apg3vpIGTGAIDHJgZ0nzQPNKtKOFzRU8qBmV957l6fdILiS5ty4zkx9Pp-b8hDhFA90BaEj67dbyfRISKh2Xx2Q8t5rgk1-jIhd0IjG4FLRRxQoqOK9hS4JqzWcfLn4gqTqAoQ", caption: "Fern Light (Helia Marsh) - Crisp ambient forest modular synthesizer recording.", tag: "Fern Light" },
        { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop", caption: "Vernal Moss (Helia Marsh) - Rich organic guitar and synthesizer ambient layers.", tag: "Vernal Moss" },
        { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop", caption: "Misty Valleys (Aura Ensemble) - Ethereal, soaring tape-loops with acoustic instruments.", tag: "Misty Valleys" }
      ]
    },
    vex: {
      title: "VEX Ventures",
      subtitle: "Next-Generation Venture Studio & High-Growth Capital Portal",
      duration: "6 Weeks (Winter 2026)",
      role: "Branding, UI/UX Design & Frontend Engineering",
      goals: [
        "Formulate an editorial visual design that conveys technological superiority, financial authority, and modern minimalism.",
        "Integrate dynamic media elements seamlessly across portfolio sections without distracting from the underlying metric data.",
        "Build a fast, SEO-optimized gateway that enables early-stage founders to contact partners in under three clicks."
      ],
      challenges: [
        "Presenting dense advisory metrics, deployment stats, and portfolio data in a highly digestible and engaging manner.",
        "Delivering smooth page layouts and fluid animations during intense scrolling and tab navigation."
      ],
      solutions: [
        "Created an interactive, glassmorphic bento-grid structure that prioritizes key metric headers with clear typography pairings.",
        "Employed hardware-accelerated video containers that pause automatically when out of viewport boundaries, saving valuable CPU cycles."
      ],
      gallery: [
        { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop", caption: "VEX Investing Portal - Clean, precise venture dashboard showcasing metrics and current capital allocation.", tag: "Investing" },
        { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", caption: "VEX Building Environment - High-fidelity collaborative software development workspace preview.", tag: "Building" },
        { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop", caption: "VEX Advisory Board - Comprehensive tokenomics consulting framework and global access platform.", tag: "Advisory" }
      ]
    }
  },
  ES: {
    toonhub: {
      title: "ToonHub",
      subtitle: "Galería de Arte 3D Interactiva y Exhibición de Juguetes Personalizados",
      duration: "4 Semanas (Primavera 2026)",
      role: "Ingeniería WebGL a Medida y Diseño Visual",
      goals: [
        "Diseñar una exhibición digital de juguetes de alta fidelidad que una la cultura streetwear de vinilo con una presentación interactiva Web3.",
        "Garantizar la carga ultrarrápida y el rendimiento de renderizado para archivos 3D pesados en dispositivos móviles de bajos recursos.",
        "Implementar animaciones de inercia fluidas y físicas durante los giros del carrusel y eventos de interacción."
      ],
      challenges: [
        "Los modelos 3D originales superaban los 45 MB cada uno, provocando graves retrasos de carga y caídas de frames en navegadores estándar.",
        "Sincronizar brillos de luz radiales dinámicos con los perfiles de color del streetwear requería pesados cálculos de shaders en GPU."
      ],
      solutions: [
        "Se optimizó la geometría 3D y se procesó la iluminación en formatos GLTF/Draco altamente comprimidos, reduciendo el tamaño a menos de 1.4 MB.",
        "Se crearon hooks personalizados en React-Three-Fiber para interpolar dinámicamente los valores de iluminación en cada cuadro con dependencias estrictas."
      ],
      gallery: [
        { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png", caption: "STAY FOCUSED - Figura urbana en tono naranja que refleja una estética industrial auténtica.", tag: "Orange Strata" },
        { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png", caption: "ORGANIC STILLNESS - Figura de caucho mate que combina tonos de plantas naturales con curvas suaves.", tag: "Organic Green" },
        { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png", caption: "BUBBLEGUM DREAM - Resina rosa brillante de alta calidad inspirada en las figuras de colección de vinilo.", tag: "Glossy Pink" },
        { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png", caption: "AQUATIC ODYSSEY - Personaje de streetwear en azul neón con líneas limpias e inspiraciones acuáticas.", tag: "Cerulean Blue" }
      ]
    },
    quietpress: {
      title: "QuietPress Records",
      subtitle: "Tocadiscos Inmersivo de Cristal Líquido y Cliente de Música Ambiental",
      duration: "5 Semanas (Otoño 2025)",
      role: "Ingeniería de Audio Creativa y Arquitectura Full-Stack",
      goals: [
        "Crear una plataforma de audio que recree la calma y el ritual deliberado de escuchar vinilos analógicos en un tocadiscos premium.",
        "Renderizar un brazo de aguja físico que se mueva y fije de manera realista según el estado de reproducción.",
        "Simular tarjetas translúcidas de cristal líquido dinámicas que reflejen el color del álbum activo."
      ],
      challenges: [
        "Garantizar bucles de audio de alta fidelidad, continuos y de baja latencia sin las restricciones de caché del navegador durante transiciones de pistas.",
        "Gestionar pesados cálculos de trazado CSS/SVG durante la rotación del brazo para evitar tirones de animación en dispositivos antiguos."
      ],
      solutions: [
        "Se estructuró un nodo Web Audio API personalizado con un compresor de ganancia y filtros especializados para emular la saturación de tubo analógica.",
        "Se utilizó aceleración de hardware CSS y elementos SVG optimizados con propiedades nativas `will-change` para delegar el movimiento a la GPU."
      ],
      gallery: [
        { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsPtd1qZN8ijyNEEnoKxKIojsgdqmkGmdJZJjyWMtXpavX7OGJCWnF2CMlycw5BZqioyarSUA0Jqoc6EV5A0bXZTPAIPGEt0aX80MmxF9J6WvhvHPoh4uKol_ca0ermaMFWO-apg3vpIGTGAIDHJgZ0nzQPNKtKOFzRU8qBmV957l6fdILiS5ty4zkx9Pp-b8hDhFA90BaEj67dbyfRISKh2Xx2Q8t5rgk1-jIhd0IjG4FLRRxQoqOK9hS4JqzWcfLn4gqTqAoQ", caption: "Fern Light (Helia Marsh) - Grabación nítida de sintetizador modular inspirada en bosques.", tag: "Fern Light" },
        { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop", caption: "Vernal Moss (Helia Marsh) - Capas ambientales cálidas de guitarra y sintetizador orgánico.", tag: "Vernal Moss" },
        { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop", caption: "Misty Valleys (Aura Ensemble) - Cintas acústicas y guitarras melódicas de corte místico.", tag: "Misty Valleys" }
      ]
    },
    vex: {
      title: "VEX Ventures",
      subtitle: "Estudio de Proyectos de Próxima Generación y Portal de Capital de Alto Crecimiento",
      duration: "6 Semanas (Invierno 2026)",
      role: "Branding, Diseño UI/UX e Ingeniería Frontend",
      goals: [
        "Formular un diseño visual editorial que transmita superioridad tecnológica, autoridad financiera y minimalismo moderno.",
        "Integrar de forma fluida elementos multimedia dinámicos en las secciones de portafolio sin restar protagonismo a las métricas clave.",
        "Construir un portal rápido y optimizado para SEO que permita a los fundadores comunicarse con los socios en menos de tres clics."
      ],
      challenges: [
        "Presentar métricas de asesoramiento complejas, estadísticas de inversión y datos de portafolio de manera fácil de digerir y atractiva.",
        "Lograr transiciones perfectas y animaciones fluidas durante el desplazamiento rápido y la navegación entre pestañas."
      ],
      solutions: [
        "Se diseñó una estructura de cuadrícula bento interactiva y translúcida que prioriza métricas clave con un balance tipográfico editorial.",
        "Se implementaron contenedores de video acelerados por hardware que se pausan automáticamente al salir del viewport, reduciendo el uso de CPU."
      ],
      gallery: [
        { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop", caption: "Portal de Inversión VEX - Panel de control de proyectos limpio y preciso que expone las métricas y capitales asignados.", tag: "Inversión" },
        { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", caption: "Espacio de Desarrollo VEX - Vista previa de alta fidelidad del entorno de desarrollo colaborativo de software.", tag: "Creación" },
        { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop", caption: "Consejo Asesor VEX - Marco estratégico integral de consultoría de tokenomics y acceso global.", tag: "Asesoría" }
      ]
    }
  }
};

// TOONHUB FIGURINE DATA
export interface FigurineData {
  src: string;
  bg: string;
  panel: string;
  name: string;
  desc: string;
  alt: string;
  glow: string;
}

export const TOONHUB_FIGURINES: FigurineData[] = [
  { 
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png", 
    bg: "#F4845F", 
    panel: "#F79B7F",
    name: "STAY FOCUSED",
    desc: "An orange-attired, confidently posed 3D streetwear character designed with bold graffiti textures and custom elements.",
    alt: "A high-fidelity 3D designer toy character with a vibrant orange and soft peach color palette.",
    glow: "rgba(244, 132, 95, 0.4)"
  },
  { 
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png", 
    bg: "#6BBF7A", 
    panel: "#85CC92",
    name: "ORGANIC STILLNESS",
    desc: "A plant-inspired playful green character figurine. The 3D render emphasizes tactile rubber-like textures and soft-focus studio lighting.",
    alt: "A playful green character figurine with an organic, plant-like inspiration.",
    glow: "rgba(107, 191, 122, 0.4)"
  },
  { 
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png", 
    bg: "#E882B4", 
    panel: "#ED9DC4",
    name: "BUBBLEGUM DREAM",
    desc: "A sophisticated pink-toned 3D character with glossy accents and a friendly posture, rooted in high-end vinyl art toy designs.",
    alt: "A sophisticated pink-toned 3D character with glossy accents and a friendly posture.",
    glow: "rgba(232, 130, 180, 0.4)"
  },
  { 
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png", 
    bg: "#6EB5FF", 
    panel: "#8DC4FF",
    name: "AQUATIC ODYSSEY",
    desc: "A sleek blue character figurine with a futuristic, aquatic aesthetic, with clean lines and premium cerulean and sky blue gradients.",
    alt: "A sleek blue character figurine with a futuristic, aquatic aesthetic.",
    glow: "rgba(110, 181, 255, 0.4)"
  }
];

// QUIETPRESS RECORD DATA
export interface RecordData {
  src: string;
  name: string;
  artist: string;
  album: string;
  desc: string;
  bg: string;
  accent: string;
  duration: string;
  durationSec: number;
  url: string;
}

export const QUIETPRESS_RECORDS: RecordData[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsPtd1qZN8ijyNEEnoKxKIojsgdqmkGmdJZJjyWMtXpavX7OGJCWnF2CMlycw5BZqioyarSUA0Jqoc6EV5A0bXZTPAIPGEt0aX80MmxF9J6WvhvHPoh4uKol_ca0ermaMFWO-apg3vpIGTGAIDHJgZ0nzQPNKtKOFzRU8qBmV957l6fdILiS5ty4zkx9Pp-b8hDhFA90BaEj67dbyfRISKh2Xx2Q8t5rgk1-jIhd0IjG4FLRRxQoqOK9hS4JqzWcfLn4gqTqAoQ",
    name: "Fern Light",
    artist: "Helia Marsh",
    album: "Vernal Woods (Press 04)",
    desc: "An intentional collection of sonic textures designed for moments of stillness. Hand-selected, master-pressed, and delivered with care.",
    bg: "#0A0B0E", 
    accent: "#1D4ED8",
    duration: "4:42",
    durationSec: 282,
    url: "https://7c3d53b2-quietpress-vinyl-hero.netlify.app/#"
  },
  {
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
    name: "Vernal Moss",
    artist: "Helia Marsh",
    album: "Vernal Woods (Press 04)",
    desc: "A warm, organic modular synth recording that replicates the quiet, rustling moisture of forest floors.",
    bg: "#0E1511", 
    accent: "#6BBF7A",
    duration: "3:15",
    durationSec: 195,
    url: "https://7c3d53b2-quietpress-vinyl-hero.netlify.app/#"
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    name: "Misty Valleys",
    artist: "Aura Ensemble",
    album: "Ethereal Heights (Press 01)",
    desc: "Atmospheric acoustic guitar tape-loops blended with distant raindrops and wind chimes.",
    bg: "#160C15", 
    accent: "#E882B4",
    duration: "5:10",
    durationSec: 310,
    url: "https://7c3d53b2-quietpress-vinyl-hero.netlify.app/#"
  }
];

export default function ProjectsSection() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"toonhub" | "quietpress" | "vex">("toonhub");

  // Toonhub States
  const [toonIndex, setToonIndex] = useState(0);
  const [isToonAnimating, setIsToonAnimating] = useState(false);

  // Quietpress States
  const [recordIndex, setRecordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Persistent Bookmarks/Favorites for 3D Creations & Projects
  const [likedItems, setLikedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("infinity_labs_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("infinity_labs_bookmarks", JSON.stringify(likedItems));
    } catch (e) {
      console.error("Failed to persist bookmark state:", e);
    }
  }, [likedItems]);

  const toggleLike = (id: string) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isItemLiked = (id: string) => likedItems.includes(id);

  // Modal States
  const [activeModalProject, setActiveModalProject] = useState<"toonhub" | "quietpress" | "vex" | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const projectIds: ("toonhub" | "quietpress" | "vex")[] = ["toonhub", "quietpress", "vex"];

  const handlePrevProject = () => {
    if (!activeModalProject) return;
    const currentIndex = projectIds.indexOf(activeModalProject);
    const prevIndex = (currentIndex - 1 + projectIds.length) % projectIds.length;
    setActiveModalProject(projectIds[prevIndex]);
  };

  const handleNextProject = () => {
    if (!activeModalProject) return;
    const currentIndex = projectIds.indexOf(activeModalProject);
    const nextIndex = (currentIndex + 1) % projectIds.length;
    setActiveModalProject(projectIds[nextIndex]);
  };

  // Preload Images
  useEffect(() => {
    TOONHUB_FIGURINES.forEach((img) => {
      const i = new Image();
      i.src = img.src;
    });
    QUIETPRESS_RECORDS.forEach((rec) => {
      const i = new Image();
      i.src = rec.src;
    });
  }, []);

  // TOONHUB HANDLERS
  const handleToonNext = () => {
    if (isToonAnimating) return;
    setIsToonAnimating(true);
    setToonIndex((prev) => (prev + 1) % TOONHUB_FIGURINES.length);
    setTimeout(() => setIsToonAnimating(false), 650);
  };

  const handleToonPrev = () => {
    if (isToonAnimating) return;
    setIsToonAnimating(true);
    setToonIndex((prev) => (prev - 1 + TOONHUB_FIGURINES.length) % TOONHUB_FIGURINES.length);
    setTimeout(() => setIsToonAnimating(false), 650);
  };

  const handleToonSelect = (index: number) => {
    if (index === toonIndex || isToonAnimating) return;
    setIsToonAnimating(true);
    setToonIndex(index);
    setTimeout(() => setIsToonAnimating(false), 650);
  };

  // QUIETPRESS CONTROLS
  const activeRecord = QUIETPRESS_RECORDS[recordIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= activeRecord.durationSec) {
            // End of track: go to next track or pause
            if (recordIndex < QUIETPRESS_RECORDS.length - 1) {
              setRecordIndex((p) => p + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeRecord.durationSec, recordIndex]);

  const handleRecordSelect = (idx: number) => {
    if (idx === recordIndex) {
      setIsPlaying(!isPlaying);
      return;
    }
    setRecordIndex(idx);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleQuietPrev = () => {
    setCurrentTime(0);
    setRecordIndex((prev) => (prev - 1 + QUIETPRESS_RECORDS.length) % QUIETPRESS_RECORDS.length);
    setIsPlaying(true);
  };

  const handleQuietNext = () => {
    setCurrentTime(0);
    setRecordIndex((prev) => (prev + 1) % QUIETPRESS_RECORDS.length);
    setIsPlaying(true);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    setCurrentTime(Math.floor(percentage * activeRecord.durationSec));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const activeFigurine = TOONHUB_FIGURINES[toonIndex];
  const sectionBgColor = 
    activeTab === "toonhub" 
      ? activeFigurine.bg 
      : activeTab === "quietpress" 
        ? activeRecord.bg 
        : "#050608";

  // KEYBOARD LISTENER EFFECT
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomedImage) {
          setZoomedImage(null);
        } else if (activeModalProject) {
          setActiveModalProject(null);
        }
      } else if (activeModalProject && !zoomedImage) {
        if (e.key === "ArrowLeft") {
          handlePrevProject();
        } else if (e.key === "ArrowRight") {
          handleNextProject();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalProject, zoomedImage]);

  return (
    <motion.section
      id="projects"
      animate={{ backgroundColor: sectionBgColor }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden transition-colors z-20 py-16 sm:py-24 px-5 sm:px-10 md:px-16"
      style={{ contentVisibility: "auto" }}
    >
      {/* 1. Subtle Ambient Grain Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-4 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 2. CSS Animation styles injected for vinyl spinning */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spinRecord {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .vinyl-spin {
          animation: spinRecord 6s linear infinite;
        }
      `}} />

      {/* 3. Immersive quietpress & VEX Background Video Overlays */}
      {activeTab === "quietpress" && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-35"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_183632_c311af08-e4b7-458f-81e7-79847a49b3d3.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
        </div>
      )}
      {activeTab === "vex" && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
        </div>
      )}

      {/* 4. Title Header & Project Tab Switcher */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center z-30 relative mb-8 sm:mb-12 gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <h2 className="text-white text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
              {t("projects") || "PROJECTS"} / SELECTED WORK
            </h2>
          </div>
        </div>

        {/* High-End Segmented Sliding Pill Switcher */}
        <div className="flex bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg">
          <button
            onClick={() => setActiveTab("toonhub")}
            className={`relative px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 z-10 cursor-pointer ${
              activeTab === "toonhub" ? "text-black" : "text-white/60 hover:text-white"
            }`}
          >
            {activeTab === "toonhub" && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-white rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            ToonHub 3D
          </button>
          <button
            onClick={() => setActiveTab("quietpress")}
            className={`relative px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 z-10 cursor-pointer ${
              activeTab === "quietpress" ? "text-black" : "text-white/60 hover:text-white"
            }`}
          >
            {activeTab === "quietpress" && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-white rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            QuietPress Vinyl
          </button>
          <button
            onClick={() => setActiveTab("vex")}
            className={`relative px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 z-10 cursor-pointer ${
              activeTab === "vex" ? "text-black" : "text-white/60 hover:text-white"
            }`}
          >
            {activeTab === "vex" && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-white rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            VEX Ventures
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
          <Sparkles className="h-3.5 w-3.5 text-white/90" />
          <span className="text-[10px] text-white/90 font-medium tracking-wider uppercase">
            {activeTab === "toonhub" 
              ? "Interactive 3D Art Gallery" 
              : activeTab === "quietpress" 
                ? "Liquid Glass Record Player" 
                : "Venture Studio & Capital"}
          </span>
        </div>
      </div>

      {/* 5. Main Dynamic Showcase Container (Transitions smoothly on active tab) */}
      <AnimatePresence mode="wait">
        {activeTab === "toonhub" ? (
          <motion.div
            key="toonhub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 w-full flex flex-col justify-between"
          >
            {/* Giant Ghost Text "3D SHAPE" in background */}
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none overflow-hidden z-0 pointer-events-none">
              <h1 
                className="font-black text-white/5 uppercase select-none tracking-tighter"
                style={{ 
                  fontSize: "clamp(4.5rem, 24vw, 360px)",
                  lineHeight: 0.8,
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.08)"
                }}
              >
                3D SHAPE
              </h1>
            </div>

            {/* Main Figurine Showcase Stage */}
            <div className="relative flex-1 w-full flex items-center justify-center min-h-[400px] sm:min-h-[480px] md:min-h-[550px] z-20">
              {TOONHUB_FIGURINES.map((figurine, idx) => {
                const total = TOONHUB_FIGURINES.length;
                const offset = (idx - toonIndex + total) % total;

                // Compute exact position states
                let leftValue = "50%";
                let xValue = "-50%";
                let scaleValue = 1;
                let opacityValue = 1;
                let zIndexValue = 30;
                let blurValue = "blur(0px)";
                let pointerEvents: "auto" | "none" = "auto";

                if (offset === 0) {
                  leftValue = "50%";
                  xValue = "-50%";
                  scaleValue = 1.0;
                  opacityValue = 1;
                  zIndexValue = 30;
                  blurValue = "blur(0px)";
                  pointerEvents = "auto";
                } else if (offset === 1) {
                  leftValue = "85%";
                  xValue = "-70%";
                  scaleValue = 0.65;
                  opacityValue = 0.4;
                  zIndexValue = 20;
                  blurValue = "blur(3px)";
                  pointerEvents = "auto";
                } else if (offset === total - 1) {
                  leftValue = "15%";
                  xValue = "-30%";
                  scaleValue = 0.65;
                  opacityValue = 0.4;
                  zIndexValue = 20;
                  blurValue = "blur(3px)";
                  pointerEvents = "auto";
                } else {
                  leftValue = "50%";
                  xValue = "-50%";
                  scaleValue = 0.4;
                  opacityValue = 0;
                  zIndexValue = 10;
                  blurValue = "blur(8px)";
                  pointerEvents = "none";
                }

                return (
                  <motion.div
                    key={figurine.name}
                    style={{
                      position: "absolute",
                      bottom: "5%",
                      pointerEvents
                    }}
                    animate={{
                      left: leftValue,
                      x: xValue,
                      scale: scaleValue,
                      opacity: opacityValue,
                      zIndex: zIndexValue,
                      filter: blurValue
                    }}
                    whileHover={offset === 0 ? {
                      scale: scaleValue * 1.05,
                      y: -10,
                      transition: { duration: 0.3, ease: "easeOut" }
                    } : undefined}
                    transition={{
                      duration: 0.7,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="w-[82%] sm:w-[48%] md:w-[40%] max-w-[480px] transform-origin-bottom cursor-pointer flex flex-col items-center"
                    onClick={() => {
                      if (offset === 0) {
                        setActiveModalProject("toonhub");
                      } else {
                        handleToonSelect(idx);
                      }
                    }}
                  >
                    {/* Figurine image with depth shadow */}
                    <div className="relative group w-full">
                      {/* Glow ring in background of active item */}
                      {offset === 0 && (
                        <motion.div
                          layoutId="activeGlow"
                          className="absolute inset-0 rounded-full bg-white/10 blur-[80px] -z-10"
                          style={{ backgroundColor: figurine.glow }}
                        />
                      )}
                      <img
                        src={figurine.src}
                        alt={figurine.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:scale-[1.08] select-none"
                        draggable="false"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Control overlay and details bar */}
            <div className="w-full z-30 relative mt-8 sm:mt-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
              {/* Left Side: Figurine info and details */}
              <div className="flex flex-col gap-4 text-center md:text-left max-w-md w-full">
                <div className="space-y-2">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={activeFigurine.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="text-white text-2xl sm:text-3xl font-black uppercase tracking-wider"
                    >
                      {activeFigurine.name}
                    </motion.h3>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeFigurine.desc}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="text-white/80 text-xs sm:text-sm leading-relaxed"
                    >
                      {activeFigurine.desc}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="flex gap-4 items-center justify-center md:justify-start mt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={handleToonPrev}
                      disabled={isToonAnimating}
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
                      aria-label="Previous figurine"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleToonNext}
                      disabled={isToonAnimating}
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
                      aria-label="Next figurine"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => setActiveModalProject("toonhub")}
                    className="px-5 py-3 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Case Study</span>
                  </button>
                  <button
                    onClick={() => toggleLike(activeFigurine.name)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      isItemLiked(activeFigurine.name)
                        ? "bg-red-500/20 border-red-500 text-red-500 fill-red-500 scale-105"
                        : "border-white/15 text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    aria-label="Favorite figurine"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Right Side: Primary Call-to-action */}
              <div className="flex flex-col items-center md:items-end gap-3">
                <div className="flex gap-2 mb-1">
                  {TOONHUB_FIGURINES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleToonSelect(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                        i === toonIndex ? "w-8 bg-white" : "w-1.5 bg-white/40"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <a
                  href="https://toonhub-carousel-855891842501.asia-southeast1.run.app"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 group text-white hover:text-white/90 transition-colors"
                >
                  <span 
                    className="font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-none border-b-2 border-transparent group-hover:border-white transition-all duration-300"
                  >
                    DISCOVER IT
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform duration-300">
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        ) : activeTab === "quietpress" ? (
          <motion.div
            key="quietpress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 w-full flex flex-col justify-between z-10"
          >
            {/* Main Music Deck and Player Container */}
            <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center justify-center py-4">
              
              {/* LEFT COLUMN: THE HIGH-FIDELITY TURNTABLE BLOCK */}
              <div className="lg:col-span-6 flex items-center justify-center relative">
                <div className="relative w-80 h-80 sm:w-[370px] sm:h-[370px] rounded-3xl bg-[#121316] border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                  
                  {/* Turntable Platter Outer Rim */}
                  <div className="absolute inset-5 sm:inset-6 rounded-full bg-[#18191D] border border-white/5 flex items-center justify-center shadow-inner">
                    
                    {/* Spinning Vinyl Platter */}
                    <div 
                      className={`relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-full bg-black shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-white/15 flex items-center justify-center p-1 cursor-pointer transition-transform duration-300 active:scale-[0.98] ${
                        isPlaying ? "vinyl-spin" : ""
                      }`}
                      style={{
                        animationPlayState: isPlaying ? "running" : "paused"
                      }}
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {/* Grooved Rings */}
                      <div className="absolute inset-4 rounded-full border border-white/5 opacity-40 pointer-events-none" />
                      <div className="absolute inset-8 rounded-full border border-white/5 opacity-40 pointer-events-none" />
                      <div className="absolute inset-12 rounded-full border border-white/5 opacity-30 pointer-events-none" />
                      <div className="absolute inset-16 rounded-full border border-white/5 opacity-30 pointer-events-none" />
                      <div className="absolute inset-20 rounded-full border border-white/5 opacity-20 pointer-events-none" />
                      <div className="absolute inset-24 rounded-full border border-white/5 opacity-20 pointer-events-none" />
                      <div className="absolute inset-28 rounded-full border border-white/5 opacity-10 pointer-events-none" />
 
                      {/* Active Album Center Artwork */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[4px] border-[#121316] relative flex items-center justify-center shadow-inner">
                        <img 
                          src={activeRecord.src} 
                          alt={activeRecord.name} 
                          className="w-full h-full object-cover select-none pointer-events-none" 
                          referrerPolicy="no-referrer"
                        />
                        {/* Spindle hole */}
                        <div className="absolute w-3 h-3 rounded-full bg-[#121316] border border-white/10 shadow-inner flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                        </div>
                      </div>
                    </div>
 
                  </div>
 
                  {/* Tonearm (Saves state, slides needle on/off the record) */}
                  <div 
                    className="absolute top-4 right-4 z-20 origin-[65px_15px]"
                    style={{ 
                      transform: isPlaying ? "rotate(24deg)" : "rotate(0deg)", 
                      transition: "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)" 
                    }}
                  >
                    <svg width="100" height="150" viewBox="0 0 100 150" fill="none">
                      {/* Pivot joint */}
                      <circle cx="65" cy="15" r="14" fill="#18181B" stroke="#3F3F46" strokeWidth="2" />
                      <circle cx="65" cy="15" r="6" fill={activeRecord.accent} /> 
                      
                      {/* Arm metal rod */}
                      <path d="M 65 15 L 35 105 L 25 125" stroke="#D4D4D8" strokeWidth="3" strokeLinecap="round" />
                      
                      {/* Stylus head cartridge */}
                      <rect x="15" y="122" width="16" height="20" rx="2" fill="#27272A" transform="rotate(-15 23 132)" />
                      {/* Highlight needle tip indicator */}
                      <circle cx="21" cy="138" r="2.5" fill={activeRecord.accent} />
                    </svg>
                  </div>
 
                  {/* Turntable Red Strobe Light */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5 text-[9px] text-zinc-400 font-mono select-none">
                    <span className={`w-1.5 h-1.5 rounded-full bg-red-500 ${isPlaying ? "animate-pulse" : "opacity-60"}`} />
                    <span>33 RPM</span>
                  </div>
 
                  {/* Vinyl Record Label Indicator */}
                  <div className="absolute top-4 left-4 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-[9px] text-white/70 tracking-widest uppercase font-mono font-bold">
                    DECK A
                  </div>
 
                </div>
              </div>
 
              {/* RIGHT COLUMN: INTERACTIVE GLASS-CARD CONTROLLER */}
              <div className="lg:col-span-6 flex flex-col justify-center gap-6">
                
                {/* Now Playing main glass container */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  
                  {/* Subtle record visual signal */}
                  <div className="absolute top-6 right-6 flex items-center gap-2 text-xs font-mono font-bold text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <Volume2 className="h-3.5 w-3.5 text-white animate-pulse" />
                    <span>Hi-Fi Analog</span>
                  </div>
 
                  <div className="flex items-center gap-4 sm:gap-6 mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-lg border border-white/10 relative group cursor-pointer" onClick={() => setActiveModalProject("quietpress")}>
                      <img 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" 
                        src={activeRecord.src} 
                        alt={activeRecord.name}
                        referrerPolicy="no-referrer"
                      />
                      {/* Interactive visual media preview loop on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 scale-110 group-hover:scale-100 transition-transform duration-700"
                          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          {isPlaying ? (
                            <Pause className="h-6 w-6 text-white fill-white/20" />
                          ) : (
                            <Play className="h-6 w-6 text-white fill-white/20" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-white/50 tracking-widest uppercase font-mono block mb-1">
                        {activeRecord.album}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-white leading-none mb-1.5 tracking-wide">
                        {activeRecord.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/70 font-semibold">
                        {activeRecord.artist}
                      </p>
                    </div>
                  </div>
 
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    {activeRecord.desc}
                  </p>
 
                  {/* Interactive Scrub Progress Bar */}
                  <div className="mb-6">
                    <div 
                      onClick={handleProgressBarClick}
                      className="h-1.5 bg-white/15 rounded-full w-full mb-2 overflow-hidden cursor-pointer relative group"
                    >
                      {/* Active highlight fill */}
                      <div 
                        className="h-full transition-all duration-300"
                        style={{ 
                          width: `${(currentTime / activeRecord.durationSec) * 100}%`,
                          backgroundColor: activeRecord.accent
                        }}
                      />
                      {/* Scrub handle overlay on hover */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ left: `calc(${(currentTime / activeRecord.durationSec) * 100}% - 7px)` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/55 font-mono font-bold uppercase tracking-wider">
                      <span>{formatTime(currentTime)}</span>
                      <span>{activeRecord.duration}</span>
                    </div>
                  </div>
 
                  {/* Playback Button bar */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleQuietPrev}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                        aria-label="Previous Track"
                      >
                        <SkipBack className="h-4.5 w-4.5" />
                      </button>
                      
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-white cursor-pointer shadow-lg"
                        style={{ backgroundColor: activeRecord.accent }}
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5 fill-white" />
                        ) : (
                          <Play className="h-5 w-5 fill-white translate-x-0.5" />
                        )}
                      </button>
                      
                      <button 
                        onClick={handleQuietNext}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                        aria-label="Next Track"
                      >
                        <SkipForward className="h-4.5 w-4.5" />
                      </button>
                    </div>
 
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleLike(activeRecord.name)}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          isItemLiked(activeRecord.name)
                            ? "bg-red-500/20 border-red-500 text-red-500 fill-red-500" 
                            : "border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                        aria-label="Favorite"
                      >
                        <Heart className="h-4.5 w-4.5" />
                      </button>
 
                      <button 
                        onClick={() => setActiveModalProject("quietpress")}
                        className="flex items-center gap-2 bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Case Study</span>
                      </button>

                      <a 
                        href={activeRecord.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-white text-black text-xs font-bold px-4 py-2.5 rounded-full hover:bg-white/95 active:scale-95 transition-transform"
                      >
                        <span>Listen Live</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
 
                </div>
 
                {/* Playlist quick-switch deck */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-white/55 tracking-wider uppercase font-bold font-mono">
                    Select Track (Press Selection)
                  </span>
                  <div className="flex flex-col gap-2">
                    {QUIETPRESS_RECORDS.map((track, i) => (
                      <button
                        key={track.name}
                        onClick={() => handleRecordSelect(i)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer group hover:scale-[1.01] ${
                          i === recordIndex
                            ? "bg-white/10 border-white/20 text-white shadow-lg translate-x-1"
                            : "bg-white/0 border-transparent text-white/50 hover:bg-white/5 hover:text-white hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold opacity-60">0{i + 1}</span>
                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 relative">
                            <img 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125" 
                              src={track.src} 
                              alt={track.name} 
                              referrerPolicy="no-referrer" 
                            />
                            {/* Hover live audio wave visual preview overlay */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex items-end gap-[1.5px] h-3">
                                <motion.span 
                                  animate={{ height: ["20%", "100%", "20%"] }} 
                                  transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} 
                                  className="w-[1.5px] bg-white rounded-full" 
                                />
                                <motion.span 
                                  animate={{ height: ["40%", "100%", "40%"] }} 
                                  transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut", delay: 0.2 }} 
                                  className="w-[1.5px] bg-white rounded-full" 
                                />
                                <motion.span 
                                  animate={{ height: ["30%", "100%", "30%"] }} 
                                  transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.1 }} 
                                  className="w-[1.5px] bg-white rounded-full" 
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-bold tracking-wide block leading-none mb-0.5">{track.name}</span>
                            <span className="text-[10px] opacity-70 font-semibold">{track.artist}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {i === recordIndex && isPlaying ? (
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                          ) : null}
                          <span className="text-xs font-mono opacity-60 font-semibold">{track.duration}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
 
              </div>
 
            </div>
 
            {/* Quietpress footer indicator */}
            <div className="w-full z-30 relative mt-4 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-light font-mono gap-4">
              <div>
                © 2026 quietpress. records cut for the calm listener.
              </div>
              <div className="flex gap-4">
                <a href={activeRecord.url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  anthology
                </a>
                <span>•</span>
                <a href={activeRecord.url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  talents
                </a>
                <span>•</span>
                <a href={activeRecord.url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  sound diary
                </a>
              </div>
            </div>
 
          </motion.div>
        ) : (
          <motion.div
            key="vex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 w-full flex flex-col justify-between z-10"
          >
            {/* Main VEX Showcase Layout */}
            <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center justify-center py-6 sm:py-8">
              
              {/* LEFT COLUMN: THE BOLD STATEMENT & HEADING */}
              <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left justify-center h-full">
                <div className="inline-flex self-center lg:self-start bg-white/10 border border-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-white font-mono text-[10px] tracking-widest uppercase shadow-sm">
                  VEX Venture Studio & Capital
                </div>

                <div className="space-y-4">
                  {/* Staggered animated title */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] uppercase">
                    Shaping tomorrow <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white">
                      with vision
                    </span> <br />
                    and action.
                  </h1>

                  <p className="text-gray-300 text-base sm:text-lg font-light max-w-md mx-auto lg:mx-0">
                    We back visionaries and craft ventures that define what comes next. Investing, building, and advising high-growth systems with pristine aesthetic and technological superiority.
                  </p>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <button 
                    onClick={() => {
                      const contactBtn = document.getElementById("contact-trigger") || document.querySelector("[href='#contact']");
                      if (contactBtn) {
                        (contactBtn as HTMLElement).click();
                      } else {
                        window.location.hash = "contact";
                      }
                    }}
                    className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-[1.04] transition-transform duration-300 shadow-xl cursor-pointer"
                  >
                    Start a Chat
                  </button>
                  <a 
                    href="https://b02e2e08-quietpress-vinyl-hero.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white/10 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider border border-white/15 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Explore VEX</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => setActiveModalProject("vex")}
                    className="bg-white/5 text-white/90 border border-white/15 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white/15 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Case Study</span>
                  </button>
                  <button
                    onClick={() => toggleLike("VEX Ventures")}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      isItemLiked("VEX Ventures")
                        ? "bg-red-500/20 border-red-500 text-red-500 fill-red-500 scale-105"
                        : "border-white/15 text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    aria-label="Favorite project"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: INTERACTIVE PILL CARDS FOR SERVICES */}
              <div className="lg:col-span-6 flex flex-col justify-center gap-6 w-full max-w-lg mx-auto">
                <div className="flex flex-col gap-1.5 mb-2 text-center lg:text-left">
                  <span className="text-[10px] text-white/55 tracking-wider uppercase font-bold font-mono">
                    Core Pillars (Design Philosophy)
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      title: "Investing",
                      tagline: "Strategic Seed Capital",
                      desc: "We fund bold early-stage founders with high-signal conviction, offering capital and instant distribution networks.",
                      stat: "15+ Active Co's",
                      accent: "#1D4ED8",
                      metric: "$14M Deployed"
                    },
                    {
                      title: "Building",
                      tagline: "High-Fidelity Engineering",
                      desc: "We construct software, designs, and systems in-house, pairing meticulous pixel precision with hyper-scale infrastructure.",
                      stat: "4 Active Builds",
                      accent: "#6BBF7A",
                      metric: "100% In-House"
                    },
                    {
                      title: "Advisory",
                      tagline: "Architecture & Tokenomics",
                      desc: "We provide battle-tested counsel for tokenomics structure, international scaling, and strategic positioning.",
                      stat: "$85M raised for clients",
                      accent: "#E882B4",
                      metric: "Top Tier Access"
                    }
                  ].map((service, idx) => (
                    <div
                      key={service.title}
                      onClick={() => setActiveModalProject("vex")}
                      className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-white/25 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 shadow-lg overflow-hidden cursor-pointer"
                    >
                      {/* Interactive background video preview on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
                        />
                      </div>

                      {/* Accent glow on hover */}
                      <div 
                        className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl transition-all duration-300 z-10"
                        style={{ backgroundColor: service.accent }}
                      />

                      <div className="relative z-10 flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-50 block">
                            Pillar 0{idx + 1} • {service.tagline}
                          </span>
                          <h4 className="text-lg font-extrabold text-white tracking-wide">
                            {service.title}
                          </h4>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-[10px] font-mono font-extrabold text-white/80">
                          {service.metric}
                        </div>
                      </div>

                      <p className="relative z-10 text-white/75 text-xs sm:text-sm leading-relaxed mb-3 font-medium">
                        {service.desc}
                      </p>

                      <div className="relative z-10 flex items-center gap-2 text-[10px] font-mono font-bold text-white/55 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 inline-flex self-start">
                        <Sparkles className="h-3 w-3 text-white/80" />
                        <span>{service.stat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* VEX footer indicator */}
            <div className="w-full z-30 relative mt-4 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-light font-mono gap-4">
              <div>
                © 2026 VEX. shaping tomorrow with vision and action.
              </div>
              <div className="flex gap-4">
                <span className="hover:text-white transition-colors cursor-pointer">story</span>
                <span>•</span>
                <span className="hover:text-white transition-colors cursor-pointer">investing</span>
                <span>•</span>
                <span className="hover:text-white transition-colors cursor-pointer">building</span>
                <span>•</span>
                <span className="hover:text-white transition-colors cursor-pointer">advisory</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* CASE STUDY DETAILS MODAL */}
      <AnimatePresence>
        {activeModalProject && (() => {
          const projectDetails = PROJECT_DETAILS_DATA[language === "ES" ? "ES" : "EN"][activeModalProject];
          if (!projectDetails) return null;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
              onClick={() => setActiveModalProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 30, opacity: 0 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="relative w-full max-w-5xl bg-[#0d0e12] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8 max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Close Button and Project Switcher */}
                <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-black/65 backdrop-blur-md border border-white/15 rounded-full p-1 shadow-md">
                    <button
                      onClick={handlePrevProject}
                      className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                      title={language === "ES" ? "Proyecto anterior" : "Previous Project"}
                      aria-label="Previous project"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <span className="text-[10px] font-mono font-bold px-2 text-gray-400 select-none">
                      {projectIds.indexOf(activeModalProject) + 1} / {projectIds.length}
                    </span>
                    <button
                      onClick={handleNextProject}
                      className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                      title={language === "ES" ? "Siguiente proyecto" : "Next Project"}
                      aria-label="Next project"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const nameMap: Record<string, string> = {
                        toonhub: "ToonHub",
                        quietpress: "QuietPress Records",
                        vex: "VEX Ventures"
                      };
                      toggleLike(nameMap[activeModalProject] || activeModalProject);
                    }}
                    className={`p-2.5 rounded-full border transition-all duration-300 shadow-md cursor-pointer ${
                      isItemLiked(
                        (({
                          toonhub: "ToonHub",
                          quietpress: "QuietPress Records",
                          vex: "VEX Ventures"
                        } as Record<string, string>)[activeModalProject] || activeModalProject)
                      )
                        ? "bg-red-500/20 border-red-500 text-red-500 fill-red-500 scale-105"
                        : "bg-black/50 border-white/15 text-white/70 hover:bg-white hover:text-black hover:border-white"
                    }`}
                    title={language === "ES" ? "Guardar en favoritos" : "Add to Favorites"}
                    aria-label="Favorite project"
                  >
                    <Heart className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="p-2.5 rounded-full bg-black/50 border border-white/15 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-md cursor-pointer"
                    aria-label="Close details"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Scrollable Content Container */}
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                  
                  {/* Top Project Hero Section */}
                  <div className="relative py-12 px-6 sm:px-12 bg-gradient-to-br from-[#121318] via-[#0d0e12] to-[#16171d] border-b border-white/10 overflow-hidden">
                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
                    
                    <div className="relative z-10 space-y-4 max-w-3xl">
                      <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-white uppercase">
                        <Sparkles className="h-3 w-3" />
                        <span>Case Study Details</span>
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-none">
                        {projectDetails.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                        {projectDetails.subtitle}
                      </p>

                      {/* Meta stats block */}
                      <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-gray-300">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
                          <Calendar className="h-4 w-4 text-white/70" />
                          <span>{projectDetails.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
                          <Briefcase className="h-4 w-4 text-white/70" />
                          <span>{projectDetails.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Case Study Details Grid */}
                  <div className="p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
                    
                    {/* LEFT COLUMN: goals, challenges, solutions */}
                    <div className="lg:col-span-6 space-y-8">
                      {/* Section 1: Project Goals */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <Target className="h-4 w-4 text-emerald-400" />
                          </div>
                          <h4 className="text-white font-extrabold uppercase text-xs tracking-widest font-mono">
                            {language === "ES" ? "Objetivos del Proyecto" : "Project Goals"}
                          </h4>
                        </div>
                        <ul className="space-y-3 pl-1">
                          {projectDetails.goals.map((goal, i) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed font-medium">
                              <span className="text-emerald-400 font-mono font-bold mt-0.5">0{i+1}.</span>
                              <span>{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Section 2: Core Challenges */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 text-amber-400" />
                          </div>
                          <h4 className="text-white font-extrabold uppercase text-xs tracking-widest font-mono">
                            {language === "ES" ? "Desafíos Críticos" : "Critical Challenges"}
                          </h4>
                        </div>
                        <ul className="space-y-3 pl-1">
                          {projectDetails.challenges.map((challenge, i) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed font-medium">
                              <span className="text-amber-400 font-mono font-bold mt-0.5">0{i+1}.</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Section 3: Engineering Solutions */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-blue-400" />
                          </div>
                          <h4 className="text-white font-extrabold uppercase text-xs tracking-widest font-mono">
                            {language === "ES" ? "Soluciones Creativas" : "Creative Solutions"}
                          </h4>
                        </div>
                        <ul className="space-y-3 pl-1">
                          {projectDetails.solutions.map((solution, i) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed font-medium">
                              <span className="text-blue-400 font-mono font-bold mt-0.5">0{i+1}.</span>
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Interactive Visual Gallery */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <h4 className="text-white font-extrabold uppercase text-xs tracking-widest font-mono">
                          {language === "ES" ? "Galería de Recursos Visuales" : "Visual Asset Gallery"}
                        </h4>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {projectDetails.gallery.length} ITEMS • CLICK TO ZOOM
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {projectDetails.gallery.map((item, i) => (
                          <div
                            key={i}
                            className="group relative bg-white/5 border border-white/15 rounded-2xl overflow-hidden p-3 hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
                          >
                            {/* Image Wrapper */}
                            <div 
                              onClick={() => setZoomedImage(item.src)}
                              className="relative aspect-square rounded-xl overflow-hidden bg-black/20 flex items-center justify-center cursor-zoom-in"
                            >
                              <img
                                src={item.src}
                                alt={item.caption}
                                referrerPolicy="no-referrer"
                                className="w-[85%] h-[85%] object-contain drop-shadow-xl transition-all duration-500 group-hover:scale-110"
                                draggable="false"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-white text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full scale-90 group-hover:scale-100 transition-all duration-300">
                                  {language === "ES" ? "Ampliar" : "Zoom View"}
                                </span>
                              </div>
                              {item.tag && (
                                <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md text-white/90">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            
                            {/* Caption Text */}
                            <p className="mt-3 text-xs text-gray-400 font-medium leading-relaxed leading-normal group-hover:text-white/90 transition-colors">
                              {item.caption}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Modal Footer info and help line with project switcher */}
                <div className="px-6 sm:px-12 py-5 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest text-center sm:text-left">
                    <span>© 2026 INFINITY LABS CASE STUDIES</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{language === "ES" ? "Pulse ESC o fuera para salir" : "Press ESC or click outside to close"}</span>
                  </div>

                  {/* Previous and Next Project button list */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrevProject}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white/70 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 rounded-full transition-all duration-300 cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>{language === "ES" ? "Anterior" : "Previous"}</span>
                    </button>
                    <button
                      onClick={handleNextProject}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white/70 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 rounded-full transition-all duration-300 cursor-pointer"
                    >
                      <span>{language === "ES" ? "Siguiente" : "Next"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* FULLSCREEN ZOOMED IMAGE LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 cursor-zoom-out"
          >
            <div className="absolute top-6 right-6 z-30">
              <button
                onClick={() => setZoomedImage(null)}
                className="p-3 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                aria-label="Close zoom"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={zoomedImage}
                alt="Zoomed showcase asset"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[80vh] object-contain rounded-xl drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
