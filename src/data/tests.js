// ─── HOLLAND RIASEC ───────────────────────────────────────────────────────────

export const HOLLAND_QUESTIONS = [
  { id: 1,  text: "Me gusta trabajar con herramientas, máquinas o equipos técnicos", type: "R" },
  { id: 2,  text: "Prefiero actividades físicas y trabajos manuales", type: "R" },
  { id: 3,  text: "Disfruto construir, reparar o armar cosas con mis manos", type: "R" },
  { id: 4,  text: "Me atrae trabajar al aire libre o con naturaleza y animales", type: "R" },
  { id: 5,  text: "Me fascina resolver problemas complejos y analizar información", type: "I" },
  { id: 6,  text: "Disfruto realizar investigaciones, experimentos o estudiar fenómenos", type: "I" },
  { id: 7,  text: "Me gusta trabajar de forma independiente con ideas abstractas", type: "I" },
  { id: 8,  text: "Prefiero entender el 'por qué' de las cosas antes de actuar", type: "I" },
  { id: 9,  text: "Me expreso bien a través del arte, música, escritura o diseño", type: "A" },
  { id: 10, text: "Valoro la creatividad y la originalidad por encima de las reglas", type: "A" },
  { id: 11, text: "Disfruto ambientes de trabajo flexibles y poco estructurados", type: "A" },
  { id: 12, text: "Me siento atraído por la estética, la belleza y la cultura", type: "A" },
  { id: 13, text: "Me satisface enseñar, orientar o ayudar a otras personas", type: "S" },
  { id: 14, text: "Soy bueno para comunicarme, escuchar y entender a los demás", type: "S" },
  { id: 15, text: "Prefiero trabajar en equipo a trabajar solo", type: "S" },
  { id: 16, text: "Me importa el bienestar social y contribuir a la comunidad", type: "S" },
  { id: 17, text: "Me gusta liderar, persuadir y dirigir a otros hacia metas", type: "E" },
  { id: 18, text: "Disfruto negociar, vender ideas o competir por objetivos", type: "E" },
  { id: 19, text: "Me atraen los negocios, el emprendimiento y las decisiones importantes", type: "E" },
  { id: 20, text: "Tengo ambición de alcanzar influencia y reconocimiento", type: "E" },
  { id: 21, text: "Me siento cómodo siguiendo procedimientos claros y estructurados", type: "C" },
  { id: 22, text: "Disfruto organizar datos, archivos, registros o sistemas", type: "C" },
  { id: 23, text: "Valoro la precisión, el orden y el cumplimiento de normas", type: "C" },
  { id: 24, text: "Me gusta trabajar en entornos predecibles con roles bien definidos", type: "C" },
];

export const HOLLAND_META = {
  R: { name: "Realista",      emoji: "🔧", color: "#ef4444", desc: "Técnico, práctico, orientado a herramientas y naturaleza" },
  I: { name: "Investigativo", emoji: "🔬", color: "#3b82f6", desc: "Analítico, curioso, orientado a ciencia e investigación" },
  A: { name: "Artístico",     emoji: "🎨", color: "#a855f7", desc: "Creativo, expresivo, orientado al arte y la cultura" },
  S: { name: "Social",        emoji: "🤝", color: "#22c55e", desc: "Empático, comunicativo, orientado a ayudar personas" },
  E: { name: "Emprendedor",   emoji: "🚀", color: "#f97316", desc: "Líder, ambicioso, orientado a negocios e influencia" },
  C: { name: "Convencional",  emoji: "📋", color: "#06b6d4", desc: "Organizado, preciso, orientado a sistemas y datos" },
};

// ─── INTELIGENCIAS MÚLTIPLES ──────────────────────────────────────────────────

export const INTEL_QUESTIONS = [
  { id: 1,  text: "Aprendo mejor cuando escucho o leo en voz alta", type: "LG" },
  { id: 2,  text: "Me resulta fácil escribir o hablar con claridad y persuasión", type: "LG" },
  { id: 3,  text: "Los números y las fórmulas me resultan intuitivos", type: "LM" },
  { id: 4,  text: "Me gusta identificar patrones y establecer relaciones lógicas", type: "LM" },
  { id: 5,  text: "Pienso en imágenes; visualizo soluciones antes de ejecutarlas", type: "VS" },
  { id: 6,  text: "Tengo buen sentido de orientación y dirección espacial", type: "VS" },
  { id: 7,  text: "Soy coordinado físicamente y aprendo bien con el movimiento", type: "CK" },
  { id: 8,  text: "Hacer cosas con mis manos me parece natural y satisfactorio", type: "CK" },
  { id: 9,  text: "Identifico emociones, tonos y motivaciones en las personas fácilmente", type: "IE" },
  { id: 10, text: "Soy bueno para resolver conflictos y conectar con distintos perfiles", type: "IE" },
  { id: 11, text: "Me conozco bien: mis fortalezas, limitaciones y motivaciones", type: "IA" },
  { id: 12, text: "Necesito tiempo a solas para procesar mis pensamientos", type: "IA" },
  { id: 13, text: "Reconozco patrones en la naturaleza: plantas, animales, ecosistemas", type: "NA" },
  { id: 14, text: "Me preocupa el medio ambiente y siento conexión con lo natural", type: "NA" },
  { id: 15, text: "Tengo buen oído; aprendo canciones rápido y soy sensible al ritmo", type: "MU" },
  { id: 16, text: "La música es parte importante de mi vida o mi proceso creativo", type: "MU" },
];

