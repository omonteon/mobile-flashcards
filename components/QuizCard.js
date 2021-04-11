import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuizCard({ card, onAnswer }) {
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

const styles = StyleSheet.create({
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
  }
})