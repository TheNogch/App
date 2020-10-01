import React, { useState ,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Loading from '../../components/Loading';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function HistLocation() {
    const [histLocation, setHistLocation] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        db.collection('pacientes').doc('paciente-test').get()
        .then((response) => {
          const respuesta =  response.data().historyLocation;
          setHistLocation(respuesta)
        });

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


    return (
        <View style={styles.container}>
            {location ? 
            <MapView 
                style={styles.mapContainer}
                initialRegion={location}
            >
                <Polyline
                    coordinates={histLocation}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={6}
                />
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
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    mapContainer: {
        width: '100%',
        height: '100%'
    }
  });
