import { HOLLAND_QUESTIONS, INTEL_QUESTIONS, VALUES_QUESTIONS, HOLLAND_META, INTEL_META, VALUES_META } from '../data/tests';

export function calcHollandScores(answers) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  HOLLAND_QUESTIONS.forEach(q => {
    scores[q.type] += (answers[q.id] || 0);
  });
  return scores;
}

export function calcIntelScores(answers) {
  const scores = {};
  INTEL_QUESTIONS.forEach(q => {
    scores[q.type] = (scores[q.type] || 0) + (answers[q.id] || 0);
  });
  return scores;
}

export function calcValueScores(answers) {
  const scores = {};
  VALUES_QUESTIONS.forEach(q => {
    scores[q.value] = (scores[q.value] || 0) + (answers[q.id] || 0);
  });
  return scores;
}

export function getTop(scores, n = 3) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

export function buildAIPrompt(hollandScores, intelScores, valueScores) {
  const topH = getTop(hollandScores, 3).map(k => HOLLAND_META[k]?.name).join(', ');
  const topI = getTop(intelScores, 3).map(k => INTEL_META[k]?.name).join(', ');
  const topV = getTop(valueScores, 3).map(k => VALUES_META[k]?.name).join(', ');

  return `Genera un análisis vocacional profundo y personalizado para esta persona.

Perfil Holland (RIASEC) dominante: ${topH}
Inteligencias múltiples dominantes: ${topI}
Valores profesionales dominantes: ${topV}

Puntajes Holland: ${JSON.stringify(hollandScores)}

Incluye en tu respuesta:
1. Párrafo de perfil vocacional integrado (quién es esta persona profesionalmente)
2. 3 carreras o campos con mayor compatibilidad total (justifica por qué combinan los tres perfiles)
3. Sus 4 fortalezas naturales más destacadas
4. Plan de acción concreto en 3 pasos para los próximos 6 meses
5. Una frase motivacional final personalizada

Sé específico, cálido y directo. Habla directamente a la persona usando "tú". No uses asteriscos para negritas. Usa emojis ocasionalmente para hacer el texto más legible.`;
}
