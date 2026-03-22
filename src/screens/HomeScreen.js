import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Animated, Dimensions, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoldButton, GhostButton } from '../components/UI';
import { COLORS, RADIUS, SHADOW } from '../utils/theme';
import { cargarResultados } from '../utils/storage';

const { width, height } = Dimensions.get('window');

const FEATURES = [
  { icon: '🆓', label: 'Test básico gratis' },
  { icon: '⚡', label: '~10 minutos' },
  { icon: '🔬', label: 'Basado en evidencia' },
  { icon: '🗺️', label: 'Plan de carrera' },
  { icon: '🤖', label: 'Análisis con IA' },
  { icon: '📄', label: 'Reporte PDF' },
];

const METHODS = [
  { emoji: '🧭', name: 'Holland RIASEC', desc: '6 tipos de personalidad vocacional' },
  { emoji: '🧠', name: 'Inteligencias Múltiples', desc: 'Gardner · 8 tipos de inteligencia' },
  { emoji: '💚', name: 'Valores Profesionales', desc: 'Qué motiva realmente tu carrera' },
];

export default function HomeScreen({ navigation }) {

  const [resultadoPrevio, setResultadoPrevio] = React.useState(null);

useEffect(() => {
  cargarResultados().then(data => {
    if (data) setResultadoPrevio(data);
  });
}, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Ambient glow */}
      <View style={styles.glow} pointerEvents="none" />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

            {/* Hero */}
            <View style={styles.hero}>
              <Text style={styles.heroEmoji}>🧭</Text>
              <Text style={styles.heroTitle}>Descubre tu{'\n'}<Text style={{ color: COLORS.gold }}>vocación real</Text></Text>
              <Text style={styles.heroSub}>
                Orientación vocacional científica basada en los métodos más efectivos del mundo.
                Conoce quién eres profesionalmente y traza tu camino.
              </Text>
            </View>

            {/* CTA Buttons */}
            <GoldButton
              title="🎯  Empezar gratis — Test Holland"
              onPress={() => navigation.navigate('TestHolland')}
              style={{ marginBottom: 12 }}
            />

            {resultadoPrevio && (
  <TouchableOpacity
    onPress={() => navigation.navigate('BasicResults', { hollandScores: resultadoPrevio.hollandScores })}
    style={styles.previoBtn}
  >
    <Text style={styles.previoText}>📊 Ver tu análisis anterior</Text>
    <Text style={styles.previoFecha}>
      {new Date(resultadoPrevio.fecha).toLocaleDateString('es-MX')}
    </Text>
  </TouchableOpacity>
)}


            <GhostButton
              title="✨  Ver planes Premium"
              onPress={() => navigation.navigate('Plans')}
              style={{ marginBottom: 32 }}
            />

            {/* Feature chips */}
            <View style={styles.chips}>
              {FEATURES.map(f => (
                <View key={f.label} style={styles.chip}>
                  <Text style={styles.chipIcon}>{f.icon}</Text>
                  <Text style={styles.chipLabel}>{f.label}</Text>
                </View>
              ))}
            </View>

            {/* Methods */}
            <Text style={styles.sectionLabel}>METODOLOGÍAS</Text>
            {METHODS.map(m => (
              <View key={m.name} style={styles.methodCard}>
                <Text style={styles.methodEmoji}>{m.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.methodName}>{m.name}</Text>
                  <Text style={styles.methodDesc}>{m.desc}</Text>
                </View>
              </View>
            ))}

            {/* Social proof */}
            <LinearGradient
              colors={['rgba(245,158,11,0.08)', 'rgba(245,158,11,0.03)']}
              style={styles.proofCard}
            >
              <Text style={styles.proofText}>
                "El test Holland RIASEC es el instrumento de orientación vocacional más validado científicamente,
                con más de 60 años de investigación." — Journal of Vocational Behavior
              </Text>
            </LinearGradient>

          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 22, paddingBottom: 48 },
  glow: {
    position: 'absolute', top: 0, left: '10%',
    width: width * 0.8, height: 280,
    backgroundColor: 'rgba(245,158,11,0.06)',
    borderRadius: 999,
    transform: [{ scaleX: 1.5 }],
  },
  hero: { alignItems: 'center', paddingTop: 48, paddingBottom: 36 },
  heroEmoji: { fontSize: 64, marginBottom: 16 },
  heroTitle: {
    fontSize: 38, fontWeight: '800', color: COLORS.text,
    textAlign: 'center', lineHeight: 46, marginBottom: 16,
  },
  heroSub: {
    fontSize: 16, color: COLORS.textMuted, textAlign: 'center',
    lineHeight: 24, paddingHorizontal: 8,
  },
  chips: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32, justifyContent: 'center',
  },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)',
    borderRadius: 99, paddingHorizontal: 12, paddingVertical: 7,
  },
  chipIcon: { fontSize: 14 },
  chipLabel: { fontSize: 13, color: COLORS.textMuted },
  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: COLORS.textFaint,
    letterSpacing: 2, marginBottom: 12,
  },
  methodCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: RADIUS.md, padding: 16, marginBottom: 10,
  },
  methodEmoji: { fontSize: 28 },
  methodName: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  methodDesc: { fontSize: 13, color: COLORS.textMuted },
  proofCard: {
    borderRadius: RADIUS.md, padding: 18, marginTop: 8,
    borderWidth: 1, borderColor: COLORS.goldBorder,
  },
  proofText: { fontSize: 13, color: COLORS.textMuted, fontStyle: 'italic', lineHeight: 20 },

previoBtn: {
  backgroundColor: 'rgba(245,158,11,0.12)',
  borderWidth: 1.5,
  borderColor: COLORS.gold,
  borderRadius: RADIUS.md,
  padding: 16,
  alignItems: 'center',
  marginBottom: 12,
  width: '100%',
},
previoText: {
  fontSize: 16,
  fontWeight: '700',
  color: COLORS.gold,
  marginBottom: 4,
},
previoFecha: {
  fontSize: 13,
  color: COLORS.textMuted,
},

});
