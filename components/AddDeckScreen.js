import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { addDeckToStorage } from '../utils/api';
import { uid } from '../utils/helpers';


export default function AddDeckScreen({ navigation }) {
  const [deckName, setDeckName] = useState('');
  const onChangeText = text => {
    setDeckName(text);
  }
  const submitDeck = async () => {
    const id = `id_${uid()}`;
    const newDeck = {
      id,
      title: deckName,
      timestamp: new Date().getTime(),
      questions: []
    }
    await addDeckToStorage(newDeck);
    setDeckName('');
    Keyboard.dismiss();
    navigation.navigate('Decks');
    navigation.navigate('DeckDetails', {id, title: deckName });
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput style={styles.textInput} onChangeText={onChangeText} value={deckName} />
        <TouchableOpacity onPress={submitDeck} style={[styles.primaryButton, !deckName ? styles.disabledButton : null]} disabled={deckName === ''}>
          <Text style={styles.primaryButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 15
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 4,
    fontSize: 20,
    padding: 10,
    color: '#000000c0'
  },
  primaryButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cadetblue',
    borderRadius: 4
  },
  primaryButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: 'gray'
  },
  title: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold'
  },
});