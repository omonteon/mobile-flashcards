import { fetchDecksFromStorage } from '../utils/api';
import { View, Text, Button, FlatList, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

const Item = ({ title, cardsCount = 0, children }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text>{cardsCount} cards</Text>
    {children}
  </View>
);

export default function DeckListScreen({ navigation }) {
  const [decks, setDecks] = useState([]);  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDecksFromStorage().then(decksString => {
        try {
          const storedDecks = JSON.parse(decksString);
          if (storedDecks) {
            const sortedDecks = Object.keys(storedDecks)
            .map(deckId => storedDecks[deckId])
            .sort((deckA, deckB) => deckB.timestamp - deckA.timestamp);
            setDecks(sortedDecks);
          }
        } catch (error) {
          console.log('Error while fetching decks', error);
        }
      })
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <Item title={item.title} cardsCount={item.questions.length}>
      <Button
        title="Go to Deck"
        onPress={() => navigation.navigate('DeckDetails', { id: item.id, title: item.title })}
      />
    </Item>
  );
  return (
    <SafeAreaView style={styles.container}>
      {decks.length > 0 && <FlatList
        data={decks}
        renderItem={renderItem}
        keyExtractor={item => item.title + Math.random() * 100}
      />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 3,
    borderColor: 'cadetblue',
    padding: 20,
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 32,
  },
});
