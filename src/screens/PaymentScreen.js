import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, ActivityIndicator, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GoldButton } from '../components/UI';
import { COLORS, RADIUS } from '../utils/theme';

const METHODS = [
  { id: 'card',     label: '💳  Tarjeta' },
  { id: 'oxxo',     label: '🏪  OXXO' },
  { id: 'spei',     label: '🏦  SPEI' },
];

export default function PaymentScreen({ navigation, route }) {
  const { plan, hollandScores } = route.params;
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', card: '', exp: '', cvv: '', email: '' });

  const handlePay = () => {
    setLoading(true);
    // Simula procesamiento (aquí integrarías Conekta/Stripe SDK)
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('PremiumAnalysis', { hollandScores, plan });
    }, 2200);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Pago seguro</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

            {/* Plan summary */}
            <LinearGradient
              colors={['rgba(245,158,11,0.1)', 'rgba(245,158,11,0.04)']}
              style={styles.planSummary}
            >
              <View>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planNote}>Pago único de por vida</Text>
              </View>
              <View style={styles.planPriceBox}>
                <Text style={styles.planPrice}>${plan.price}</Text>
                <Text style={styles.planCurrency}>MXN</Text>
              </View>
            </LinearGradient>

            {/* Payment method tabs */}
            <View style={styles.methodRow}>
              {METHODS.map(m => (
                <TouchableOpacity
                  key={m.id}
                  onPress={() => setMethod(m.id)}
                  style={[
                    styles.methodTab,
                    method === m.id && { borderColor: COLORS.gold, backgroundColor: COLORS.goldDim },
                  ]}
                >
                  <Text style={[styles.methodLabel, method === m.id && { color: COLORS.gold }]}>
                    {m.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Card form */}
            {method === 'card' && (
              <View style={styles.formSection}>
                <InputField label="Correo electrónico" placeholder="tu@email.com"
                  value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))}
                  keyboardType="email-address" />
                <InputField label="Nombre en la tarjeta" placeholder="Juan Pérez"
                  value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
                <InputField label="Número de tarjeta" placeholder="4242 4242 4242 4242"
                  value={form.card} onChange={v => setForm(f => ({ ...f, card: v }))}
                  keyboardType="numeric" maxLength={19} />
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <InputField label="Vencimiento" placeholder="MM/AA"
                      value={form.exp} onChange={v => setForm(f => ({ ...f, exp: v }))}
                      keyboardType="numeric" maxLength={5} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <InputField label="CVV" placeholder="123"
                      value={form.cvv} onChange={v => setForm(f => ({ ...f, cvv: v }))}
                      keyboardType="numeric" maxLength={4} secureTextEntry />
                  </View>
                </View>
              </View>
            )}

            {/* OXXO */}
            {method === 'oxxo' && (
              <View style={styles.altMethod}>
                <Text style={styles.altEmoji}>🏪</Text>
                <Text style={styles.altTitle}>Pago en OXXO</Text>
                <Text style={styles.altDesc}>
                  Ingresa tu email y generaremos una referencia de pago. Tienes 72 horas para
                  pagar en cualquier OXXO de México. Tu acceso se activa automáticamente al confirmar el pago.
                </Text>
                <InputField label="Correo electrónico" placeholder="tu@email.com"
                  value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))}
                  keyboardType="email-address" />
              </View>
            )}

            {/* SPEI */}
            {method === 'spei' && (
              <View style={styles.altMethod}>
                <Text style={styles.altEmoji}>🏦</Text>
                <Text style={styles.altTitle}>Transferencia SPEI</Text>
                <View style={styles.speiInfo}>
                  {[
                    { label: 'CLABE', value: '012 180 0123456789 01' },
                    { label: 'Banco', value: 'BBVA' },
                    { label: 'Beneficiario', value: 'Vocación App S.A. de C.V.' },
                    { label: 'Concepto', value: `VOC-${plan.id.toUpperCase()}` },
                    { label: 'Monto', value: `$${plan.price} MXN` },
                  ].map(({ label, value }) => (
                    <View key={label} style={styles.speiRow}>
                      <Text style={styles.speiLabel}>{label}</Text>
                      <Text style={styles.speiValue}>{value}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.speiNote}>
                  ⚠️ Envía tu comprobante a pagos@vocacion.mx con asunto "VOC-{plan.id.toUpperCase()}" y tu acceso se activará en menos de 2 horas.
                </Text>
              </View>
            )}

            {/* Pay button */}
            <TouchableOpacity
              onPress={handlePay}
              disabled={loading}
              activeOpacity={0.85}
              style={{ marginTop: 8 }}
            >
              <LinearGradient
                colors={loading ? ['rgba(245,158,11,0.3)', 'rgba(217,119,6,0.3)'] : ['#F59E0B', '#D97706']}
                style={styles.payBtn}
              >
                {loading
                  ? <ActivityIndicator color="#1a0f00" />
                  : <Text style={styles.payBtnText}>
                    {method === 'oxxo' ? '🏪 Generar referencia OXXO' :
                     method === 'spei' ? '✅ Ya realicé la transferencia' :
                     `🔒  Pagar $${plan.price} MXN`}
                  </Text>
                }
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.securityNote}>
              🔒 Cifrado SSL · No guardamos datos de tarjeta · Procesado por Conekta
            </Text>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const InputField = ({ label, placeholder, value, onChange, keyboardType, maxLength, secureTextEntry }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={COLORS.textFaint}
      keyboardType={keyboardType || 'default'}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  </View>
);

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
  scroll: { paddingHorizontal: 18, paddingBottom: 48 },
  planSummary: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderRadius: RADIUS.md, padding: 18, marginBottom: 24,
    borderWidth: 1, borderColor: COLORS.goldBorder,
  },
  planName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  planNote: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  planPriceBox: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  planPrice: { fontSize: 28, fontWeight: '900', color: COLORS.gold },
  planCurrency: { fontSize: 13, color: COLORS.textMuted, marginBottom: 3 },
  methodRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  methodTab: {
    flex: 1, borderRadius: RADIUS.md, paddingVertical: 11,
    alignItems: 'center', borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  methodLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  formSection: { gap: 14, marginBottom: 8 },
  row: { flexDirection: 'row' },
  inputGroup: { marginBottom: 0 },
  inputLabel: { fontSize: 13, color: COLORS.textMuted, marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)', borderRadius: RADIUS.md,
    paddingHorizontal: 14, paddingVertical: 13, color: COLORS.text, fontSize: 15,
  },
  altMethod: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: RADIUS.lg,
    padding: 22, marginBottom: 8, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  altEmoji: { fontSize: 40, marginBottom: 10 },
  altTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  altDesc: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  speiInfo: {
    width: '100%', backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: RADIUS.md, padding: 14, marginBottom: 14,
  },
  speiRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  speiLabel: { fontSize: 12, color: COLORS.textFaint },
  speiValue: { fontSize: 13, color: COLORS.text, fontWeight: '600' },
  speiNote: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center', lineHeight: 18 },
  payBtn: { borderRadius: RADIUS.md, paddingVertical: 17, alignItems: 'center', marginTop: 8 },
  payBtnText: { color: '#1a0f00', fontSize: 16, fontWeight: '800' },
  securityNote: { textAlign: 'center', fontSize: 12, color: COLORS.textFaint, marginTop: 14 },
});
