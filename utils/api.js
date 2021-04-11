import { AsyncStorage } from 'react-native';

// Helper function to generate a pseudo unique id.
// Code taken from: https://stackoverflow.com/a/53116778
const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

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
    const id = uid();
    if (decksString) {
      decks = JSON.parse(decksString);
    }
    decks[`id_${id}`] = {
      id: `id_${id}`,
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
      console.log('API | Deck id:', deckId);
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