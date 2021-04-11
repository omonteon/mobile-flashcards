import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function DeckScreen({ navigation, route }) {
  const deck = route?.params?.deck;
  const cardsCount = deck?.questions?.length ?? 0;
  function onAddCard() {
    navigation.navigate('AddCard')
  }
  function onStartQuiz() {
    navigation.navigate('Quiz')
  }
  return (
    <View >
      <View>
        <Text style={styles.title}>{deck?.title || ''}</Text>
        <Text style={styles.subtitle}>{cardsCount} cards</Text>
      </View>

      <View>
        <TouchableOpacity onPress={onAddCard} style={styles.defaultButton}>
          <Text style={styles.defaultButtonText}>
            Add Card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onStartQuiz} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            Start Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 30
  },
  defaultButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'cadetblue',
    borderWidth: 1,
    borderRadius: 4,
    margin: 15
  },
  defaultButtonText: {
    color: 'cadetblue',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  primaryButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cadetblue',
    borderRadius: 4,
    marginHorizontal: 15
  },
  primaryButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
  },
})