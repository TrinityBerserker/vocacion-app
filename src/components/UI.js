import React, { useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SHADOW } from '../utils/theme';

const { width } = Dimensions.get('window');

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
export const ProgressBar = ({ current, total, color = COLORS.gold }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: current / total,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [current]);

  return (
    <View style={styles.progressTrack}>
      <Animated.View
        style={[
          styles.progressFill,
          {
            backgroundColor: color,
            width: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
          },
        ]}
      />
    </View>
  );
};

// ─── SCALE BUTTONS (1–5) ──────────────────────────────────────────────────────
export const ScaleButtons = ({ selected, onChange }) => {
  return (
    <View style={styles.scaleRow}>
      {[1, 2, 3, 4, 5].map(v => {
        const active = selected === v;
        return (
          <TouchableOpacity
            key={v}
            onPress={() => onChange(v)}
            activeOpacity={0.7}
            style={[
              styles.scaleBtn,
              active && { borderColor: COLORS.gold, backgroundColor: 'rgba(245,158,11,0.18)' },
            ]}
          >
            <Text style={[styles.scaleBtnText, active && { color: COLORS.gold }]}>{v}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ─── GOLD BUTTON ──────────────────────────────────────────────────────────────
export const GoldButton = ({ title, onPress, style, disabled }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.85} disabled={disabled} style={style}>
    <LinearGradient
      colors={disabled ? ['rgba(245,158,11,0.3)', 'rgba(217,119,6,0.3)'] : ['#F59E0B', '#D97706']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={[styles.goldBtn, SHADOW.gold]}
    >
      <Text style={styles.goldBtnText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

// ─── GHOST BUTTON ─────────────────────────────────────────────────────────────
export const GhostButton = ({ title, onPress, style, color = COLORS.gold }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[styles.ghostBtn, { borderColor: color + '55' }, style]}
  >
    <Text style={[styles.ghostBtnText, { color }]}>{title}</Text>
  </TouchableOpacity>
);

// ─── CARD ─────────────────────────────────────────────────────────────────────
export const Card = ({ children, style, gold }) => (
  <View
    style={[
      styles.card,
      gold && { backgroundColor: 'rgba(245,158,11,0.07)', borderColor: COLORS.goldBorder },
      style,
    ]}
  >
    {children}
  </View>
);

// ─── BADGE ────────────────────────────────────────────────────────────────────
export const Badge = ({ label, color = COLORS.gold }) => (
  <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color + '55' }]}>
    <Text style={[styles.badgeText, { color }]}>{label}</Text>
  </View>
);

// ─── SECTION TITLE ────────────────────────────────────────────────────────────
export const SectionTitle = ({ emoji, title, color = COLORS.gold }) => (
  <View style={styles.sectionTitleRow}>
    <Text style={styles.sectionEmoji}>{emoji}</Text>
    <Text style={[styles.sectionTitleText, { color }]}>{title}</Text>
  </View>
);

// ─── RADAR CHART (SVG-like with RN Views) ─────────────────────────────────────
export const HollandBar = ({ type, score, max, meta }) => {
  const pct = Math.min((score / (max * 1.2)) * 100, 100);
  return (
    <View style={styles.barRow}>
      <Text style={styles.barEmoji}>{meta.emoji}</Text>
      <View style={{ flex: 1 }}>
        <View style={styles.barLabelRow}>
          <Text style={styles.barLabel}>{meta.name}</Text>
          <Text style={[styles.barScore, { color: meta.color }]}>{score}pts</Text>
        </View>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: meta.color }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressTrack: {
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 99,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 99,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 24,
  },
  scaleBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleBtnText: {
    color: '#94a3b8',
    fontSize: 20,
    fontWeight: '700',
  },
  goldBtn: {
    borderRadius: RADIUS.md,
    paddingVertical: 17,
    alignItems: 'center',
  },
  goldBtnText: {
    color: '#1a0f00',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  ghostBtn: {
    borderRadius: RADIUS.md,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  ghostBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.bgCardBorder,
    borderRadius: RADIUS.lg,
    padding: 20,
    marginBottom: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionEmoji: { fontSize: 18 },
  sectionTitleText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  barEmoji: { fontSize: 20 },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barLabel: { color: COLORS.text, fontSize: 14, fontWeight: '500' },
  barScore: { fontSize: 13, fontWeight: '700' },
  barTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 99 },
});
