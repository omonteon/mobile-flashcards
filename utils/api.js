import { AsyncStorage } from 'react-native';

export function fetchDecksFromStorage() {
  return AsyncStorage.getItem('decks');
}

export async function fetchDeckFromStorage(id) {
  const decksString = await AsyncStorage.getItem('decks');
  try {
    const decks = JSON.parse(decksString);
    return decks?.[id];
  } catch (error) {
    console.error(error);
  }
}

export async function addDeckToStorage(deck) {
  const decksString = await fetchDecksFromStorage();
  try {
    let decks = {};
    if (decksString) {
      decks = JSON.parse(decksString);
    }
    decks[deck.id] = {
      ...deck
    };
    return AsyncStorage.setItem('decks', JSON.stringify(decks));
  } catch (error) {
    console.error(error);
  }
}

export async function addCardToStorage(deckId, question) {
  const decksString = await fetchDecksFromStorage();
  try {
    let decks = {};
    if (decksString) {
      decks = JSON.parse(decksString);
      decks[deckId] = {
        ...decks[deckId],
        questions: decks[deckId] 
        ? decks[deckId].questions.concat(question) 
        : [question]
      };
    } else {
      console.log('There are no decks in the storage');
    }
    return AsyncStorage.setItem('decks', JSON.stringify(decks));
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDeckFromStorage(deckId) {
  const decksString = await fetchDecksFromStorage();
  try {
    let decks = {};
    if (decksString) {
      decks = JSON.parse(decksString);
      delete decks[deckId];
    } else {
      console.log('There are no decks in the storage');
    }
    console.log("DECKS AFTER DELETE", decks);
    return AsyncStorage.setItem('decks', JSON.stringify(decks));
  } catch (error) {
    console.error(error);
  }
}