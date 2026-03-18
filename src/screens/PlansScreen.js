import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS } from '../utils/theme';
import { PLANS } from '../data/tests';

export default function PlansScreen({ navigation, route }) {
  const { hollandScores } = route.params || {};

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Elige tu plan</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <Text style={styles.subtitle}>
            Micropagos accesibles. Un pago único = acceso de por vida a tu análisis.
          </Text>

          {PLANS.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onPress={() => navigation.navigate('Payment', { plan, hollandScores })}
            />
          ))}

          {/* Trust badges */}
          <View style={styles.trustRow}>
            {['🔒 Pago seguro SSL', '🏦 OXXO · Tarjeta · SPEI', '✅ Garantía de satisfacción'].map(t => (
              <View key={t} style={styles.trustBadge}>
                <Text style={styles.trustText}>{t}</Text>
              </View>
            ))}
          </View>

          {/* FAQ mini */}
          <View style={styles.faq}>
            <Text style={styles.faqTitle}>Preguntas frecuentes</Text>
            {[
              { q: '¿Es una suscripción?', a: 'No. Pagas una sola vez y accedes de por vida a tu análisis.' },
              { q: '¿Cómo recibo mis resultados?', a: 'Inmediatamente al completar el pago, directamente en la app y por email.' },
              { q: '¿Tienen garantía?', a: 'Sí. Si no estás satisfecho en 7 días, te reembolsamos.' },
            ].map(({ q, a }) => (
              <View key={q} style={styles.faqItem}>
                <Text style={styles.faqQ}>{q}</Text>
                <Text style={styles.faqA}>{a}</Text>
              </View>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function PlanCard({ plan, onPress }) {
  const content = (
    <TouchableOpacity onPress={onPress} activeOpacity={0.88} style={[
      styles.planCard,
      plan.highlight && { borderColor: plan.color + '60' },
    ]}>
      {plan.badge && (
        <View style={[styles.planBadge, { backgroundColor: plan.color }]}>
          <Text style={styles.planBadgeText}>{plan.badge}</Text>
        </View>
      )}

      <View style={styles.planTop}>
        <View>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planUSD}>{plan.usd}</Text>
        </View>
        <View style={styles.planPriceBox}>
          <Text style={[styles.planPrice, { color: plan.color }]}>${plan.price}</Text>
          <Text style={styles.planCurrency}>MXN único</Text>
        </View>
      </View>

      <View style={styles.planDivider} />

      <View style={styles.planFeatures}>
        {plan.features.map(f => (
          <Text key={f} style={[styles.planFeature, { color: plan.highlight ? COLORS.text : COLORS.textMuted }]}>
            {f}
          </Text>
        ))}
      </View>

      {plan.highlight ? (
        <LinearGradient
          colors={['#F59E0B', '#D97706']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={styles.planCTA}
        >
          <Text style={styles.planCTATextDark}>{plan.cta}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.planCTAGhost, { borderColor: plan.color + '55' }]}>
          <Text style={[styles.planCTAText, { color: plan.color }]}>{plan.cta}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (plan.highlight) {
    return (
      <LinearGradient
        colors={['rgba(245,158,11,0.10)', 'rgba(99,102,241,0.06)']}
        style={[styles.planCard, { borderColor: plan.color + '50', padding: 0 }]}
      >
        <View style={{ padding: 20 }}>
          {plan.badge && (
            <View style={[styles.planBadge, { backgroundColor: plan.color, alignSelf: 'flex-start', marginBottom: 12 }]}>
              <Text style={styles.planBadgeText}>{plan.badge}</Text>
            </View>
          )}
          <View style={styles.planTop}>
            <View>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planUSD}>{plan.usd}</Text>
            </View>
            <View style={styles.planPriceBox}>
              <Text style={[styles.planPrice, { color: plan.color }]}>${plan.price}</Text>
              <Text style={styles.planCurrency}>MXN único</Text>
            </View>
          </View>
          <View style={styles.planDivider} />
          <View style={styles.planFeatures}>
            {plan.features.map(f => (
              <Text key={f} style={[styles.planFeature, { color: COLORS.text }]}>{f}</Text>
            ))}
          </View>
          <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
            <LinearGradient colors={['#F59E0B', '#D97706']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.planCTA}>
              <Text style={styles.planCTATextDark}>{plan.cta}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
    borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)',
  },
  backText: { color: COLORS.textMuted, fontSize: 20 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  scroll: { paddingHorizontal: 18, paddingBottom: 48, paddingTop: 4 },
  subtitle: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  planCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.09)',
    borderRadius: RADIUS.xl, padding: 20, marginBottom: 14,
  },
  planBadge: {
    borderRadius: 99, paddingHorizontal: 12, paddingVertical: 4,
    alignSelf: 'flex-start', marginBottom: 12,
  },
  planBadgeText: { color: '#1a0f00', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  planTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  planName: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 2 },
  planUSD: { fontSize: 12, color: COLORS.textFaint },
  planPriceBox: { alignItems: 'flex-end' },
  planPrice: { fontSize: 30, fontWeight: '900' },
  planCurrency: { fontSize: 11, color: COLORS.textFaint },
  planDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginVertical: 14 },
  planFeatures: { gap: 7, marginBottom: 18 },
  planFeature: { fontSize: 14, lineHeight: 20 },
  planCTA: { borderRadius: RADIUS.md, paddingVertical: 15, alignItems: 'center' },
  planCTATextDark: { color: '#1a0f00', fontSize: 15, fontWeight: '800' },
  planCTAGhost: {
    borderRadius: RADIUS.md, paddingVertical: 14, alignItems: 'center',
    borderWidth: 1.5,
  },
  planCTAText: { fontSize: 15, fontWeight: '700' },
  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 8, marginBottom: 28 },
  trustBadge: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 99,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  trustText: { fontSize: 12, color: COLORS.textMuted },
  faq: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)', paddingTop: 20 },
  faqTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 14 },
  faqItem: { marginBottom: 16 },
  faqQ: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  faqA: { fontSize: 13, color: COLORS.textMuted, lineHeight: 19 },
});
