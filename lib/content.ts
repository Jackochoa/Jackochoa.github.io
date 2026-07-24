import { z } from "zod";

export const LocaleSchema = z.enum(["en", "es"]);
export type Locale = z.infer<typeof LocaleSchema>;

const ProjectSchema = z.object({
  slug: z.string().min(1),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  outcome: z.string().min(1),
  category: z.string().min(1),
  stack: z.array(z.string()).min(1),
  accent: z.enum(["moss", "clay", "sun", "sage"]),
  scope: z.string().min(1),
  status: z.string().min(1),
  projectType: z.string().min(1),
  role: z.string().min(1),
  services: z.array(z.string()).min(1),
  proof: z.array(z.string()).min(1),
  media: z.array(z.object({
    path: z.string().min(1),
    type: z.string().min(1),
    alt: z.string().min(1),
    caption: z.string().min(1),
    aspectRatio: z.string().min(1),
  })),
  architectureSummary: z.string().min(1),
  privacyNotes: z.string().min(1),
  year: z.string().min(1),
  problem: z.string().min(1),
  decisions: z.array(z.string()).min(2),
  evidence: z.array(z.string()).min(2),
  lessons: z.array(z.string()).min(2),
  visualLabel: z.string().min(1),
  visualDetail: z.string().min(1),
});

export type ProjectCase = z.infer<typeof ProjectSchema>;

