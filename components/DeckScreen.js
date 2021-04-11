import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { deleteDeckFromStorage, fetchDeckFromStorage } from '../utils/api';

export default function DeckScreen({ navigation, route }) {
  const [deck, setDeck] = useState({})
  const cardsCount = deck?.questions?.length ?? 0;
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDeckFromStorage(route?.params?.id).then(deckFromStorage => {
        setDeck(deckFromStorage)
      })
    });

    return unsubscribe;
  }, [navigation]);
  function onAddCard() {
    navigation.navigate('AddCardScreen', { deckId: deck.id });
  }
  function onStartQuiz() {
    navigation.navigate('QuizScreen');
  }
  function onDeleteDeck() {
    Alert.alert(
      "Are you sure?",
      "This action can't be reversed.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete Deck", onPress: () => {
            deleteDeckFromStorage(deck?.id)
              .then(() => {
                navigation.navigate('Decks');
              })
          }
        }
      ]
    );
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
        <TouchableOpacity onPress={onDeleteDeck} style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>
            Delete Deck
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
  dangerButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15
  },
  dangerButtonText: {
    color: 'rgb(255, 59, 48)',
    fontSize: 16,
  },
})