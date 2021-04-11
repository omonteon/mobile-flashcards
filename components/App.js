import React, { useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import DecksListScreen from './DeckListScreen';
import AddDeckScreen from './AddDeckScreen';
import DeckScreen from './DeckScreen';
import AddCardScreen from './AddCardScreen';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Detalles</Text>
    </View>
  );
}


const DecksStack = createStackNavigator();

function DecksStackScreen() {
  return (
    <DecksStack.Navigator>
      <DecksStack.Screen name="Decks" component={DecksListScreen} />
      <DecksStack.Screen
        name="DeckDetails"
        component={DeckScreen}
        options={({ route }) => ({ title: route.params.title })} />
      <DecksStack.Screen
        name="AddCardScreen"
        options={{ title: 'Add new card' }}
        component={AddCardScreen} />
    </DecksStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    AsyncStorage.removeItem('decks');
  }, [])
  return (
    <>
      <UdaciStatusBar />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Decks" component={DecksStackScreen} />
          <Tab.Screen name="Add Deck" component={AddDeckScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
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
