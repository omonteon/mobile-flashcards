import { AsyncStorage } from 'react-native';

// Helper function to generate a pseudo unique id.
// Code taken from: https://stackoverflow.com/a/53116778
const uid = function(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function fetchDecksFromStorage() {
  return AsyncStorage.getItem('decks');
}

export async function addDeckToStorage(deck) {
  const decksString = await fetchDecksFromStorage(); 
  try {
    let decks = {};
    if (decksString) {
      decks = JSON.parse(decksString);
    }    
    decks[`id_${uid()}`] = deck;
    return AsyncStorage.setItem('decks', JSON.stringify(decks));
  } catch (error) {
    console.error(error);
  }
}

// {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// }