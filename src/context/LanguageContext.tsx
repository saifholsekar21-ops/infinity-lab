import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "EN" | "ES";

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// High-quality professional translations dictionary
const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Nav & Common
    about: "About",
    price: "Price",
    projects: "Projects",
    contact: "Contact",
    contactMe: "Contact Me",
    liveProject: "Live Project",
    closeWindow: "Close Window",

    // Hero Section
    heroHeading: "Hi, i'm INFINITY LABS",
    heroDesc: "a 3d creator driven by crafting striking and unforgettable projects",

    // About Section
    aboutHeading: "About me",
    aboutText: "INFINITY LABS is a modern creative digital studio focused on building high-performance, 3D-animated websites and scalable digital experiences for startups, companies, and growing brands. Our approach blends clean UI/UX, immersive animations, and robust full-stack development to create websites that don't just look premium, but perform and convert.",
    teamTitle: "TEAM COMPOSITION",
    teamDesc: "We are a 4-member powerhouse team combining 3 skilled web developers and 1 social media advertiser, uniting design, tech, motion, and hyper-targeted growth strategy.",
    philosophyTitle: "STUDIO PHILOSOPHY",
    philosophyDesc: "We believe in building real, production-ready solutions—not prototypes—using cutting-edge web technologies and creative storytelling. Helping brands stand out, scale, and grow infinitely.",
    specialtiesTitle: "CORE SPECIALTIES",
    spec1: "3D Animated & Interactive Websites",
    spec2: "Full-Stack Web Development",
    spec3: "UI/UX & Motion-Driven Design",
    spec4: "Branding & Digital Identity",
    spec5: "Social Media Advertising & Growth Campaigns",

    // Services Section
    servicesHeading: "Services",
    serv1Title: "3D Modeling",
    serv1Desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
    serv2Title: "Rendering",
    serv2Desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
    serv3Title: "Motion Design",
    serv3Desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
    serv4Title: "Branding",
    serv4Desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
    serv5Title: "Web Design",
    serv5Desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",

    // Projects Section
    projectsHeading: "Project",
    categoryClient: "CLIENT",
    categoryPersonal: "PERSONAL",

    // Contact Modal
    contactTitle: "GET IN TOUCH",
    contactSubtitle: "Reach out directly to partner with INFINITY LABS",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    locationBadge: "Global Remote Service",

    // Toast Notification
    toastStatus: "BEAMING UP EXPERIENCE",
    toastProgress: "Routing secure gateway token... Preparing interactive real-time viewport presentation.",
    toastConnected: "CONNECTED",
    toastGateway: "GATEWAY",

    // FAQ Section
    faqHeading: "F.A.Q.",
    faqSubtitle: "Find answers to common questions about our creative workflow, timelines, and services.",
    faqQ1: "What is your typical project timeline?",
    faqA1: "For standard high-performance websites and 3D animated landing pages, our timeline typically spans between 4 to 6 weeks. This includes strategic onboarding, custom UI/UX design, bespoke 3D modeling, full-stack integration, and precise responsive performance testing.",
    faqQ2: "How do you handle client communication?",
    faqA2: "We maintain absolute transparency. We use dedicated Slack/Discord channels for daily asynchronous status updates, and we conduct bi-weekly interactive video syncs with live, high-fidelity demos on our staging servers so you always see actual development progress.",
    faqQ3: "What technologies does Infinity Labs specialize in?",
    faqA3: "We build on modern, highly-optimized ecosystems including React, Vite, and Tailwind CSS. For lightweight immersive 3D elements, we utilize advanced WebGL pipelines and optimized asset compression alongside robust full-stack servers and high-speed global CDNs.",
    faqQ4: "Do you offer post-launch support and growth services?",
    faqA4: "Absolutely. Beyond custom software engineering, our social media growth specialist structures and deploys high-converting ad campaigns, while our developers provide continuous platform maintenance, telemetry monitoring, and ongoing search engine optimization."
  },
  ES: {
    // Nav & Common
    about: "Nosotros",
    price: "Tarifas",
    projects: "Proyectos",
    contact: "Contacto",
    contactMe: "Contáctanos",
    liveProject: "Ver Proyecto",
    closeWindow: "Cerrar Ventana",

    // Hero Section
    heroHeading: "Hola, soy INFINITY LABS",
    heroDesc: "un creador 3d enfocado en diseñar proyectos impactantes e inolvidables",

    // About Section
    aboutHeading: "Sobre nosotros",
    aboutText: "INFINITY LABS es un estudio creativo digital moderno especializado en construir sitios web interactivos de alto rendimiento y experiencias digitales escalables para empresas emergentes, corporaciones y marcas en crecimiento. Unimos interfaces elegantes, animaciones inmersivas y un robusto desarrollo full-stack.",
    teamTitle: "COMPOSICIÓN DEL EQUIPO",
    teamDesc: "Somos una fuerza de 4 expertos que integra 3 desarrolladores de software y 1 publicista estratégico de redes sociales, fusionando diseño de vanguardia con campañas orientadas a resultados.",
    philosophyTitle: "FILOSOFÍA DEL ESTUDIO",
    philosophyDesc: "Creemos en construir aplicaciones digitales premium y robustas listas para producción, no simples prototipos. Nuestra meta es dotar a las marcas de las herramientas necesarias para escalar de forma infinita.",
    specialtiesTitle: "NUESTRAS ESPECIALIDADES",
    spec1: "Sitios Web Animados en 3D e Interactivos",
    spec2: "Desarrollo Web Full-Stack",
    spec3: "Interfaces de Usuario UI/UX y Animación Digital",
    spec4: "Branding, Logotipos y Sistemas de Identidad",
    spec5: "Publicidad Multiplataforma y Estrategias de Crecimiento",

    // Services Section
    servicesHeading: "Servicios",
    serv1Title: "Modelado 3D",
    serv1Desc: "Creación de modelos de alta fidelidad, personajes complejos o entornos virtuales optimizados para videojuegos, demostraciones de productos y renderizado interactivo.",
    serv2Title: "Renderizado 3D",
    serv2Desc: "Generación de imágenes fotorrealistas de alta calidad combinando sistemas avanzados de iluminación, texturizado físico y materiales fotorrealistas.",
    serv3Title: "Diseño de Movimiento",
    serv3Desc: "Animaciones dinámicas fluidas y efectos visuales cinéticos que aportan ritmo y narrativa inmersiva a los ecosistemas digitales de tu marca.",
    serv4Title: "Identidad de Marca",
    serv4Desc: "Construcción integral de sistemas de diseño visual, pautas de marca, logotipos emblemáticos y directrices gráficas premium.",
    serv5Title: "Diseño Web",
    serv5Desc: "Diseño estético y optimizado para la conversión, estructurando la tipografía, jerarquías visuales y la facilidad de navegación del usuario.",

    // Projects Section
    projectsHeading: "Proyectos",
    categoryClient: "CLIENTE",
    categoryPersonal: "PERSONAL",

    // Contact Modal
    contactTitle: "CONTACTAR",
    contactSubtitle: "Comunícate directamente con nuestro equipo para iniciar tu proyecto",
    emailLabel: "Correo Electrónico",
    phoneLabel: "Número Telefónico",
    locationBadge: "Servicio Remoto Global",

    // Toast Notification
    toastStatus: "CONECTANDO EXPERIENCIA",
    toastProgress: "Estableciendo canal de transmisión seguro... Cargando portal interactivo en tiempo real.",
    toastConnected: "CONECTADO",
    toastGateway: "PORTAL",

    // FAQ Section
    faqHeading: "Preguntas Frecuentes",
    faqSubtitle: "Encuentra respuestas a las dudas comunes sobre nuestro flujo creativo, plazos de entrega y servicios.",
    faqQ1: "¿Cuál es el plazo de entrega típico de un proyecto?",
    faqA1: "Para sitios web estándar de alto rendimiento y páginas de destino interactivas en 3D, nuestro plazo suele ser de 4 a 6 semanas. Esto abarca el onboarding estratégico, el diseño UI/UX personalizado, el modelado 3D especializado, la ingeniería full-stack y optimizaciones de rendimiento multiplataforma.",
    faqQ2: "¿Cómo gestionan la comunicación con los clientes?",
    faqA2: "Mantenemos absoluta transparencia. Utilizamos canales dedicados de Slack o Discord para resúmenes diarios asincrónicos, además de videollamadas quincenales interactivas con demostraciones en vivo sobre nuestros servidores de prueba para que siempre veas avances reales.",
    faqQ3: "¿En qué tecnologías se especializa Infinity Labs?",
    faqA3: "Desarrollamos sobre ecosistemas de software sumamente ágiles y modernos como React, Vite y Tailwind CSS. Para elementos envolventes e interactivos en 3D, empleamos pipelines avanzados de WebGL y técnicas de compresión optimizada, junto a servidores en la nube de alta disponibilidad.",
    faqQ4: "¿Ofrecen servicios de mantenimiento técnico y marketing?",
    faqA4: "Sin duda alguna. Además de ingeniería de software a medida, nuestro especialista en crecimiento digital diseña y ejecuta campañas publicitarias enfocadas a la conversión, mientras que el equipo de desarrollo provee soporte de plataforma continuo, telemetría y optimización SEO integral."
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "ES" : "EN"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