const copy = {
  en: {
    nav: { work: "Work", about: "About", process: "Process", contact: "Start a conversation" },
    home: {
      kicker: "Independent product engineer · Guayaquil / remote",
      title: "Web products for problems that do not fit a template",
      intro: "I design the experience, build the system, and verify the edges so teams and users can make decisions with confidence.",
      primary: "Discuss your project",
      secondary: "View work",
      proof: "Real systems across operations, education, infrastructure, and science.",
      servicesKicker: "Services",
      servicesTitle: "From the decision to the system behind it.",
      services: [
        ["Product strategy and design", "Frame the problem, decisions, and first useful outcome."],
        ["Software architecture", "Models, contracts, and boundaries that keep change understandable."],
        ["Full-stack development", "Typed, tested interfaces and services ready to operate."],
        ["Scientific and operational tools", "Surfaces that make dense information legible."],
      ],
      workKicker: "Selected work",
      workTitle: "Systems built for real conditions.",
      workAll: "View all work",
      processKicker: "Process",
      processTitle: "AI to accelerate. Human judgment to decide.",
      processIntro: "I use agents and automation under supervision: intent, tradeoffs, and final responsibility are not delegated.",
      process: [
        ["01", "Understand", "Users, context, constraints, and evidence."],
        ["02", "Focus", "The critical decision and early value slice."],
        ["03", "Build", "Product, architecture, and automation."],
        ["04", "Verify", "Tests, accessibility, security, and review."],
        ["05", "Support", "Documentation and rationale for continuity."],
      ],
      stackKicker: "Stack",
      stackTitle: "The tools I reach for, grouped by what they do.",
      domainsKicker: "Complex domains",
      domainsTitle: "Complexity is not the problem. Missing structure is.",
      domains: [
        ["Complex products", "Roles, permissions, and workflows that need more than a landing page."],
        ["Operations", "Systems where signal, continuity, and traceability matter."],
        ["Science and education", "Tools that explore data and turn difficult material into action."],
      ],
      aboutKicker: "About",
      aboutTitle: "Product thinking with engineering follow-through.",
      about: "I work between product and engineering: finding the shape of the problem, then building a system another person can understand, use, and continue.",
      aboutLink: "More about how I work",
      contact: ["Is there a difficult part that needs to move?", "Bring the context. We will find the shape.", "Write by email or WhatsApp."],
    },
    work: { kicker: "Case studies", title: "Work with a point of view.", intro: "Sanitized stories from products, systems, science, and operations. Each one focuses on the decisions—not just the screenshots.", all: "All work" },
    about: { kicker: "About", title: "Product thinking with an engineer’s follow-through.", intro: "I’m Jackson Ochoa, an independent product engineer building useful systems across web, education, science, and operations.", body: "I work end-to-end: understand the problem, make the experience legible, build the system, and leave it in a state another human can trust. The stack changes with the problem; the standard does not.", principles: [["Make the problem visible", "Good delivery starts before the first component. I name the users, constraints, and decision that matters."], ["Keep complexity useful", "Architecture should make the next change safer, not turn today’s work into a ceremony."], ["Prove the edges", "Tests, accessibility, security, and honest content are part of the product—not cleanup after it."]], portrait: "Portrait placeholder — replace with approved photograph before launch." },
    process: { kicker: "Process", title: "A clear path through uncertain work.", intro: "The method is lightweight enough for a small team and rigorous enough for a product people depend on.", phases: [["Discover", "Map the people, problem, constraints, and evidence before proposing a solution."], ["Design", "Shape the content and interface around the decisions users actually need to make."], ["Build", "Deliver a vertical slice, keep the architecture legible, and use automation where it earns its place."], ["Verify", "Review behavior, keyboard access, performance, security, and maintainability before calling it done."], ["Evolve", "Document the reasoning so the product can keep moving after handoff."]], close: "The goal is not more software. It is less uncertainty between an idea and its useful form." },
    privacy: { kicker: "Privacy", title: "Small site, small footprint.", intro: "This portfolio uses the least data needed to understand whether the work is reaching the right people.", points: ["Contact-form details are sent directly to Formspree so Jackson can reply; this site does not store them. Formspree processes that data under its own privacy policy.", "Email opens your own mail client. WhatsApp opens an external WhatsApp conversation and is subject to WhatsApp’s privacy policy.", "Optional Umami analytics measure anonymous page views and selected interface events without cookies or email addresses.", "GitHub Pages and connected services may process technical request data under their own policies.", "Case studies are sanitized and should never be treated as access to private project code or data."], updated: "Last reviewed July 2026." },
  },
  es: {
    nav: { work: "Proyectos", about: "Sobre mí", process: "Proceso", contact: "Hablemos" },
    home: {
      kicker: "Product engineer independiente · Guayaquil / remoto",
      title: "Productos web para problemas que no entran en una plantilla",
      intro: "Diseño la experiencia, construyo el sistema y verifico los bordes para que equipos y usuarios puedan decidir con confianza.",
      primary: "Hablemos de tu proyecto",
      secondary: "Ver proyectos",
      proof: "Sistemas reales en operaciones, educación, infraestructura y ciencia.",
      servicesKicker: "Servicios",
      servicesTitle: "De la decisión al sistema que la sostiene.",
      services: [
        ["Estrategia y diseño de producto", "Aterrizar el problema, las decisiones y el primer resultado útil."],
        ["Arquitectura de software", "Modelos, contratos y límites que permiten evolucionar sin perder claridad."],
        ["Desarrollo full-stack", "Interfaces y servicios tipados, probados y listos para operar."],
        ["Herramientas científicas y operativas", "Superficies que vuelven legible información densa."],
      ],
      workKicker: "Proyectos seleccionados",
      workTitle: "Sistemas construidos para condiciones reales.",
      workAll: "Ver todos los proyectos",
      processKicker: "Proceso",
      processTitle: "IA para acelerar. Criterio humano para decidir.",
      processIntro: "Uso agentes y automatización bajo supervisión: la intención, los tradeoffs y la responsabilidad final no se delegan.",
      process: [
        ["01", "Entender", "Usuarios, contexto, restricciones y evidencia."],
        ["02", "Enfocar", "La decisión crítica y el slice de valor temprano."],
        ["03", "Construir", "Producto, arquitectura y automatización."],
        ["04", "Verificar", "Tests, accesibilidad, seguridad y revisión."],
        ["05", "Acompañar", "Documentación y criterio para continuar."],
      ],
      stackKicker: "Stack",
      stackTitle: "Las herramientas que uso, agrupadas por lo que hacen.",
      domainsKicker: "Dominios complejos",
      domainsTitle: "La complejidad no es el problema. La falta de estructura, sí.",
      domains: [
        ["Productos complejos", "Roles, permisos y flujos que no se resuelven con una landing."],
        ["Operaciones", "Sistemas donde señal, continuidad y trazabilidad importan."],
        ["Ciencia y educación", "Herramientas para explorar datos y convertir material difícil en acción."],
      ],
      aboutKicker: "Sobre mí",
      aboutTitle: "Pensamiento de producto con seguimiento de ingeniería.",
      about: "Trabajo entre producto e ingeniería: encuentro la forma del problema y construyo un sistema que otra persona pueda entender, usar y continuar.",
      aboutLink: "Más sobre mi forma de trabajo",
      contact: ["¿Hay una parte difícil que necesita avanzar?", "Traé el contexto. Encontramos la forma.", "Podés escribirme por correo o WhatsApp."],
    },
    work: { kicker: "Casos", title: "Trabajo con criterio.", intro: "Historias sanitizadas de productos, sistemas, ciencia y operaciones. Cada una se enfoca en las decisiones, no solo en las capturas.", all: "Todos los proyectos" },
    about: { kicker: "Sobre mí", title: "Pensamiento de producto con seguimiento de ingeniero.", intro: "Soy Jackson Ochoa, product engineer independiente. Construyo sistemas útiles para web, educación, ciencia y operaciones.", body: "Trabajo end-to-end: entiendo el problema, vuelvo legible la experiencia, construyo el sistema y lo dejo en un estado que otra persona pueda confiar. El stack cambia con el problema; el estándar no.", principles: [["Hacer visible el problema", "La buena entrega empieza antes del primer componente. Nombramos usuarios, restricciones y decisión importante."], ["Mantener útil la complejidad", "La arquitectura debe volver más segura la próxima modificación, no convertir el trabajo en ceremonia."], ["Probar los bordes", "Tests, accesibilidad, seguridad y contenido honesto son parte del producto." ]], portrait: "Placeholder de retrato — reemplazar por fotografía aprobada antes del lanzamiento." },
    process: { kicker: "Proceso", title: "Un camino claro por trabajo incierto.", intro: "El método es liviano para un equipo pequeño y riguroso para un producto del que la gente depende.", phases: [["Descubrir", "Mapear personas, problema, restricciones y evidencia antes de proponer solución."], ["Diseñar", "Dar forma a contenido e interfaz alrededor de las decisiones reales del usuario."], ["Construir", "Entregar un slice vertical, mantener arquitectura legible y automatizar donde valga la pena."], ["Verificar", "Revisar comportamiento, teclado, rendimiento, seguridad y mantenimiento antes de darlo por hecho."], ["Evolucionar", "Documentar el criterio para que el producto siga avanzando después de la entrega."]], close: "El objetivo no es más software. Es menos incertidumbre entre una idea y su forma útil." },
    privacy: { kicker: "Privacidad", title: "Sitio pequeño, huella pequeña.", intro: "Este portafolio usa los datos mínimos para entender si el trabajo llega a las personas correctas.", points: ["Los datos del formulario se envían directamente a Formspree para que Jackson pueda responder; este sitio no los guarda. Formspree procesa esos datos según su propia política de privacidad.", "El email abre tu propio cliente de correo. WhatsApp abre una conversación externa y queda sujeto a la política de privacidad de WhatsApp.", "La analítica opcional de Umami mide vistas anónimas y eventos puntuales sin cookies ni correos.", "GitHub Pages y servicios conectados pueden procesar datos técnicos según sus propias políticas.", "Los casos están sanitizados y nunca implican acceso a código o datos privados."], updated: "Revisado en julio de 2026." },
  },
} as const;

