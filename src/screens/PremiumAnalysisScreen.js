import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator,
  TouchableOpacity, StatusBar, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, SectionTitle, HollandBar, GoldButton, ProgressBar, ScaleButtons } from '../components/UI';
import { ANTHROPIC_API_KEY } from '../config';
import { COLORS, RADIUS } from '../utils/theme';
import { HOLLAND_META, INTEL_META, INTEL_QUESTIONS, VALUES_QUESTIONS } from '../data/tests';
import { calcIntelScores, calcValueScores, getTop } from '../utils/scores';
import { getCarrerasCompatibles, buildMexicanContextPrompt } from '../data/mexicanCareers';
import Markdown from 'react-native-markdown-display';

const DEMAND_COLOR = { "MUY ALTA": "#22c55e", "ALTA": "#84cc16", "MEDIA": "#F59E0B", "BAJA": "#f97316", "DIFÍCIL": "#ef4444" };
const SAT_COLOR = { "MUY BAJA": "#22c55e", "BAJA": "#84cc16", "MEDIA": "#F59E0B", "ALTA": "#f97316", "MUY ALTA": "#ef4444" };

export default function PremiumAnalysisScreen({ navigation, route }) {
  const { hollandScores } = route.params;
  const [stage, setStage] = useState('intel');
  const [intelAnswers, setIntelAnswers] = useState({});
  const [valuesAnswers, setValuesAnswers] = useState({});
  const [intelIdx, setIntelIdx] = useState(0);
  const [valIdx, setValIdx] = useState(0);
  const [aiText, setAiText] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [topCareers, setTopCareers] = useState([]);
  const cardAnim = useRef(new Animated.Value(1)).current;

  const animCard = (cb) => {
    Animated.sequence([
      Animated.timing(cardAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(cardAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
    ]).start(cb);
  };

  const handleIntel = (val) => {
    const q = INTEL_QUESTIONS[intelIdx];
    const newA = { ...intelAnswers, [q.id]: val };
    setIntelAnswers(newA);
    animCard(() => {
      if (intelIdx < INTEL_QUESTIONS.length - 1) setIntelIdx(i => i + 1);
      else setStage('values');
    });
  };

  const handleValues = (val) => {
    const q = VALUES_QUESTIONS[Math.min(valIdx, VALUES_QUESTIONS.length-1)];
    const newA = { ...valuesAnswers, [q.id]: val };
    setValuesAnswers(newA);
    animCard(() => {
      if (valIdx < VALUES_QUESTIONS.length - 1) setValIdx(i => i + 1);
      else generateAI(newA);
    });
  };

  const generateAI = async (vAnswers) => {
    setStage('analysis');
    setLoadingAI(true);
    const intelScores = calcIntelScores(intelAnswers);
    const valueScores = calcValueScores(vAnswers);
    const careers = getCarrerasCompatibles(hollandScores, intelScores, valueScores);
    setTopCareers(careers);
    const prompt = buildMexicanContextPrompt(hollandScores, intelScores, valueScores, careers);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1200,
          system: 'Eres un orientador vocacional experto en el mercado laboral mexicano. Eres honesto, empático y directo. Das información real y útil, no solo motivacional. Usas datos concretos. Usa formato Markdown limpio: **negrita** para títulos de sección, párrafos separados. Sin HTML.',
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === 'text')?.text || 'No se pudo generar el análisis.';
      setAiText(text);
    } catch (e) {
      setAiText('No se pudo conectar. Verifica tu internet e intenta de nuevo.');
    }
    setLoadingAI(false);
  };

  if (stage === 'intel') {
    if (intelIdx >= INTEL_QUESTIONS.length) return null;
    const q = INTEL_QUESTIONS[intelIdx];
    return <QuestionStage
      label="✨ Inteligencias Múltiples · Gardner"
      accentColor="#a78bfa"
      current={intelIdx} total={INTEL_QUESTIONS.length}
      question={q.text} selected={intelAnswers[q.id]}
      onAnswer={handleIntel}
      onBack={() => intelIdx > 0 ? setIntelIdx(i => i - 1) : navigation.goBack()}
      cardAnim={cardAnim}
      hint="Teoría de Howard Gardner — identifica tus 8 tipos de inteligencia naturales."
    />;
  }

  if (stage === 'values') {
    if (valIdx >= VALUES_QUESTIONS.length) return null;
    const q = VALUES_QUESTIONS[valIdx];
    return <QuestionStage
      label="💚 Valores Profesionales"
      accentColor="#34d399"
      current={valIdx} total={VALUES_QUESTIONS.length}
      question={q.text} selected={valuesAnswers[q.id]}
      onAnswer={handleValues}
      onBack={() => valIdx > 0 ? setValIdx(i => i - 1) : setStage('intel')}
      cardAnim={cardAnim}
      hint="Honestidad total. Lo que realmente valoras en tu vida profesional, no lo que crees que debes valorar."
    />;
  }

  const intelScores = calcIntelScores(intelAnswers);
  const topIntel = getTop(intelScores, 3);
  const sortedHolland = Object.entries(hollandScores).sort((a, b) => b[1] - a[1]);
  const maxH = sortedHolland[0][1];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <View style={styles.hero}>
            <Text style={styles.heroEmoji}>🎯</Text>
            <Text style={styles.heroTitle}>Tu orientación vocacional completa</Text>
            <Text style={styles.heroSub}>Análisis honesto con datos reales del mercado mexicano</Text>
          </View>

          {/* Holland */}
          <Card>
            <SectionTitle emoji="🧭" title="Perfil Holland RIASEC" color={COLORS.gold} />
            {sortedHolland.map(([type, score]) => (
              <HollandBar key={type} type={type} score={score} max={maxH} meta={HOLLAND_META[type]} />
            ))}
          </Card>

          {/* Inteligencias */}
          <Card style={{ borderColor: 'rgba(167,139,250,0.2)' }}>
            <SectionTitle emoji="🧠" title="Inteligencias dominantes" color="#a78bfa" />
            {topIntel.map(type => {
              const meta = INTEL_META[type];
              return (
                <View key={type} style={styles.intelRow}>
                  <Text style={styles.intelEmoji}>{meta.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.intelName}>{meta.name}</Text>
                    <View style={styles.intelTrack}>
                      <View style={[styles.intelFill, { width: `${Math.min(intelScores[type] / 10 * 100, 100)}%`, backgroundColor: meta.color }]} />
                    </View>
                  </View>
                </View>
              );
            })}
          </Card>

          {/* Carreras con datos reales */}
          <Card style={{ borderColor: 'rgba(245,158,11,0.2)' }}>
            <SectionTitle emoji="💼" title="Carreras compatibles — Mercado mexicano real" color={COLORS.gold} />
            <Text style={styles.disclaimer}>Datos: IMSS, INEGI, OCC Mundial 2024. Incluye advertencias honestas.</Text>
            {topCareers.slice(0, 3).map((career, i) => (
              <CareerCard key={career.nombre} career={career} rank={i} />
            ))}
          </Card>

          {/* AI Analysis */}
          <LinearGradient colors={['rgba(245,158,11,0.08)', 'rgba(99,102,241,0.06)']} style={styles.aiCard}>
            <SectionTitle emoji="🤖" title="Orientador IA — Análisis personalizado" color={COLORS.gold} />
            <Text style={styles.disclaimer}>Análisis honesto. No solo lo que quieres escuchar.</Text>
            {loadingAI ? (
              <View style={styles.aiLoading}>
                <ActivityIndicator color={COLORS.gold} size="large" />
                <Text style={styles.aiLoadingText}>Cruzando tu perfil con el mercado mexicano real...</Text>
              </View>
            ) : (
              <Markdown style={markdownStyles}>{aiText}</Markdown>
            )}
          </LinearGradient>

          {/* Seguimiento */}
          <View style={styles.followupCard}>
            <Text style={styles.followupEmoji}>📅</Text>
            <Text style={styles.followupTitle}>Tu orientación no termina aquí</Text>
            <Text style={styles.followupDesc}>
              La vocación se confirma con experiencia. En 4 semanas te preguntaremos cómo vas y ajustaremos tu plan si es necesario.
            </Text>
          </View>

          <GoldButton title="📥  Guardar / Compartir mi análisis" onPress={() => {}} />
          <TouchableOpacity onPress={() => navigation.popToTop()} style={{ marginTop: 12 }}>
            <Text style={styles.homeLink}>← Volver al inicio</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function CareerCard({ career, rank }) {
  const [expanded, setExpanded] = useState(rank === 0);
  const { nombre, data } = career;
  const medals = ['🥇', '🥈', '🥉'];
  return (
    <TouchableOpacity onPress={() => setExpanded(e => !e)} activeOpacity={0.8}
      style={[styles.careerCard, rank === 0 && { borderColor: 'rgba(245,158,11,0.3)' }]}>
      <View style={styles.careerHeader}>
        <Text style={styles.careerMedal}>{medals[rank]}</Text>
        <Text style={styles.careerName}>{nombre}</Text>
        <Text style={styles.careerArrow}>{expanded ? '▲' : '▼'}</Text>
      </View>
      <View style={styles.careerTags}>
        <View style={[styles.tag, { backgroundColor: DEMAND_COLOR[data.demanda] + '22', borderColor: DEMAND_COLOR[data.demanda] + '55' }]}>
          <Text style={[styles.tagText, { color: DEMAND_COLOR[data.demanda] }]}>📈 {data.demanda}</Text>
        </View>
        <View style={[styles.tag, { backgroundColor: SAT_COLOR[data.saturacion] + '22', borderColor: SAT_COLOR[data.saturacion] + '55' }]}>
          <Text style={[styles.tagText, { color: SAT_COLOR[data.saturacion] }]}>👥 Sat. {data.saturacion}</Text>
        </View>
        {data.remotoPosible && (
          <View style={[styles.tag, { backgroundColor: 'rgba(99,102,241,0.15)', borderColor: 'rgba(99,102,241,0.3)' }]}>
            <Text style={[styles.tagText, { color: '#818cf8' }]}>🌐 Remoto</Text>
          </View>
        )}
      </View>
      {expanded && (
        <View style={styles.careerDetails}>
          <View style={styles.salaryRow}>
            <View style={styles.salaryBox}>
              <Text style={styles.salaryLabel}>Junior</Text>
              <Text style={styles.salaryAmt}>${data.salarioJunior?.toLocaleString()}</Text>
              <Text style={styles.salaryUnit}>MXN/mes</Text>
            </View>
            <View style={styles.salaryBox}>
              <Text style={styles.salaryLabel}>Senior</Text>
              <Text style={styles.salaryAmt}>${data.salarioSenior?.toLocaleString()}</Text>
              <Text style={styles.salaryUnit}>MXN/mes</Text>
            </View>
            {data.salarioRemotoUSD && (
              <View style={[styles.salaryBox, { borderColor: 'rgba(99,102,241,0.3)' }]}>
                <Text style={styles.salaryLabel}>🌐 Remoto</Text>
                <Text style={[styles.salaryAmt, { color: '#818cf8' }]}>${data.salarioRemotoUSD?.toLocaleString()}</Text>
                <Text style={styles.salaryUnit}>USD/mes</Text>
              </View>
            )}
          </View>
          <Text style={styles.detailLabel}>⏱️ Duración</Text>
          <Text style={styles.detailText}>{data.duracion}</Text>
          <Text style={styles.detailLabel}>🏫 Dónde estudiar</Text>
          {data.universidades.map(u => <Text key={u} style={styles.uniItem}>• {u}</Text>)}
          {data.advertencia && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>{data.advertencia}</Text>
            </View>
          )}
          <View style={styles.opportunityBox}>
            <Text style={styles.opportunityText}>✅ {data.oportunidad}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

function QuestionStage({ label, accentColor, current, total, question, selected, onAnswer, onBack, cardAnim, hint }) {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.qHeader}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, paddingHorizontal: 12 }}>
            <Text style={[styles.qLabel, { color: accentColor }]}>{label}</Text>
            <ProgressBar current={current} total={total} color={accentColor} />
          </View>
          <Text style={styles.qCounter}>{current + 1}/{total}</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 48, paddingTop: 8 }}>
          {hint && <Text style={styles.qHintTop}>{hint}</Text>}
          <Animated.View style={[styles.qCard, { borderColor: accentColor + '22' }, {
            opacity: cardAnim,
            transform: [{ translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }],
          }]}>
            <Text style={styles.qText}>{question}</Text>
            <Text style={styles.qHint}>¿Qué tanto te identifica esto?</Text>
            <View style={styles.scaleLabels}>
              <Text style={styles.scaleLabelText}>Nada</Text>
              <Text style={styles.scaleLabelText}>Mucho</Text>
            </View>
            <ScaleButtons selected={selected} onChange={onAnswer} />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const markdownStyles = {
  body: { color: '#cbd5e1', fontSize: 15, lineHeight: 26 },
  paragraph: { color: '#cbd5e1', fontSize: 15, lineHeight: 26, marginBottom: 10 },
  strong: { color: COLORS.gold, fontWeight: '700' },
  heading1: { color: COLORS.text, fontSize: 17, fontWeight: '800', marginTop: 16, marginBottom: 6 },
  heading2: { color: COLORS.text, fontSize: 15, fontWeight: '700', marginTop: 14, marginBottom: 4 },
  bullet_list_icon: { color: COLORS.gold, marginTop: 6 },
  ordered_list_icon: { color: COLORS.gold },
};

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 18, paddingBottom: 48, paddingTop: 12 },
  hero: { alignItems: 'center', marginBottom: 24, paddingTop: 8 },
  heroEmoji: { fontSize: 48, marginBottom: 10 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text, textAlign: 'center', marginBottom: 6 },
  heroSub: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center' },
  disclaimer: { fontSize: 12, color: COLORS.textFaint, marginBottom: 14, fontStyle: 'italic' },
  careerCard: {
    backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)', borderRadius: RADIUS.md,
    padding: 14, marginBottom: 10,
  },
  careerHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  careerMedal: { fontSize: 18 },
  careerName: { flex: 1, fontSize: 15, fontWeight: '700', color: COLORS.text },
  careerArrow: { fontSize: 12, color: COLORS.textFaint },
  careerTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 4 },
  tag: { borderWidth: 1, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 11, fontWeight: '600' },
  careerDetails: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)' },
  salaryRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  salaryBox: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)', borderRadius: RADIUS.sm,
    padding: 10, alignItems: 'center',
  },
  salaryLabel: { fontSize: 11, color: COLORS.textFaint, marginBottom: 2 },
  salaryAmt: { fontSize: 16, fontWeight: '800', color: COLORS.gold },
  salaryUnit: { fontSize: 10, color: COLORS.textFaint },
  detailLabel: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted, marginBottom: 4, marginTop: 10 },
  detailText: { fontSize: 13, color: COLORS.text, lineHeight: 18 },
  uniItem: { fontSize: 13, color: COLORS.textMuted, lineHeight: 20 },
  warningBox: {
    backgroundColor: 'rgba(239,68,68,0.08)', borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)', borderRadius: RADIUS.sm, padding: 12, marginTop: 10,
  },
  warningText: { fontSize: 13, color: '#fca5a5', lineHeight: 18 },
  opportunityBox: {
    backgroundColor: 'rgba(34,197,94,0.08)', borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.2)', borderRadius: RADIUS.sm, padding: 12, marginTop: 8,
  },
  opportunityText: { fontSize: 13, color: '#86efac', lineHeight: 18 },
  intelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  intelEmoji: { fontSize: 20 },
  intelName: { fontSize: 13, color: COLORS.text, fontWeight: '600', marginBottom: 4 },
  intelTrack: { height: 5, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' },
  intelFill: { height: '100%', borderRadius: 99 },
  aiCard: { borderRadius: RADIUS.xl, padding: 22, borderWidth: 1, borderColor: COLORS.goldBorder, marginBottom: 14 },
  aiLoading: { alignItems: 'center', paddingVertical: 32, gap: 12 },
  aiLoadingText: { fontSize: 14, color: COLORS.text, textAlign: 'center' },
  aiText: { fontSize: 15, color: '#cbd5e1', lineHeight: 26 },
  followupCard: {
    backgroundColor: 'rgba(99,102,241,0.08)', borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.2)', borderRadius: RADIUS.lg,
    padding: 20, alignItems: 'center', marginBottom: 16,
  },
  followupEmoji: { fontSize: 32, marginBottom: 8 },
  followupTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 6, textAlign: 'center' },
  followupDesc: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center', lineHeight: 19 },
  homeLink: { textAlign: 'center', fontSize: 14, color: COLORS.textFaint, paddingVertical: 8 },
  qHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)' },
  backText: { color: COLORS.textMuted, fontSize: 20 },
  qLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  qCounter: { fontSize: 13, color: COLORS.textFaint, fontWeight: '600' },
  qHintTop: { fontSize: 13, color: COLORS.textFaint, marginBottom: 12, fontStyle: 'italic', lineHeight: 18 },
  qCard: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderRadius: RADIUS.xl, padding: 28, marginBottom: 20 },
  qText: { fontSize: 22, color: COLORS.text, fontWeight: '700', lineHeight: 32, marginBottom: 10 },
  qHint: { fontSize: 13, color: COLORS.textFaint, marginBottom: 4 },
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  scaleLabelText: { fontSize: 12, color: COLORS.textFaint },
});
