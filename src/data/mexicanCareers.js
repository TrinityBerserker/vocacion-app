// ─── MERCADO LABORAL MEXICANO REAL ───────────────────────────────────────────
// Datos basados en IMSS, INEGI, OCC Mundial, LinkedIn México 2024

export const MEXICAN_CAREERS = {

  // ── TECNOLOGÍA ──────────────────────────────────────────────────────────────
  "Ingeniería en Sistemas / Software": {
    holland: ["C", "I", "R"],
    salarioJunior: 12000,
    salarioSenior: 65000,
    salarioRemotoUSD: 3500,
    demanda: "MUY ALTA",
    saturacion: "BAJA",
    futuro: "EXCELENTE",
    remotoPosible: true,
    universidades: ["UNAM (gratuita)", "IPN (gratuita)", "ITESM (~$8,000/mes)", "UNITEC (~$3,500/mes)", "Bedu/Platzi (bootcamp ~$15,000 total)"],
    duracion: "4-5 años (o bootcamp 6-12 meses)",
    advertencia: null,
    oportunidad: "Alta demanda de trabajo remoto internacional. Con inglés, puedes ganar en dólares desde México.",
    riasecMatch: { R: 0.6, I: 0.9, A: 0.3, S: 0.2, E: 0.5, C: 0.8 }
  },

  "Ciberseguridad": {
    holland: ["I", "C", "R"],
    salarioJunior: 15000,
    salarioSenior: 80000,
    salarioRemotoUSD: 4500,
    demanda: "MUY ALTA",
    saturacion: "MUY BAJA",
    futuro: "EXCELENTE",
    remotoPosible: true,
    universidades: ["UNAM (gratuita)", "IPN (gratuita)", "Certificaciones: CompTIA, CEH, OSCP"],
    duracion: "3-4 años + certificaciones",
    advertencia: null,
    oportunidad: "Una de las carreras con mayor escasez de profesionales en México y LATAM.",
    riasecMatch: { R: 0.5, I: 0.95, A: 0.2, S: 0.1, E: 0.4, C: 0.9 }
  },

  "Ciencia de Datos / IA": {
    holland: ["I", "C", "E"],
    salarioJunior: 18000,
    salarioSenior: 90000,
    salarioRemotoUSD: 5000,
    demanda: "MUY ALTA",
    saturacion: "BAJA",
    futuro: "EXCELENTE",
    remotoPosible: true,
    universidades: ["UNAM (gratuita)", "ITAM (~$7,000/mes)", "Cursos: Coursera, Fast.ai, Kaggle"],
    duracion: "4-5 años o autodidacta con portafolio",
    advertencia: "Requiere bases sólidas de matemáticas y estadística.",
    oportunidad: "El campo de más crecimiento en la próxima década a nivel global.",
    riasecMatch: { R: 0.3, I: 1.0, A: 0.2, S: 0.2, E: 0.5, C: 0.9 }
  },

  // ── DISEÑO Y CREATIVIDAD ────────────────────────────────────────────────────
  "Diseño UX/UI": {
    holland: ["A", "I", "S"],
    salarioJunior: 10000,
    salarioSenior: 55000,
    salarioRemotoUSD: 3000,
    demanda: "ALTA",
    saturacion: "MEDIA",
    futuro: "BUENO",
    remotoPosible: true,
    universidades: ["UNAM (gratuita)", "UIA (~$8,500/mes)", "Bootcamps: Ironhack, Laboratoria"],
    duracion: "3-4 años o bootcamp 6 meses",
    advertencia: "Mercado más competido que hace 3 años. El portafolio vale más que el título.",
    oportunidad: "Alta demanda en startups y empresas tech. Trabajo remoto muy accesible.",
    riasecMatch: { R: 0.2, I: 0.7, A: 0.9, S: 0.6, E: 0.4, C: 0.5 }
  },

  "Diseño Gráfico": {
    holland: ["A", "E", "S"],
    salarioJunior: 7000,
    salarioSenior: 30000,
    salarioRemotoUSD: 1500,
    demanda: "MEDIA",
    saturacion: "ALTA",
    futuro: "REGULAR",
    remotoPosible: true,
    universidades: ["UNAM (gratuita)", "Iberoamericana", "CENTRO (~$9,000/mes)"],
    duracion: "4 años",
    advertencia: "⚠️ Mercado muy saturado en México. La IA está cambiando el sector rápido. Especialízate en UX/UI, motion o branding para diferenciarte.",
    oportunidad: "Con especialización en digital y dominio de herramientas de IA, hay oportunidad.",
    riasecMatch: { R: 0.2, I: 0.4, A: 1.0, S: 0.5, E: 0.6, C: 0.4 }
  },

  "Arquitectura": {
    holland: ["A", "R", "I"],
    salarioJunior: 8000,
    salarioSenior: 35000,
    salarioRemotoUSD: 2000,
    demanda: "MEDIA",
    saturacion: "ALTA",
    futuro: "REGULAR",
    remotoPosible: false,
    universidades: ["UNAM (gratuita)", "IPN (gratuita)", "ITESM", "UIA"],
    duracion: "5 años + titulación",
    advertencia: "⚠️ Carrera larga y costosa. Los primeros 5 años de ejercicio profesional son económicamente difíciles. Muchos arquitectos terminan en áreas relacionadas como interiorismo o renders 3D.",
    oportunidad: "Especialización en arquitectura sustentable o BIM tiene mejor perspectiva.",
    riasecMatch: { R: 0.7, I: 0.7, A: 0.9, S: 0.3, E: 0.4, C: 0.6 }
  },

  // ── SALUD ───────────────────────────────────────────────────────────────────
  "Medicina": {
    holland: ["I", "S", "R"],
    salarioJunior: 8000,
    salarioSenior: 60000,
    salarioRemotoUSD: null,
    demanda: "ALTA",
    saturacion: "MEDIA",
    futuro: "BUENO",
    remotoPosible: false,
    universidades: ["UNAM (gratuita, muy competida)", "IPN (gratuita)", "Universidades privadas (~$8,000-20,000/mes)"],
    duracion: "6-7 años + residencia 3-4 años = 10+ años",
    advertencia: "⚠️ La carrera más larga y demandante emocionalmente. El sector público en México está mal pagado. La especialidad es casi obligatoria para vivir bien. Piénsalo muy bien.",
    oportunidad: "Especialidades como dermatología, cirugía plástica o medicina privada tienen excelente remuneración.",
    riasecMatch: { R: 0.6, I: 0.9, A: 0.2, S: 0.8, E: 0.3, C: 0.7 }
  },

  "Psicología": {
    holland: ["S", "I", "A"],
    salarioJunior: 6000,
    salarioSenior: 30000,
    salarioRemotoUSD: 1500,
    demanda: "MEDIA",
    saturacion: "ALTA",
    futuro: "REGULAR",
    remotoPosible: true,
    universidades: ["UNAM (gratuita)", "UAM (gratuita)", "Múltiples privadas"],
    duracion: "4-5 años",
    advertencia: "⚠️ Carrera muy saturada. Sin maestría o especialización, los salarios son bajos. La psicología organizacional o clínica privada tienen mejor proyección.",
    oportunidad: "Psicología organizacional, neuropsicología y terapia en línea son los nichos con más crecimiento.",
    riasecMatch: { R: 0.1, I: 0.8, A: 0.5, S: 1.0, E: 0.4, C: 0.4 }
  },

  // ── NEGOCIOS ────────────────────────────────────────────────────────────────
  "Administración de Empresas": {
    holland: ["E", "C", "S"],
    salarioJunior: 9000,
    salarioSenior: 45000,
    salarioRemotoUSD: 2500,
    demanda: "MEDIA",
    saturacion: "MUY ALTA",
    futuro: "REGULAR",
    remotoPosible: true,
    universidades: ["UNAM (gratuita)", "IPN (gratuita)", "ITESM", "Iberoamericana"],
    duracion: "4 años",
    advertencia: "⚠️ Una de las carreras más saturadas de México. Sin diferenciación (MBA, certificaciones, inglés), es difícil destacar. Lo que importa es dónde trabajas y qué haces.",
    oportunidad: "Con enfoque en finanzas, supply chain o transformación digital hay buena demanda.",
    riasecMatch: { R: 0.2, I: 0.5, A: 0.3, S: 0.6, E: 0.9, C: 0.8 }
  },

  "Marketing Digital": {
    holland: ["E", "A", "S"],
    salarioJunior: 9000,
    salarioSenior: 45000,
    salarioRemotoUSD: 2500,
    demanda: "ALTA",
    saturacion: "MEDIA",
    futuro: "BUENO",
    remotoPosible: true,
    universidades: ["Carrera o cursos especializados", "Google, Meta, HubSpot (certificaciones gratuitas)"],
    duracion: "No requiere título formal. Portafolio + certificaciones",
    advertencia: "El campo cambia muy rápido. Lo que sabes hoy puede quedar obsoleto en 2 años.",
    oportunidad: "Una de las pocas áreas donde el talento importa más que el título. Puedes construir carrera en 1-2 años.",
    riasecMatch: { R: 0.1, I: 0.5, A: 0.7, S: 0.7, E: 0.9, C: 0.5 }
  },

  // ── EDUCACIÓN ───────────────────────────────────────────────────────────────
  "Educación / Docencia": {
    holland: ["S", "A", "E"],
    salarioJunior: 5000,
    salarioSenior: 20000,
    salarioRemotoUSD: 1200,
    demanda: "ALTA",
    saturacion: "MEDIA",
    futuro: "REGULAR",
    remotoPosible: true,
    universidades: ["Normales públicas (gratuitas)", "UPN (gratuita)", "Pedagogía UNAM"],
    duracion: "4 años",
    advertencia: "⚠️ Salarios bajos en el sector público. La educación privada y en línea pagan mejor. Si te apasiona enseñar, considera combinarla con contenido digital o edtech.",
    oportunidad: "Educación en línea, tutorías y creación de cursos digitales tienen mucho potencial.",
    riasecMatch: { R: 0.2, I: 0.5, A: 0.6, S: 1.0, E: 0.5, C: 0.5 }
  },

  // ── DERECHO ─────────────────────────────────────────────────────────────────
  "Derecho": {
    holland: ["E", "S", "C"],
    salarioJunior: 7000,
    salarioSenior: 60000,
    salarioRemotoUSD: 2000,
    demanda: "MEDIA",
    saturacion: "MUY ALTA",
    futuro: "REGULAR",
    remotoPosible: false,
    universidades: ["UNAM (gratuita, la mejor)", "IPN", "Múltiples privadas"],
    duracion: "4-5 años + cédula",
    advertencia: "⚠️ México tiene más abogados per cápita que casi cualquier país del mundo. Sin redes de contacto o especialización (corporativo, fiscal, tech law), es muy difícil.",
    oportunidad: "Derecho corporativo, compliance y tech law son los nichos con mejor futuro.",
    riasecMatch: { R: 0.1, I: 0.6, A: 0.3, S: 0.7, E: 0.9, C: 0.8 }
  },

  // ── COMUNICACIÓN ────────────────────────────────────────────────────────────
  "Comunicación / Periodismo": {
    holland: ["A", "S", "E"],
    salarioJunior: 6000,
    salarioSenior: 25000,
    salarioRemotoUSD: 1500,
    demanda: "BAJA",
    saturacion: "MUY ALTA",
    futuro: "DIFÍCIL",
    remotoPosible: true,
    universidades: ["UNAM (gratuita)", "Iberoamericana", "ITESM"],
    duracion: "4 años",
    advertencia: "⚠️ Los medios tradicionales están en crisis. El periodismo en México es peligroso en ciertas regiones. Los salarios son de los más bajos entre licenciaturas.",
    oportunidad: "Comunicación digital, creación de contenido, relaciones públicas y storytelling corporativo tienen mejor perspectiva.",
    riasecMatch: { R: 0.1, I: 0.4, A: 0.8, S: 0.7, E: 0.7, C: 0.3 }
  },
};

