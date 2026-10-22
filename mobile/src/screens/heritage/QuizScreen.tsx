// mobile/src/screens/heritage/QuizScreen.tsx
// Culture, Royal Lineage & History Quiz for Sagamu Remo Mobile App

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { Header } from '../../components/Header';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  insight: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: "In what historic year was modern Sagamu founded through the mutual defense confederation of 13 Remo settlements?",
    options: ["1872 A.D.", "1804 A.D.", "1914 A.D.", "1960 A.D."],
    answer: 0,
    insight: "In 1872, driven by the need for survival and mutual defense during the 19th-century Yoruba Civil Wars, thirteen independent Remo settlements confederated to establish modern Sagamu on Bammowu land."
  },
  {
    question: "What is the historical origin of the name 'Sagamu'?",
    options: ["A sacred hill fortress", "Orisagamu Ewa — a freshwater spring", "An ancient warrior sword", "A sacred palm grove"],
    answer: 1,
    insight: "The name Sagamu is derived from 'Orisagamu Ewa', a natural spring and aperture where fresh water bubbled from the earth, sustaining the founding confederate ancestors."
  },
  {
    question: "On whose fertile farmland did the 13 confederate communities gather to establish unified Sagamu?",
    options: ["Oduduwa", "Obanta", "Bammowu", "Lisabi"],
    answer: 2,
    insight: "The founding confederates assembled and settled on the elevated, fertile farmlands of a nobleman named Bammowu, which offered strategic high ground for defensive vigilance."
  },
  {
    question: "What is the traditional title of the sovereign paramount monarch of Sagamu and all of Remoland?",
    options: ["The Awujale", "The Akarigbo of Remoland", "The Alake", "The Ooni"],
    answer: 1,
    insight: "The Akarigbo of Remoland is the paramount sovereign and supreme traditional ruler over all 33 towns of Remoland (Remo Metalelogbon), with his royal seat in Sagamu (Aafin Akarigbo, Ita Oba)."
  },
  {
    question: "How many historic settlements united to form the confederation of Sagamu?",
    options: ["7 Settlements", "10 Settlements", "13 Settlements", "33 Settlements"],
    answer: 2,
    insight: "Thirteen distinct settlements confederated in 1872: Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, and Ijagba."
  },
  {
    question: "Which market in Sagamu is internationally renowned as the largest kolanut trading hub in West Africa?",
    options: ["Mile 12 Market", "Sabo Kolanut Market", "Bodija Market", "Dugbe Market"],
    answer: 1,
    insight: "Sabo Market in Sagamu has operated for over a century as West Africa's preeminent wholesale exchange for Gbanja and Abata kolanuts, trading with Niger, Chad, Mali, and northern Nigeria."
  },
  {
    question: "Which institution, founded in 1946 in Sagamu, was the first secondary school established in Remoland?",
    options: ["Ositelu Memorial College", "Remo Secondary School (RSS Sagamu)", "Abeokuta Grammar School", "Ijebu Ode Grammar School"],
    answer: 1,
    insight: "Remo Secondary School (RSS) was established in 1946 under the royal patronage of Oba William Christopher Adedoyin II as the pioneer secondary academy of Remoland."
  },
  {
    question: "Who is the reigning The Akarigbo of Remoland, crowned on December 7, 2017?",
    options: ["Oba Babatunde Adewale Ajayi, CFR, FCA", "Oba Moses Awolesi", "Oba Dr. Michael Sonariwo", "Oba William Adedoyin"],
    answer: 0,
    insight: "HRM Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II), a distinguished Chartered Accountant and Supreme Court Barrister, reigns as the Paramount Ruler of Remoland."
  },
  {
    question: "What flagship annual festival unites all 13 confederate quarters of Sagamu every November?",
    options: ["Ojude Oba Festival", "Sagamu Day Grand Celebration", "Eyo Festival", "Lisabi Day"],
    answer: 1,
    insight: "Sagamu Day is the supreme civic and cultural homecoming celebration organized annually in November by the Sagamu Development Association (SDA)."
  }
];

