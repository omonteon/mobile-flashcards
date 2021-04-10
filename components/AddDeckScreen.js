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


export default function AddDeckScreen({ navigation }) {
  const [deckName, setDeckName] = useState('');
  const onChangeText = text => {
    setDeckName(text);
  }
  const submitDeck = async () => {
    const newDeck = {
      title: deckName,
      timestamp: new Date().getTime(),
      questions: []
    }
    await addDeckToStorage(newDeck);
    setDeckName('');
    Keyboard.dismiss();
    navigation.navigate('Decks');
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
    marginTop: 40,
    marginBottom: 20,
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
    fontSize: 20,
  },
  disabledButton: {
    backgroundColor: 'gray'
  },
  title: {
    marginTop: 20,
    fontSize: 32,
  },
});