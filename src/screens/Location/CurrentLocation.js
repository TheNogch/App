import React, { useState ,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Loading from '../../components/Loading';
import { Button } from "react-native-elements";

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);


export default function currentLocation() {
    const [location, setLocation] = useState(null);
  
    useEffect(() => {
      db.collection('pacientes').doc('paciente-test').get()
      .then((response) => {
        const respuesta =  response.data().currentLocation;
        setLocation({
          latitude: respuesta.latitude,
          longitude: respuesta.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007
        })
      });
    }, []);

    const onPress = () => {
      console.log(`Location = {
        latitude: ${location.latitude},
        longitude: ${location.longitude},
        time: ${new Date()}
      }`)
    }

    return (
      <View style={styles.container}>
            {location ? 
                <MapView 
                    style={styles.mapStyle}
                    initialRegion={location}
                    showsUserLocation={true}
                > 
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude
                    }}
                  ></Marker>
                </MapView>
                : <Loading isVisible={true} text="Cargando"/> 
            }
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    mapStyle: {
      width: '100%',
      height: '100%',
    },
  });