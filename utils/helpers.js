import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

// Helper function to generate a pseudo unique id.
// Code taken from: https://stackoverflow.com/a/53116778
const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Helper functions for notifications taken from the example project "UdaciFitness" in the course.
const NOTIFICATION_KEY = 'MOBILE_FLASHCARDS:notifications';

async function clearLocalNotification () {
  const result = await AsyncStorage.removeItem(NOTIFICATION_KEY);
  return Notifications.cancelAllScheduledNotificationsAsync(result);
}

function createNotification () {
  return {
    title: 'Quiz your knowledge !',
    body: "👋 don't forget to do a quiz today.",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: true,
                  shouldSetBadge: true,
                }),
              });
              Notifications.scheduleNotificationAsync({
                content: createNotification(),
                trigger: tomorrow
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export { uid, clearLocalNotification, setLocalNotification };