const projects = {
  en: [
    { slug: "e-grua", eyebrow: "Operations platform", title: "E‑Grúa", summary: "A multi-sided platform for crane and forklift operations, connecting customers, operators, and administration through responsive web experiences.", outcome: "Make a high-stakes service request understandable from first tap to fulfillment.", category: "Products", stack: ["Next.js", "React", "TypeScript", "NestJS", "Prisma", "Zod", "Tailwind CSS", "PWA", "pnpm", "Docker"], accent: "sage", scope: "Product, shared contracts, and platform", year: "2026", problem: "A field service platform has different people, permissions, locations, documents, pricing rules, and moments of urgency. Each surface must stay clear while the system stays consistent.", decisions: ["Separate customer, operator, and admin responsibilities without duplicating the domain model.", "Use shared schemas to keep API, validation, and interfaces aligned.", "Design for mobile-first work while keeping administration legible on larger screens."], evidence: ["Customer and operator PWA surfaces plus an administration dashboard.", "Shared TypeScript and Zod contracts across client and API boundaries.", "Operational concepts including verification, documents, pricing, ratings, and reporting."], lessons: ["Multi-sided products become understandable when each role sees only the next useful decision.", "Shared contracts are a product tool: they keep promises consistent across surfaces."], visualLabel: "Field coordination", visualDetail: "People · places · service" , status: "In development", projectType: "Client project", role: "Product design, architecture, and full-stack development", services: ["Product design", "Software architecture", "Full-stack development"], proof: ["Customer, operator, and administration workflows", "Shared TypeScript and Zod contracts across client and API boundaries"], media: [], architectureSummary: "A multi-sided web platform with shared contracts connecting customer, operator, and administration experiences.", privacyNotes: "Case details are sanitized; no client operations, documents, pricing, or personal data are published." },
    { slug: "briquette-lms", eyebrow: "Education platform", title: "Briquette LMS", summary: "A multi-tenant learning system for a bioinformatics course, shaped around roles, modules, submissions, and live communication.", outcome: "Make a demanding technical curriculum easier to operate and easier to learn.", category: "Products", stack: ["React", "TypeScript", "Vite", "Express", "Drizzle", "PostgreSQL", "Socket.io", "Tailwind CSS", "Playwright", "Docker"], accent: "moss", scope: "Product, platform, and delivery", year: "2026", problem: "A technical course needed one dependable place for administrators, teachers, and students to move through content, work, feedback, and communication without losing the thread.", decisions: ["Model roles and tenant boundaries before polishing screens.", "Keep course modules, submissions, grading, and communication in one understandable flow.", "Treat security, backups, and operational runbooks as part of the product."], evidence: ["Distinct experiences for admin, teacher, and student responsibilities.", "Module-scoped communication, materials, assignments, submissions, and feedback.", "Typed full-stack architecture with tests, audits, and deployment documentation."], lessons: ["A learning product is an orchestration problem before it is a component problem.", "The most useful interface is often the one that makes the next responsibility obvious."], visualLabel: "Learning system", visualDetail: "Roles · modules · feedback" , status: "In production", projectType: "Own product", role: "Founder and lead developer", services: ["Product strategy", "Product design", "Full-stack development"], proof: ["Multi-tenant learning workflows for administrators, teachers, and students", "Typed full-stack architecture with tests and operational documentation"], media: [], architectureSummary: "A multi-tenant learning platform that unifies roles, modules, submissions, feedback, and communication.", privacyNotes: "No learner, course, tenant, or operational data is published." },
    { slug: "rust-dashboard", eyebrow: "Systems dashboard", title: "Rust Dashboard", summary: "A system and Docker dashboard pairing a Rust agent with a Svelte interface for operational visibility.", outcome: "Turn low-level system signals into a calm surface for decisions.", category: "Operations", stack: ["Rust", "Axum", "Tokio", "Svelte", "TypeScript", "Vite", "SQLite", "Docker", "WebSockets"], accent: "clay", scope: "Architecture, agent, and interface", year: "2026", problem: "System state is rich but rarely legible. Operators need a small, trustworthy surface that turns containers, resources, and events into action.", decisions: ["Keep collection and presentation separate so the agent remains useful beyond one UI.", "Use a typed contract at the boundary between Rust data and the Svelte surface.", "Design the dashboard around signal hierarchy, not a wall of metrics."], evidence: ["Rust agent architecture for system and Docker information.", "Svelte dashboard shell with typed data and operational states.", "Traefik-fronted deployment shape prepared for real environments."], lessons: ["Observability is a product design problem: signal without hierarchy is noise.", "A small contract can preserve freedom between a systems agent and its interfaces."], visualLabel: "Operational signal", visualDetail: "Agent · containers · state" , status: "In production", projectType: "Personal tool", role: "Architecture, Rust agent, and web dashboard", services: ["Systems architecture", "Rust development", "Dashboard development"], proof: ["Rust agent for system and Docker information", "Web dashboard with typed operational states"], media: [], architectureSummary: "A Rust collection agent is separated from a typed web dashboard so system data can serve more than one interface.", privacyNotes: "Infrastructure details, hostnames, addresses, credentials, and live system data are not published." },
    { slug: "mitocircos-studio", eyebrow: "Scientific visualization", title: "MitoCircos Studio", summary: "An exploratory visual studio for mitochondrial datasets, using interactive charts to make biological structure easier to inspect.", outcome: "Give scientific data a visual grammar people can explore instead of merely export.", category: "Science", stack: ["React", "TypeScript", "Vite", "D3", "Tailwind CSS", "Vitest"], accent: "sun", scope: "Product concept and visualization", year: "2026", problem: "Dense biological data asks users to hold too much structure in their heads. The interface needed to make relationships, patterns, and context visible together.", decisions: ["Treat visualization as a guided reading experience, not a chart catalog.", "Keep data transformations explicit so visual conclusions remain inspectable.", "Use interaction to reveal detail progressively rather than front-load every label."], evidence: ["React and D3 foundation for interactive scientific visuals.", "Reusable chart surface and icon language for a focused exploration tool.", "A visual direction that connects scientific rigor with approachable interaction."], lessons: ["Scientific tools earn trust when the visual story is inspectable.", "Good data UI leaves room for curiosity without hiding the underlying structure."], visualLabel: "Data structure", visualDetail: "Patterns · context · exploration" , status: "Functional scientific project", projectType: "Scientific tool", role: "Tool design and development", services: ["Scientific tool design", "Data visualization", "Frontend development"], proof: ["Interactive React and D3 visualizations for mitochondrial datasets", "Explicit data transformations and progressive interaction"], media: [], architectureSummary: "A focused scientific interface combining explicit data transformations with interactive D3 visualization surfaces.", privacyNotes: "No unpublished research data or private datasets are included." }
  ],
  es: [
    { slug: "e-grua", eyebrow: "Plataforma operativa", title: "E‑Grúa", summary: "Una plataforma multi-lado para operaciones de grúas y montacargas, que conecta clientes, operadores y administración en experiencias web responsivas.", outcome: "Volver entendible un pedido de servicio crítico desde el primer toque hasta la entrega.", category: "Productos", stack: ["Next.js", "React", "TypeScript", "NestJS", "Prisma", "Zod", "Tailwind CSS", "PWA", "pnpm", "Docker"], accent: "sage", scope: "Producto, contratos compartidos y plataforma", year: "2026", problem: "Una plataforma de servicios de campo reúne personas, permisos, ubicaciones, documentos, reglas de precio y momentos urgentes. Cada superficie debe ser clara y el sistema consistente.", decisions: ["Separar responsabilidades de cliente, operador y administración sin duplicar dominio.", "Usar schemas compartidos para alinear API, validación e interfaces.", "Diseñar mobile-first para el trabajo y mantener administración legible en pantallas grandes."], evidence: ["Superficies PWA para clientes y operadores más dashboard administrativo.", "Contratos TypeScript y Zod compartidos entre cliente y API.", "Conceptos operativos de verificación, documentos, precios, calificaciones y reportes."], lessons: ["Los productos multi-lado se entienden cuando cada rol ve solo la próxima decisión útil.", "Los contratos compartidos son una herramienta de producto: mantienen promesas consistentes."], visualLabel: "Coordinación de campo", visualDetail: "Personas · lugares · servicio" , status: "En desarrollo", projectType: "Proyecto para cliente", role: "Diseño de producto, arquitectura y desarrollo full-stack", services: ["Diseño de producto", "Arquitectura de software", "Desarrollo full-stack"], proof: ["Flujos para cliente, operador y administración", "Contratos TypeScript y Zod compartidos entre cliente y API"], media: [], architectureSummary: "Una plataforma web multi-lado con contratos compartidos que conecta experiencias de cliente, operador y administración.", privacyNotes: "Los detalles del caso están sanitizados; no se publican operaciones, documentos, precios ni datos personales del cliente." },
    { slug: "briquette-lms", eyebrow: "Plataforma educativa", title: "Briquette LMS", summary: "Un sistema de aprendizaje multi-tenant para un curso de bioinformática, organizado alrededor de roles, módulos, entregas y comunicación en vivo.", outcome: "Volver más operable y más aprendible un currículo técnico exigente.", category: "Productos", stack: ["React", "TypeScript", "Vite", "Express", "Drizzle", "PostgreSQL", "Socket.io", "Tailwind CSS", "Playwright", "Docker"], accent: "moss", scope: "Producto, plataforma y entrega", year: "2026", problem: "Un curso técnico necesitaba un lugar confiable para que administración, docentes y estudiantes recorrieran contenido, trabajo, feedback y comunicación sin perder el hilo.", decisions: ["Modelar roles y límites de tenant antes de pulir pantallas.", "Mantener módulos, entregas, calificaciones y comunicación en un flujo entendible.", "Tratar seguridad, backups y runbooks operativos como parte del producto."], evidence: ["Experiencias distintas para responsabilidades de administración, docencia y estudiantes.", "Comunicación por módulo, materiales, tareas, entregas y feedback.", "Arquitectura full-stack tipada con tests, auditorías y documentación de despliegue."], lessons: ["Un producto educativo es un problema de orquestación antes que de componentes.", "La interfaz más útil suele volver obvia la próxima responsabilidad."], visualLabel: "Sistema de aprendizaje", visualDetail: "Roles · módulos · feedback" , status: "En producción", projectType: "Producto propio", role: "Fundador y lead developer", services: ["Estrategia de producto", "Diseño de producto", "Desarrollo full-stack"], proof: ["Flujos de aprendizaje multi-tenant para administración, docentes y estudiantes", "Arquitectura full-stack tipada con tests y documentación operativa"], media: [], architectureSummary: "Una plataforma de aprendizaje multi-tenant que unifica roles, módulos, entregas, feedback y comunicación.", privacyNotes: "No se publican datos de estudiantes, cursos, tenants ni operaciones." },
    { slug: "rust-dashboard", eyebrow: "Dashboard de sistemas", title: "Rust Dashboard", summary: "Un dashboard de sistema y Docker que combina un agente en Rust con una interfaz Svelte para visibilidad operativa.", outcome: "Convertir señales de bajo nivel en una superficie tranquila para decidir.", category: "Operaciones", stack: ["Rust", "Axum", "Tokio", "Svelte", "TypeScript", "Vite", "SQLite", "Docker", "WebSockets"], accent: "clay", scope: "Arquitectura, agente e interfaz", year: "2026", problem: "El estado de un sistema es rico pero pocas veces legible. Operaciones necesita una superficie confiable que convierta contenedores, recursos y eventos en acción.", decisions: ["Separar colección y presentación para que el agente sirva más allá de una UI.", "Usar un contrato tipado entre datos Rust y la superficie Svelte.", "Diseñar alrededor de jerarquía de señales, no de una pared de métricas."], evidence: ["Arquitectura de agente Rust para información de sistema y Docker.", "Shell de dashboard Svelte con datos tipados y estados operativos.", "Forma de despliegue detrás de Traefik preparada para entornos reales."], lessons: ["La observabilidad es un problema de producto: señal sin jerarquía es ruido.", "Un contrato pequeño conserva libertad entre agente de sistemas e interfaces."], visualLabel: "Señal operativa", visualDetail: "Agente · contenedores · estado" , status: "En producción", projectType: "Herramienta personal", role: "Arquitectura, agente Rust y dashboard web", services: ["Arquitectura de sistemas", "Desarrollo en Rust", "Desarrollo de dashboards"], proof: ["Agente Rust para información de sistema y Docker", "Dashboard web con estados operativos tipados"], media: [], architectureSummary: "Un agente Rust de recolección está separado de un dashboard web tipado para que los datos sirvan a más de una interfaz.", privacyNotes: "No se publican detalles de infraestructura, hostnames, direcciones, credenciales ni datos en vivo." },
    { slug: "mitocircos-studio", eyebrow: "Visualización científica", title: "MitoCircos Studio", summary: "Un estudio visual exploratorio para datasets mitocondriales, con gráficos interactivos que vuelven más fácil inspeccionar estructura biológica.", outcome: "Dar a los datos científicos una gramática visual que se pueda explorar, no solo exportar.", category: "Ciencia", stack: ["React", "TypeScript", "Vite", "D3", "Tailwind CSS", "Vitest"], accent: "sun", scope: "Concepto de producto y visualización", year: "2026", problem: "Los datos biológicos densos exigen sostener demasiada estructura en la cabeza. La interfaz debía mostrar relaciones, patrones y contexto juntos.", decisions: ["Tratar la visualización como lectura guiada, no como catálogo de gráficos.", "Mantener transformaciones explícitas para que las conclusiones sean inspeccionables.", "Usar interacción para revelar detalle progresivamente."], evidence: ["Base React y D3 para visuales científicos interactivos.", "Superficie de gráficos e iconografía reutilizable para una herramienta enfocada.", "Dirección visual que conecta rigor científico con interacción cercana."], lessons: ["Las herramientas científicas generan confianza cuando su historia visual se puede inspeccionar.", "Una buena interfaz de datos deja lugar a la curiosidad sin ocultar la estructura."], visualLabel: "Estructura de datos", visualDetail: "Patrones · contexto · exploración" , status: "Proyecto científico funcional", projectType: "Herramienta científica", role: "Diseño y desarrollo de la herramienta", services: ["Diseño de herramientas científicas", "Visualización de datos", "Desarrollo frontend"], proof: ["Visualizaciones interactivas con React y D3 para datasets mitocondriales", "Transformaciones explícitas e interacción progresiva"], media: [], architectureSummary: "Una interfaz científica enfocada que combina transformaciones de datos explícitas con superficies de visualización D3 interactivas.", privacyNotes: "No se incluyen datos de investigación inéditos ni datasets privados." }
  ],
} satisfies Record<Locale, ProjectCase[]>;

