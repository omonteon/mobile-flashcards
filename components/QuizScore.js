import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

export default function QuizScore({ count, correct, onRestart, onGoBack }) {
  useEffect(() => {
    //Reset notification upon completing quiz
    clearLocalNotification().then(setLocalNotification);
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.scoreTitle}>Score: {correct}</Text>
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

const styles = StyleSheet.create({
  primaryButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cadetblue',
    borderRadius: 4,
    marginTop: 15
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20,
  },
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