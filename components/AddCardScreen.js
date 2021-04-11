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
// import { addCardToStorage } from '../utils/api';


export default function AddCardScreen({ navigation }) {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const submitDisabled = !questionText || !answerText;
  const onChangeQuestionText = text => {
    setQuestionText(text);
  }
  const onChangeAnswerText = text => {
    setAnswerText(text);
  }
  const submitAnswer = async () => {
    // const newDeck = {
    //   title: deckName,
    //   timestamp: new Date().getTime(),
    //   questions: []
    // }
    // await addDeckToStorage(newDeck);
    // setDeckName('');
    // Keyboard.dismiss();
    navigation.goBack()
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Input the question</Text>
        <TextInput style={styles.textInput} onChangeText={onChangeQuestionText} value={questionText} />
        <Text style={styles.title}>Input the answer</Text>
        <TextInput style={styles.textInput} onChangeText={onChangeAnswerText} value={answerText} />
        <TouchableOpacity onPress={submitAnswer} style={[styles.primaryButton, submitDisabled ? styles.disabledButton : null]} disabled={submitDisabled}>
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
    fontSize: 18,
  },
});