// ─── MAPA RIASEC → CARRERAS MÁS COMPATIBLES ──────────────────────────────────
export function getCarrerasCompatibles(hollandScores, intelScores, valueScores) {
  const sorted = Object.entries(hollandScores).sort((a, b) => b[1] - a[1]);
  const top3Types = sorted.slice(0, 3).map(([k]) => k);

  // Calcular compatibilidad para cada carrera
  const scored = Object.entries(MEXICAN_CAREERS).map(([nombre, data]) => {
    let score = 0;
    // Holland match
    top3Types.forEach((type, i) => {
      const weight = [3, 2, 1][i];
      score += (data.riasecMatch[type] || 0) * weight * hollandScores[type];
    });
    // Penalizar saturación
    const satPenalty = { "MUY ALTA": -15, "ALTA": -5, "MEDIA": 0, "BAJA": 5, "MUY BAJA": 10 };
    score += satPenalty[data.saturacion] || 0;
    // Bonus por demanda
    const demBonus = { "MUY ALTA": 10, "ALTA": 5, "MEDIA": 0, "BAJA": -10 };
    score += demBonus[data.demanda] || 0;

    return { nombre, score, data };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
}

// ─── CONTEXTO MEXICANO PARA EL PROMPT DE IA ──────────────────────────────────
export function buildMexicanContextPrompt(hollandScores, intelScores, valueScores, topCareers) {
  const sorted = Object.entries(hollandScores).sort((a, b) => b[1] - a[1]);
  const top3H = sorted.slice(0, 3).map(([k]) => k).join(', ');

  const carrerasText = topCareers.map((c, i) => {
    const d = c.data;
    return `${i + 1}. ${c.nombre}
   - Salario junior en México: $${d.salarioJunior?.toLocaleString()} MXN/mes
   - Salario senior: $${d.salarioSenior?.toLocaleString()} MXN/mes
   - Demanda laboral: ${d.demanda}
   - Saturación del mercado: ${d.saturacion}
   - Trabajo remoto: ${d.remotoPosible ? 'SÍ' : 'NO'}
   ${d.advertencia ? `- ⚠️ ADVERTENCIA HONESTA: ${d.advertencia}` : ''}
   - Oportunidad real: ${d.oportunidad}`;
  }).join('\n\n');

  return `Eres un orientador vocacional experto en el mercado laboral MEXICANO. Tu misión es ser brutalmente honesto y genuinamente útil, no solo motivacional. La persona necesita información real para tomar la decisión más importante de su vida.

PERFIL DE LA PERSONA:
- Tipos Holland dominantes: ${top3H}
- Puntajes completos: ${JSON.stringify(hollandScores)}
- Inteligencias dominantes: ${JSON.stringify(intelScores)}
- Valores profesionales: ${JSON.stringify(valueScores)}

CARRERAS MÁS COMPATIBLES CON SU PERFIL (con datos reales del mercado mexicano):
${carrerasText}

INSTRUCCIONES PARA TU ANÁLISIS:
1. Sé honesto aunque duela. Si una carrera que desean tiene mal mercado, dilo claramente.
2. Usa datos concretos de salarios, demanda y mercado mexicano.
3. Menciona opciones tanto en universidades públicas (gratuitas) como privadas.
4. Considera la realidad económica mexicana: muchas familias no pueden pagar universidades caras.
5. Habla de rutas alternativas cuando aplique (bootcamps, autodidacta, certificaciones).
6. Incluye la dimensión del trabajo remoto e internacional cuando sea relevante.
7. NO des una lista genérica de fortalezas. Sé específico a SU perfil.
8. Al final, da UN consejo concreto de acción para esta semana.

ESTRUCTURA TU RESPUESTA ASÍ:
🧭 QUIÉN ERES PROFESIONALMENTE (1 párrafo honesto y específico)

💼 TUS 3 MEJORES OPCIONES EN MÉXICO (con datos reales, ventajas Y advertencias)

💪 TUS FORTALEZAS REALES (las que tu perfil realmente muestra, no halagos genéricos)

⚠️ LO QUE DEBES SABER (verdades incómodas pero necesarias sobre tu perfil o el mercado)

🗓️ TU PRÓXIMO PASO ESTA SEMANA (1 acción concreta y específica)

Habla directamente a la persona usando "tú". No uses asteriscos. Sé cálido pero honesto.`;
}

// ─── PREGUNTAS DE SEGUIMIENTO (para versión futura) ──────────────────────────
export const FOLLOWUP_QUESTIONS = [
  { id: 1, text: "¿Has tenido la oportunidad de explorar alguna de las carreras recomendadas?", week: 4 },
  { id: 2, text: "¿Alguna actividad reciente te hizo sentir en 'flow' o completamente absorbido?", week: 4 },
  { id: 3, text: "¿Has hablado con alguien que trabaje en las áreas que te interesan?", week: 8 },
  { id: 4, text: "¿Qué obstáculos concretos ves para seguir la carrera recomendada?", week: 8 },
  { id: 5, text: "Después de reflexionar, ¿el análisis inicial sigue resonando contigo?", week: 12 },
];
