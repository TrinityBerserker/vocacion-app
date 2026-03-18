import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, ScrollView, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { ProgressBar, ScaleButtons } from '../components/UI';
import { COLORS, RADIUS } from '../utils/theme';

const { width } = Dimensions.get('window');

export default function TestScreen({ navigation, route }) {
  const { questions, meta, title, subtitle, accentColor, onComplete } = route.params || {};
  if (!questions) return null;

  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);

  const cardAnim = useRef(new Animated.Value(0)).current;

  const q = questions[current];
  const totalAnswered = Object.keys(answers).length;

  useEffect(() => {
    Animated.timing(cardAnim, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  }, [current]);

  const handleAnswer = (val) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);

    Animated.timing(cardAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
        Animated.timing(cardAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      } else {
        onComplete(newAnswers);
        navigation.goBack();
      }
    });
  };

  const goBack = () => {
    if (current > 0) {
      cardAnim.setValue(0);
      setCurrent(c => c - 1);
      Animated.timing(cardAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, paddingHorizontal: 12 }}>
            <Text style={[styles.testLabel, { color: accentColor }]}>{title}</Text>
            <ProgressBar current={current} total={questions.length} color={accentColor} />
          </View>
          <Text style={styles.counter}>{current + 1}/{questions.length}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {subtitle ? (
            <Text style={styles.subtitle}>{subtitle}</Text>
          ) : null}

          {/* Question Card */}
          <Animated.View
            style={[
              styles.card,
              { borderColor: accentColor + '22' },
              {
                opacity: cardAnim,
                transform: [{
                  translateY: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] })
                }],
              },
            ]}
          >
            <Text style={[styles.qNumber, { color: accentColor }]}>Pregunta {current + 1}</Text>
            <Text style={styles.qText}>{q.text}</Text>
            <Text style={styles.qHint}>¿Qué tanto te identifica esto?</Text>

            <View style={styles.scaleLabels}>
              <Text style={styles.scaleLabel}>Nada</Text>
              <Text style={styles.scaleLabel}>Mucho</Text>
            </View>
            <ScaleButtons selected={answers[q.id]} onChange={handleAnswer} />
          </Animated.View>

          {/* Mini progress dots */}
          <View style={styles.dots}>
            {questions.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === current && { backgroundColor: accentColor, width: 20 },
                  i < current && { backgroundColor: accentColor + '55' },
                ]}
              />
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 0,
  },
  backBtn: {
    width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
    borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)',
  },
  backText: { color: COLORS.textMuted, fontSize: 20 },
  testLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  counter: { fontSize: 13, color: COLORS.textFaint, fontWeight: '600' },
  scroll: { paddingHorizontal: 20, paddingBottom: 48, paddingTop: 8 },
  subtitle: { fontSize: 14, color: COLORS.textMuted, marginBottom: 16, lineHeight: 20 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderRadius: RADIUS.xl,
    padding: 28, marginBottom: 24,
  },
  qNumber: { fontSize: 12, fontWeight: '700', letterSpacing: 1.2, marginBottom: 14 },
  qText: { fontSize: 22, color: COLORS.text, fontWeight: '700', lineHeight: 32, marginBottom: 10 },
  qHint: { fontSize: 13, color: COLORS.textFaint, marginBottom: 4 },
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  scaleLabel: { fontSize: 12, color: COLORS.textFaint },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 5, flexWrap: 'wrap', paddingHorizontal: 16 },
  dot: {
    width: 7, height: 7, borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.12)',
    transition: 'width 0.2s',
  },
});
