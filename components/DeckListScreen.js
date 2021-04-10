import { fetchDecksFromStorage } from '../utils/api';
import { View, Text, Button, FlatList, StyleSheet, StatusBar, SafeAreaView, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';

const Item = ({ title, children }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
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
    <Item title={item.title}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
