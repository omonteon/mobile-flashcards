import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants';
import DecksListScreen from './DeckListScreen';
import AddDeckScreen from './AddDeckScreen';
import DeckScreen from './DeckScreen';
import AddCardScreen from './AddCardScreen';
import QuizScreen from './QuizScreen';
import { setLocalNotification } from '../utils/helpers'

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Decks') {
          iconName = 'ios-list'
        } else if (route.name === 'AddDeck') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: 'cadetblue',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 14
        }
      }}>
      <Tab.Screen name="Decks" component={DecksListScreen} />
      <Tab.Screen name="AddDeck" component={AddDeckScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  useEffect(() => {
    setLocalNotification();
  }, [])
  return (
    <>
      <CustomStatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ title: 'Decks' }}
          />
          <Stack.Screen
            name="DeckDetails"
            component={DeckScreen}
            options={({ route }) => ({ title: route.params.title })} />
          <Stack.Screen
            name="AddCardScreen"
            options={{ title: 'Add new card' }}
            component={AddCardScreen} />
          <Stack.Screen
            name="QuizScreen"
            options={{ title: 'Quiz' }}
            component={QuizScreen} />
        </Stack.Navigator>
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