for (const locale of ["en", "es"] as const) {
  for (const project of projects[locale]) ProjectSchema.parse(project);
}

/* Stack grouped by category. `icon` is a simple-icons slug (mapped in the
 * component), `asset` is a local brand mark when the icon set has no exact
 * match, and `badge` provides a compact wordmark fallback. `declared: true`
 * marks broader practice or local tooling that is not evidenced in the four
 * case studies. */
export type StackEntry = { name: string; icon: string | null; asset?: string; badge?: string; declared?: boolean };
export type StackGroup = { label: { en: string; es: string }; items: StackEntry[] };
export type StackProof = { title: { en: string; es: string }; detail: { en: string; es: string }; slug?: string };

export const stackGroups: StackGroup[] = [
  { label: { en: "Languages", es: "Lenguajes" }, items: [
    { name: "TypeScript", icon: "siTypescript" },
    { name: "Rust", icon: "siRust" },
    { name: "Python", icon: "siPython" },
    { name: "Bash", icon: "siGnubash" },
    { name: "R", icon: "siR" },
    { name: "Perl", icon: "siPerl" },
  ] },
  { label: { en: "Web foundations", es: "Fundamentos web" }, items: [
    { name: "HTML", icon: "siHtml5" },
    { name: "CSS", icon: "siCss" },
    { name: "JavaScript", icon: "siJavascript" },
  ] },
  { label: { en: "Frontend", es: "Frontend" }, items: [
    { name: "React", icon: "siReact" },
    { name: "Next.js", icon: "siNextdotjs" },
    { name: "Svelte", icon: "siSvelte" },
    { name: "Vite", icon: "siVite" },
    { name: "D3", icon: "siD3" },
    { name: "Tailwind CSS", icon: "siTailwindcss" },
    { name: "PWA", icon: null, badge: "PWA" },
  ] },
  { label: { en: "Backend", es: "Backend" }, items: [
    { name: "NestJS", icon: "siNestjs" },
    { name: "Express", icon: "siExpress" },
    { name: "Axum", icon: null, badge: "AX" },
    { name: "Tokio", icon: "siTokio" },
    { name: "Socket.io", icon: "siSocketdotio" },
    { name: "WebSockets", icon: null, badge: "WS" },
    { name: "Zod", icon: "siZod" },
  ] },
  { label: { en: "Data", es: "Datos" }, items: [
    { name: "PostgreSQL", icon: "siPostgresql" },
    { name: "SQLite", icon: "siSqlite" },
    { name: "Prisma", icon: "siPrisma" },
    { name: "Drizzle", icon: "siDrizzle" },
    { name: "Redis", icon: "siRedis", declared: true },
    { name: "MSSQL", icon: null, badge: "MSSQL", declared: true },
    { name: "MySQL", icon: "siMysql", declared: true },
  ] },
  { label: { en: "Delivery / collaboration", es: "Entrega / colaboración" }, items: [
    { name: "Git", icon: "siGit" },
    { name: "GitHub", icon: "siGithub" },
    { name: "GitLab", icon: "siGitlab", declared: true },
    { name: "GitHub Actions", icon: "siGithubactions" },
    { name: "Docker", icon: "siDocker" },
    { name: "Conda", icon: null, asset: "/conda-mark.svg" },
    { name: "Mamba", icon: null, asset: "/mamba-mark.png" },
    { name: "npm", icon: "siNpm" },
    { name: "pnpm", icon: "siPnpm" },
    { name: "Playwright", icon: null, badge: "PW" },
    { name: "Vitest", icon: null, badge: "VT" },
    { name: "Vercel", icon: "siVercel" },
  ] },
  { label: { en: "Cloud / Infra", es: "Cloud / Infra" }, items: [
    { name: "AWS", icon: null, badge: "AWS", declared: true },
    { name: "GCP", icon: "siGooglecloud", declared: true },
    { name: "Azure", icon: null, badge: "AZ", declared: true },
    { name: "OCI", icon: null, badge: "OCI", declared: true },
    { name: "Firebase", icon: "siFirebase", declared: true },
  ] },
];

