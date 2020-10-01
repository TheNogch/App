import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { Button, Slider } from 'react-native-elements';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from "expo-location";
import Loading from '../../components/Loading';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function SafeArea() {
    const [value, setValue] = useState(500)
    const [location, setLocation] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const historyLocation = [
      {
            latitude: -33.0426675,
            longitude: -71.5884359,
          }, 
      {
            latitude: -33.0427496,
            longitude: -71.5884845,
          }, 
      {
            latitude: -33.0427894,
            longitude: -71.5885905,
          }, 
      {
            latitude: -33.0428302,
            longitude: -71.588699,
          }, 
      {
            latitude: -33.0428302,
            longitude: -71.588699,
          }, 
      {
            latitude: -33.0428714,
            longitude: -71.5888107,
          }, 
      {
            latitude: -33.0429141,
            longitude: -71.588922,
          }, 
      {
            latitude: -33.0429517,
            longitude: -71.5890205,
          }, 
      {
            latitude: -33.0429971,
            longitude: -71.58914,
          }, 
      {
            latitude: -33.0429971,
            longitude: -71.58914,
          }, 
      {
            latitude: -33.0429723,
            longitude: -71.5893277,
          }, 
      {
            latitude: -33.0428498,
            longitude: -71.5893877,
          }, 
      {
            latitude: -33.0427346,
            longitude: -71.5894454,
          }, 
      {
            latitude: -33.0425094,
            longitude: -71.5895605,
          }, 
      {
            latitude: -33.0423966,
            longitude: -71.5896179,
          }, 
      {
            latitude: -33.0421788,
            longitude: -71.5897306,
          }, 
      {
            latitude: -33.0420727,
            longitude: -71.5897772,
          }, 
      {
            latitude: -33.0418447,
            longitude: -71.5898879,
          }, 
      {
            latitude: -33.0417408,
            longitude: -71.5899377,
          }, 
      {
            latitude: -33.0415037,
            longitude: -71.5900529,
          }, 
      {
            latitude: -33.0413997,
            longitude: -71.5901024,
          }, 
      {
            latitude: -33.0411637,
            longitude: -71.5902189,
          }, 
      {
            latitude: -33.0410504,
            longitude: -71.590277,
          }, 
      {
            latitude: -33.0408541,
            longitude: -71.590376,
          }, 
      {
            latitude: -33.040718,
            longitude: -71.5904493,
          }, 
      {
            latitude: -33.0404866,
            longitude: -71.5905685,
          }, 
      {
            latitude: -33.0404012,
            longitude: -71.5906102,
          }, 
      {
            latitude: -33.0402983,
            longitude: -71.5906022,
          }, 
      {
            latitude: -33.0402468,
            longitude: -71.5904503,
          }, 
      {
            latitude: -33.0401437,
            longitude: -71.590191,
          }, 
      {
            latitude: -33.0400243,
            longitude: -71.5901575,
          }, 
      {
            latitude: -33.0399198,
            longitude: -71.5902316,
          }, 
      {
            latitude: -33.0397181,
            longitude: -71.5903442,
          }, 
      {
            latitude: -33.0396306,
            longitude: -71.5903884,
          }
      ]
  
    useEffect(() => {
      (async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
        }
        // await Location.watchPositionAsync({accuracy: Location.Accuracy.BestForNavigation,distanceInterval: 10, },
        //   (loc) => { setLocation({latitude: loc.coords.latitude, longitude: loc.coords.longitude, latitudeDelta: 0.007, longitudeDelta: 0.007 }) }
        //   );
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007
        });
      })();
    }, []);

    const onPress = () => {
      setIsVisible(true);
      try {
        db.collection("pacientes").doc("paciente-test-area").set({
          safeArea: {
            latitude: location.latitude,
            longitude: location.longitude,
            distance: Math.trunc(value),
            createdAt: new Date()
          }//,
          // historyLocation: historyLocation,
          // currentLocation: {
          //   latitude: -33.0396306,
          //   longitude: -71.5903884,
          // }
        })
        setIsVisible(false);
      } catch (error) {
        setIsVisible(false);
        console.log("Error al subir los datos")
      }
    }



    return (
        <View style={styles.container}> 
            {location ? 
                <MapView 
                    style={styles.mapContainer}
                    initialRegion={location}
                    onRegionChange={(region)=>setLocation(region)}
                >
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude
                    }}
                  >
                  </Marker>
                  <Circle
                    center={{
                      latitude: location.latitude,
                      longitude: location.longitude
                    }}
                    radius={value}
                    strokeWidth={2}
                    strokeColor="#d90429"
                    fillColor="rgba(239, 35, 60, 0.3)"
                  >

                  </Circle>
                </MapView>
                : <Loading isVisible={true} text="Cargando"/> 
            }
            <Loading isVisible={isVisible} text="Cargando"/>
            <Slider
                style= {styles.sliderBar}
                value = {value}
                onValueChange = {(value) => {setValue(value)} }
                maximumValue={1000}
                minimumValue={0}
                thumbStyle={{height: 20, width: 5, backgroundColor:'transparent'}}
                thumbProps={{
                    Component: Animated.Image,
                    source: {
                      uri: 'https://firebasestorage.googleapis.com/v0/b/alzhistant-test.appspot.com/o/Black.jpg?alt=media&token=2046e716-0bc6-4e62-a969-cc362af26f02',
                    },
                  }}
            />
            <Text style={styles.txtCoord}>{`${Math.round(value)} metros`}</Text>
            <Button
                title="Determinar área segura"
                containerStyle={styles.btnContainer}
                onPress={onPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    sliderBar: {
        width: "80%",
        height: 40,
    },
    mapContainer: {
        marginTop: 30,
        width: '100%',
        height: '70%'
    },
    txtCoord: {
        marginBottom: 10
    }
  });