export const QuizScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const q = QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === q.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="SAGAMU HERITAGE QUIZ"
        subtitle="Royal Lineage, History & Customary Knowledge"
        onProfilePress={() => navigation.navigate('Profile')}
      />

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        {isComplete ? (
          <View style={styles.resultCard}>
            <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 12 }}>
              {score >= 7 ? '👑' : score >= 5 ? '📜' : '🏛️'}
            </Text>
            <Text style={styles.resultTitle}>Quiz Completed!</Text>
            <Text style={styles.scoreText}>
              You scored <Text style={{ color: '#C9963A', fontWeight: '900' }}>{score}</Text> / {QUESTIONS.length}
            </Text>
            <Text style={styles.rankTitle}>
              {score >= 8
                ? '🎖️ Royal Scholar of Sagamu Remoland'
                : score >= 5
                ? '🎗️ True Cultural Custodian'
                : '📖 Remo Heritage Apprentice'}
            </Text>
            <Text style={styles.resultDesc}>
              {score >= 8
                ? 'Remarkable! You possess deep wisdom and profound mastery of Sagamu Remo royal genealogy, foundations, and traditions.'
                : 'Good attempt! Explore the Monarchy and History archives in the Heritage tab to sharpen your mastery.'}
            </Text>

            <TouchableOpacity style={styles.actionBtn} onPress={handleRestart}>
              <Text style={styles.actionBtnText}>🔄 Take Quiz Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
              <Text style={styles.qCounter}>
                Question {currentIdx + 1} of {QUESTIONS.length}
              </Text>
              <Text style={styles.liveScore}>Score: {score}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` },
                ]}
              />
            </View>

            {/* Question Card */}
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{q.question}</Text>

              <View style={{ gap: 8, marginTop: 14 }}>
                {q.options.map((opt, idx) => {
                  let btnBg = '#0f172a';
                  let borderColor = '#334155';
                  let textColor = '#cbd5e1';

                  if (isAnswered) {
                    if (idx === q.answer) {
                      btnBg = 'rgba(34, 197, 94, 0.2)';
                      borderColor = '#22c55e';
                      textColor = '#4ade80';
                    } else if (idx === selectedOpt) {
                      btnBg = 'rgba(239, 68, 68, 0.2)';
                      borderColor = '#ef4444';
                      textColor = '#f87171';
                    }
                  } else if (idx === selectedOpt) {
                    btnBg = 'rgba(201, 150, 58, 0.2)';
                    borderColor = '#C9963A';
                  }

                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      style={[styles.optBtn, { backgroundColor: btnBg, borderColor }]}
                    >
                      <Text style={[styles.optText, { color: textColor }]}>
                        {['A', 'B', 'C', 'D'][idx]}. {opt}
                      </Text>
                      {isAnswered && idx === q.answer && <Text>✅</Text>}
                      {isAnswered && idx === selectedOpt && idx !== q.answer && <Text>❌</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Historical Insight after answering */}
              {isAnswered && (
                <View style={styles.insightBox}>
                  <Text style={styles.insightHeading}>💡 ROYAL HISTORICAL INSIGHT</Text>
                  <Text style={styles.insightText}>{q.insight}</Text>

                  <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                    <Text style={styles.nextBtnText}>
                      {currentIdx + 1 === QUESTIONS.length ? '👑 See Final Results' : 'Next Question ➔'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  qCounter: {
    fontSize: 12,
    fontWeight: '800',
    color: '#C9963A',
  },
  liveScore: {
    fontSize: 12,
    fontWeight: '800',
    color: '#cbd5e1',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#1e293b',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#C9963A',
  },
  questionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 22,
  },
  optBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  optText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  insightBox: {
    marginTop: 16,
    backgroundColor: 'rgba(201, 150, 58, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(201, 150, 58, 0.3)',
    borderRadius: 8,
    padding: 12,
  },
  insightHeading: {
    fontSize: 10,
    fontWeight: '900',
    color: '#C9963A',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 12,
    color: '#cbd5e1',
    lineHeight: 17,
  },
  nextBtn: {
    marginTop: 12,
    backgroundColor: '#C9963A',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  nextBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },
  resultCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 6,
  },
  scoreText: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 8,
  },
  rankTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#C9963A',
    marginBottom: 10,
  },
  resultDesc: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: '#C9963A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#000000',
  },
});
