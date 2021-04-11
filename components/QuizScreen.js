import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

function QuizCard({ card, onAnswer }) {
  const [toggleAnswer, setToggleAnswer] = useState(false);
  function handleToggleAnswer() {
    setToggleAnswer(!toggleAnswer);
  }
  return (
    <View>
      {toggleAnswer
        ? <Text style={styles.cardTitle}>{card.answer}</Text>
        : <Text style={styles.cardTitle}>{card.question}</Text>
      }
      <TouchableOpacity onPress={handleToggleAnswer}>
        {toggleAnswer
          ? <Text style={styles.seeAnswerText}>See Question</Text>
          : <Text style={styles.seeAnswerText}>See Answer</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.primaryButton, styles.correctButton]} onPress={() => onAnswer(true)}>
        <Text style={styles.primaryButtonText}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.primaryButton, styles.incorrectButton]} onPress={() => onAnswer(false)}>
        <Text style={styles.primaryButtonText}>Incorrect</Text>
      </TouchableOpacity>
    </View>
  );
}




function QuizScore({ count, correct, onRestart, onGoBack }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.scoreTitle}>Score</Text>
      <Text style={styles.scoreDetails}>You answered {correct} correct question(s) out of {count} total.</Text>
      <TouchableOpacity style={[styles.primaryButton]} onPress={onRestart}>
        <Text style={styles.primaryButtonText}>Restart quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.defaultButton]} onPress={onGoBack}>
        <Text style={styles.defaultButtonText}>Go back to deck</Text>
      </TouchableOpacity>
    </View>
  )
}

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
  },
  // QuizCard
  cardTitle: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  seeAnswerText: {
    textAlign: 'center',
    color: 'rgb(255, 59, 48)',
    fontSize: 16,
    marginBottom: 20
  },
  primaryButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cadetblue',
    borderRadius: 4,
    // marginHorizontal: 15
    marginTop: 15
  },
  primaryButtonText: {
    color: 'white',
    // textTransform: 'uppercase',
    fontSize: 20,
  },
  correctButton: {
    backgroundColor: 'rgb(52, 199, 89)'
  },
  incorrectButton: {
    backgroundColor: 'rgb(255, 59, 48)'
  },
  // Quiz Score
  scoreTitle: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  scoreDetails: {
    fontSize: 20,
    color: '#000000c0',
    textAlign: 'center',
    marginBottom: 20
  },
  defaultButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'cadetblue',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 15
  },
  defaultButtonText: {
    color: 'cadetblue',
    // textTransform: 'uppercase',
    fontSize: 20,
  },
})