export const stackProof: StackProof[] = [
  {
    title: { en: "E‑Grúa", es: "E‑Grúa" },
    detail: { en: "HTML · CSS · JavaScript · TypeScript · Next.js · React · NestJS · Prisma · Zod · Tailwind CSS · pnpm · Docker", es: "HTML · CSS · JavaScript · TypeScript · Next.js · React · NestJS · Prisma · Zod · Tailwind CSS · pnpm · Docker" },
    slug: "e-grua",
  },
  {
    title: { en: "Briquette LMS", es: "Briquette LMS" },
    detail: { en: "HTML · CSS · JavaScript · TypeScript · React · Vite · Express · Drizzle · PostgreSQL · Socket.io · Tailwind CSS · Playwright · Docker", es: "HTML · CSS · JavaScript · TypeScript · React · Vite · Express · Drizzle · PostgreSQL · Socket.io · Tailwind CSS · Playwright · Docker" },
    slug: "briquette-lms",
  },
  {
    title: { en: "Rust Dashboard", es: "Rust Dashboard" },
    detail: { en: "HTML · CSS · JavaScript · TypeScript · Rust · Axum · Tokio · Svelte · Vite · SQLite · Docker · WebSockets", es: "HTML · CSS · JavaScript · TypeScript · Rust · Axum · Tokio · Svelte · Vite · SQLite · Docker · WebSockets" },
    slug: "rust-dashboard",
  },
  {
    title: { en: "MitoCircos Studio", es: "MitoCircos Studio" },
    detail: { en: "HTML · CSS · JavaScript · TypeScript · React · Vite · D3 · Tailwind CSS · Vitest", es: "HTML · CSS · JavaScript · TypeScript · React · Vite · D3 · Tailwind CSS · Vitest" },
    slug: "mitocircos-studio",
  },
  {
    title: { en: "Bioinformatics pipelines", es: "Pipelines bioinformáticos" },
    detail: { en: "BP-SBS and FungaPlasmidDetect · Python · Bash · Conda · Mamba · Perl · R", es: "BP-SBS y FungaPlasmidDetect · Python · Bash · Conda · Mamba · Perl · R" },
  },
  {
    title: { en: "Delivery workflow", es: "Flujo de entrega" },
    detail: { en: "Git · GitHub · GitHub Actions · Docker · npm · pnpm · Vercel previews", es: "Git · GitHub · GitHub Actions · Docker · npm · pnpm · previews de Vercel" },
  },
];

