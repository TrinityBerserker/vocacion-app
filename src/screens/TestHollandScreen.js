import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { ProgressBar, ScaleButtons } from "../components/UI";
import { COLORS, RADIUS } from "../utils/theme";
import { HOLLAND_QUESTIONS } from "../data/tests";
import { calcHollandScores } from "../utils/scores";

export default function TestHollandScreen({ navigation }) {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const cardAnim = useRef(new Animated.Value(1)).current;
  const questions = HOLLAND_QUESTIONS;
  const q = questions[Math.min(current, questions.length-1)];

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
        const scores = calcHollandScores(newAnswers);
        navigation.navigate("BasicResults", { hollandScores: scores });
      }
    });
  };

  const goBack = () => {
    if (current > 0) { setCurrent(c => c - 1); }
    else { navigation.goBack(); }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, paddingHorizontal: 12 }}>
            <Text style={[styles.testLabel, { color: COLORS.gold }]}>Holland RIASEC</Text>
            <ProgressBar current={current} total={questions.length} color={COLORS.gold} />
          </View>
          <Text style={styles.counter}>{current + 1}/{questions.length}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Animated.View style={[styles.card, { opacity: cardAnim, transform: [{ translateY: cardAnim.interpolate({ inputRange: [0,1], outputRange: [12,0] }) }] }]}>
            <Text style={[styles.qNumber, { color: COLORS.gold }]}>Pregunta {current + 1}</Text>
            <Text style={styles.qText}>{q.text}</Text>
            <Text style={styles.qHint}>¿Qué tanto te identifica esto?</Text>
            <View style={styles.scaleLabels}>
              <Text style={styles.scaleLabel}>Nada</Text>
              <Text style={styles.scaleLabel}>Mucho</Text>
            </View>
            <ScaleButtons selected={answers[q.id]} onChange={handleAnswer} />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingTop: 8 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)" },
  backText: { color: COLORS.textMuted, fontSize: 20 },
  testLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 },
  counter: { fontSize: 13, color: COLORS.textFaint, fontWeight: "600" },
  scroll: { paddingHorizontal: 20, paddingBottom: 48, paddingTop: 8 },
  card: { backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(245,158,11,0.22)", borderRadius: RADIUS.xl, padding: 28, marginBottom: 24 },
  qNumber: { fontSize: 12, fontWeight: "700", letterSpacing: 1.2, marginBottom: 14 },
  qText: { fontSize: 22, color: COLORS.text, fontWeight: "700", lineHeight: 32, marginBottom: 10 },
  qHint: { fontSize: 13, color: COLORS.textFaint, marginBottom: 4 },
  scaleLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  scaleLabel: { fontSize: 12, color: COLORS.textFaint },
});
