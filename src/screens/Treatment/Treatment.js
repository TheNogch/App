import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from "react-native-elements";

export default function Treatment( { navigation } ) {
    return (
        <View style={styles.formContainer}>
            <Button
                title="Agregar Tratamiento"
                containerStyle={styles.btnContainer}
                onPress={() => {navigation.navigate('addTreatment')}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
    },
    btnContainer: {
      marginTop: 20,
      width: "80%",
    }
  });