export const stackNote = {
  en: "The evidence map links the projects and pipelines where the stack is demonstrated. * Broader practice or local tooling, not a claim about the four public cases.",
  es: "El mapa de evidencia enlaza los proyectos y pipelines donde se demuestra el stack. * Práctica más amplia o tooling local, no una afirmación sobre los cuatro casos públicos.",
};

export function getCopy(locale: Locale) {
  return copy[locale];
}

export function getProjects(locale: Locale) {
  return projects[locale];
}

export function getProject(locale: Locale, slug: string) {
  return projects[locale].find((project) => project.slug === slug);
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

export function getLocalizedPath(locale: Locale, path: string) {
  if (locale === "es") {
    if (path === "/") return "/";
    if (path.startsWith("/en/work/")) return path.replace("/en/work/", "/proyectos/");
    if (path.startsWith("/work/")) return path.replace("/work/", "/proyectos/");
    if (path === "/work/") return "/proyectos/";
    if (path === "/about/") return "/sobre-mi/";
    if (path === "/process/") return "/proceso/";
    if (path === "/privacy/") return "/privacidad/";
    return path;
  }
  return path.startsWith("/en/") ? path : (path === "/" ? "/en/" : `/en${path}`);
}

export function getEnglishPathFromSpanish(path: string) {
  if (path.startsWith("/es/")) path = path.slice(3);
  if (path === "/" || path === "") return "/en/";
  if (path.startsWith("/proyectos/")) return path.replace("/proyectos/", "/en/work/");
  if (path === "/proyectos/" || path === "/proyectos") return "/en/work/";
  if (path === "/sobre-mi/" || path === "/sobre-mi") return "/en/about/";
  if (path === "/proceso/" || path === "/proceso") return "/en/process/";
  if (path === "/privacidad/" || path === "/privacidad") return "/en/privacy/";
  return `/en${path}`;
}
