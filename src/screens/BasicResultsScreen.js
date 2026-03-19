import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GoldButton, GhostButton, Card, SectionTitle, HollandBar, Badge } from '../components/UI';
import { COLORS, RADIUS, SHADOW } from '../utils/theme';
import { PAYMENTS_ENABLED } from '../config';
import { HOLLAND_META } from '../data/tests';
import { getTop } from '../utils/scores';

const CAREER_MAP = {
  RIE: ["Ingeniería mecatrónica", "Robótica industrial", "Manufactura avanzada"],
  RIA: ["Arquitectura", "Diseño industrial", "Restauración de arte"],
  IAS: ["Psicología clínica", "Neurociencias", "Medicina"],
  ISA: ["Investigación social", "Antropología", "Ciencias de la educación"],
  AES: ["Marketing creativo", "Publicidad", "Diseño UX/UI"],
  ASI: ["Diseño gráfico", "Arquitectura de interiores", "Animación 3D"],
  ESA: ["Relaciones públicas", "Gestión cultural", "Recursos humanos"],
  ESC: ["Administración de empresas", "Derecho corporativo", "Finanzas"],
  CSE: ["Contabilidad pública", "Auditoría", "Gestión de proyectos"],
  CIR: ["Sistemas computacionales", "Análisis de datos", "Ciberseguridad"],
  SIA: ["Educación especial", "Fonoaudiología", "Terapia ocupacional"],
  REC: ["Electricidad industrial", "Topografía", "Logística y cadena de suministro"],
};

function getCareers(top3) {
  for (const key of Object.keys(CAREER_MAP)) {
    if (top3.every(t => key.includes(t))) return CAREER_MAP[key];
  }
  // fallback: find partial match
  for (const key of Object.keys(CAREER_MAP)) {
    if (top3.slice(0, 2).every(t => key.includes(t))) return CAREER_MAP[key];
  }
  return CAREER_MAP.ESC;
}

export default function BasicResultsScreen({ navigation, route }) {
  const { hollandScores } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const sorted = Object.entries(hollandScores).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3).map(([k]) => k);
  const maxScore = sorted[0][1];
  const careers = getCareers(top3);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim }}>

            {/* Hero */}
            <View style={styles.hero}>
              <Badge label="TUS RESULTADOS" color={COLORS.gold} />
              <Text style={styles.title}>
                Código Holland:{' '}
                <Text style={{ color: COLORS.gold }}>{top3.join('‑')}</Text>
              </Text>
              <Text style={styles.subtitle}>
                Perfil vocacional basado en 24 indicadores científicos
              </Text>
            </View>

            {/* Bars */}
            <Card style={{ marginBottom: 20 }}>
              <SectionTitle emoji="📊" title="Tu perfil RIASEC" />
              {sorted.map(([type, score]) => (
                <HollandBar
                  key={type}
                  type={type}
                  score={score}
                  max={maxScore}
                  meta={HOLLAND_META[type]}
                />
              ))}
            </Card>

            {/* Top 3 */}
            <Card style={{ marginBottom: 20 }}>
              <SectionTitle emoji="🏅" title="Tus tipos dominantes" />
              {top3.map((type, i) => {
                const meta = HOLLAND_META[type];
                const medals = ['🥇', '🥈', '🥉'];
                return (
                  <View key={type} style={[
                    styles.typeRow,
                    i === 0 && { backgroundColor: 'rgba(245,158,11,0.08)', borderColor: COLORS.goldBorder },
                  ]}>
                    <Text style={styles.typeEmoji}>{meta.emoji}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.typeName}>{medals[i]} {meta.name}</Text>
                      <Text style={styles.typeDesc}>{meta.desc}</Text>
                    </View>
                    <Text style={[styles.typeScore, { color: meta.color }]}>{hollandScores[type]}pts</Text>
                  </View>
                );
              })}
            </Card>

            {/* Careers preview */}
            <Card style={{ marginBottom: 24 }}>
              <SectionTitle emoji="💼" title="Carreras compatibles" />
              {careers.map((c, i) => (
                <View key={c} style={styles.careerRow}>
                  <View style={[styles.careerDot, { backgroundColor: COLORS.gold }]} />
                  <Text style={styles.careerText}>{c}</Text>
                </View>
              ))}
            </Card>

{/* Paywall / Beta */}
            <LinearGradient
              colors={['rgba(245,158,11,0.12)', 'rgba(99,102,241,0.08)']}
              style={styles.paywall}
            >
              {PAYMENTS_ENABLED ? (
                <>
                  <Text style={styles.paywallIcon}>🎯</Text>
                  <Text style={styles.paywallTitle}>Análisis completo de tu vocación</Text>
                  <Text style={styles.paywallDesc}>
                    Test de Inteligencias Múltiples · Test de Valores Profesionales ·
                    Carreras con salarios reales · Análisis IA honesto
                  </Text>
                  <GoldButton
                    title="✨  Obtener mi análisis — $25 MXN"
                    onPress={() => navigation.navigate('Payment', { hollandScores, plan: { id: 'complete', name: 'Análisis Completo', price: 25 } })}
                    style={{ marginTop: 4 }}
                  />
                  <Text style={styles.paywallNote}>Pago único · Sin suscripciones · ~$1.25 USD</Text>
                </>
              ) : (
                <>
                  <Text style={styles.paywallIcon}>🚧</Text>
                  <Text style={styles.paywallTitle}>Modo Beta — Acceso libre</Text>
                  <Text style={styles.paywallDesc}>
                    Estamos en fase de pruebas. Accede al análisis completo gratis por tiempo limitado.
                  </Text>
                  <GoldButton
                    title="🚀  Continuar al análisis completo"
                    onPress={() => navigation.navigate('PremiumAnalysis', { hollandScores })}
                    style={{ marginTop: 4 }}
                  />
                  <Text style={styles.paywallNote}>🔓 Beta gratuita · Próximamente $25 MXN</Text>
                </>
              )}
            </LinearGradient>

          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 48, paddingTop: 20 },
  hero: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text, textAlign: 'center', marginVertical: 8 },
  subtitle: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center' },
  typeRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: RADIUS.md, padding: 14, marginBottom: 8,
  },
  typeEmoji: { fontSize: 24 },
  typeName: { color: COLORS.text, fontSize: 15, fontWeight: '700', marginBottom: 2 },
  typeDesc: { color: COLORS.textMuted, fontSize: 12 },
  typeScore: { fontSize: 18, fontWeight: '800' },
  careerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  careerDot: { width: 6, height: 6, borderRadius: 99 },
  careerText: { color: COLORS.textMuted, fontSize: 14 },
  paywall: {
    borderRadius: RADIUS.xl, padding: 26,
    borderWidth: 1, borderColor: COLORS.goldBorder,
    alignItems: 'center',
  },
  paywallIcon: { fontSize: 36, marginBottom: 10 },
  paywallTitle: {
    fontSize: 20, fontWeight: '800', color: COLORS.text, textAlign: 'center', marginBottom: 10,
  },
  paywallDesc: {
    fontSize: 13, color: COLORS.textMuted, textAlign: 'center', lineHeight: 20, marginBottom: 18,
  },
  paywallNote: { fontSize: 12, color: COLORS.textFaint, marginTop: 10 },
});
