import React from 'react'
import { View, Text, Button } from 'react-native'
import * as firebase from "firebase";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

export default function Account() {

    const onPress = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status === 'granted') {
          await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 2500,
            distanceInterval: 5,
            showsBackgroundLocationIndicator: false,
            foregroundService: {
              notificationTitle: "Ubicacion Test",
              notificationBody: "Estamos usando algo xd nice :)"
            }
          });
        }
      };

    return (
        <View>
            <Text>Account...</Text>
            <Button title="Cerrar Sesión" onPress={() => firebase.auth().signOut()} />
            <Button title="Background" onPress={onPress} />
        </View>
    )
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log("Error")
      return;
    }
    if (data) {
      const { locations } = data; 
      console.log("Locations", locations);
      
      // do something with the locations captured in the background
    }
  });