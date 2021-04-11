import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import QuizCard from './QuizCard';
import QuizScore from './QuizScore';

export default function QuizScreen({ route, navigation }) {
  const cards = route?.params?.cards;
  const [cardIndex, setCardIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finishedQuiz, setFinishedQuiz] = useState(false);
  const count = cards?.length ?? 0;
  function answerQuestion(correct) {
    if (correct) {
      setCorrectCount(correctCount + 1);
    }
    goToNextQuestion();
  }
  function goToNextQuestion() {
    if (cards?.length === cardIndex + 1) {
      setFinishedQuiz(true);
    } else {
      setCardIndex(cardIndex + 1);
    }
  }
  function restartQuiz() {
    setCardIndex(0);
    setCorrectCount(0);
    setFinishedQuiz(false);
  }
  if (count === 0) {
    return (<Text>
      This quiz has no questions yet.
    </Text>);
  }
  return (
    <ScrollView style={styles.container}>
      {finishedQuiz
        ? <QuizScore
          count={cards?.length}
          correct={correctCount}
          onRestart={restartQuiz}
          onGoBack={() => navigation.goBack()} />
        : <View>
          <Text style={styles.cardCountText}>{cardIndex + 1}/{count}</Text>
          <QuizCard card={cards[cardIndex]} onAnswer={answerQuestion} />
        </View>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cardCountText: {
    fontSize: 18,
    color: '#000000c0'
  }
})