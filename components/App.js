import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Detalles</Text>
    </View>
  );
}

function DecksScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Decks screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function AddDeckScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Deck Screen</Text>
    </View>
  );
}

const DecksStack = createStackNavigator();

function DecksStackScreen() {
  return (
    <DecksStack.Navigator>
      <DecksStack.Screen name="Decks" component={DecksScreen} />
      <DecksStack.Screen name="Details" component={DetailsScreen} />
    </DecksStack.Navigator>
  );
}

const AddDeckStack = createStackNavigator();

function AddDeckStackScreen() {
  return (
    <AddDeckStack.Navigator>
      <AddDeckStack.Screen name="Add deck" component={AddDeckScreen} />
      <AddDeckStack.Screen name="Details" component={DetailsScreen} />
    </AddDeckStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Decks" component={DecksStackScreen} />
        <Tab.Screen name="Add Deck" component={AddDeckStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