export const INTEL_META = {
  LG: { name: "Lingüística",          emoji: "📝", color: "#3b82f6" },
  LM: { name: "Lógico-Matemática",    emoji: "🧮", color: "#6366f1" },
  VS: { name: "Visual-Espacial",      emoji: "🎯", color: "#a855f7" },
  CK: { name: "Corporal-Kinestésica", emoji: "⚡", color: "#f97316" },
  IE: { name: "Interpersonal",        emoji: "💬", color: "#22c55e" },
  IA: { name: "Intrapersonal",        emoji: "🧠", color: "#06b6d4" },
  NA: { name: "Naturalista",          emoji: "🌿", color: "#84cc16" },
  MU: { name: "Musical",              emoji: "🎵", color: "#ec4899" },
};

// ─── VALORES PROFESIONALES ────────────────────────────────────────────────────

export const VALUES_QUESTIONS = [
  { id: 1,  text: "El dinero y la estabilidad financiera son mi prioridad laboral", value: "economic" },
  { id: 2,  text: "Necesito sentir que mi trabajo tiene impacto real en el mundo", value: "altruism" },
  { id: 3,  text: "La autonomía e independencia son fundamentales para mí", value: "autonomy" },
  { id: 4,  text: "Busco prestigio, reconocimiento y estatus en mi carrera", value: "status" },
  { id: 5,  text: "Prefiero seguridad laboral sobre grandes riesgos o aventuras", value: "security" },
  { id: 6,  text: "Quiero equilibrio real entre trabajo y vida personal/familia", value: "balance" },
  { id: 7,  text: "Necesito sentirme desafiado intelectualmente en mi trabajo", value: "challenge" },
  { id: 8,  text: "La creatividad y la autoexpresión son esenciales en mi carrera", value: "creativity" },
  { id: 9,  text: "Me importa crecer y aprender constantemente en mi campo", value: "growth" },
  { id: 10, text: "Prefiero trabajar en equipo y construir relaciones sólidas", value: "teamwork" },
];

export const VALUES_META = {
  economic:   { name: "Económico",       emoji: "💰" },
  altruism:   { name: "Altruismo",       emoji: "💚" },
  autonomy:   { name: "Autonomía",       emoji: "🦅" },
  status:     { name: "Reconocimiento",  emoji: "🏆" },
  security:   { name: "Seguridad",       emoji: "🛡️" },
  balance:    { name: "Equilibrio",      emoji: "⚖️" },
  challenge:  { name: "Desafío",         emoji: "🧩" },
  creativity: { name: "Creatividad",     emoji: "🎨" },
  growth:     { name: "Crecimiento",     emoji: "📈" },
  teamwork:   { name: "Trabajo en Equipo", emoji: "🤝" },
};

// ─── PLANES DE PAGO ───────────────────────────────────────────────────────────

export const PLANS = [
  {
    id: "basic",
    name: "Orientación Básica",
    price: 29,
    usd: "~$1.50 USD",
    color: "#6366f1",
    highlight: false,
    features: [
      "✓  Análisis Holland completo",
      "✓  Top 5 carreras compatibles",
      "✓  Análisis IA personalizado",
      "✓  Reporte en PDF",
    ],
    cta: "Comprar por $29 MXN",
  },
  {
    id: "full",
    name: "Vocación Total",
    price: 79,
    usd: "~$4 USD",
    color: "#F59E0B",
    highlight: true,
    badge: "MÁS POPULAR",
    features: [
      "✓  Todo lo de Básica",
      "✓  Test Inteligencias Múltiples",
      "✓  Test de Valores Profesionales",
      "✓  Plan de carrera 12 meses",
      "✓  Roadmap de estudios",
      "✓  Chat IA orientador (30 min)",
    ],
    cta: "🔥 Comprar por $79 MXN",
  },
  {
    id: "group",
    name: "Colegios / Grupos",
    price: 299,
    usd: "~$15 USD",
    color: "#10b981",
    highlight: false,
    features: [
      "✓  Hasta 20 estudiantes",
      "✓  Dashboard grupal de resultados",
      "✓  Reporte comparativo",
      "✓  Orientación por intereses comunes",
      "✓  Soporte por WhatsApp",
    ],
    cta: "Comprar por $299 MXN",
  },
];
