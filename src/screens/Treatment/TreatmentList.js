import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import TratamientoClass, {} from '../../clasess/TratamientoClass'
import Loading from '../../components/Loading'

export default function TreatmentViewTreatmentList( {navigation} ) {
    const [isVisible, setIsVisible] = useState(true);
    const [tratamientos, setTratamientos] = useState(null);

    // const tratamientos = [
    //     {
    //       "descripcion": "Desc Treatment",
    //       "fechaFin": false,
    //       "fechaInicio": "30/10/2020 21:10",
    //       "frecuencia": "hrs",
    //       "id": "EG6UCBz1EMZdv5xw04Nm",
    //       "intervalo": "5",
    //       "tipo": "actividad",
    //       "titulo": "Test Treatment",
    //     },
    //     {
    //       "descripcion": "Descripcion tratamiento prueba",
    //       "fechaFin": false,
    //       "fechaInicio": "25/10/2020 18:10",
    //       "frecuencia": "dd",
    //       "id": "XECvNISiVBXKe6HPGcbv",
    //       "intervalo": "2",
    //       "tipo": "medicamento",
    //       "titulo": "Tratamiento Prueba",
    //     },
    //     {
    //       "descripcion": "DescripTrat1",
    //       "fechaFin": false,
    //       "fechaInicio": "26/10/2020 18:10",
    //       "frecuencia": "mm",
    //       "id": "nq8CyBxpr8gxiy4k3SyL",
    //       "intervalo": "4",
    //       "tipo": "medicamento",
    //       "titulo": "Trat1",
    //     },
    //   ]

    useEffect( () => {
        async function obtenerTratamientos(){
            const listaTratamientos = await TratamientoClass.obtenerListaTratamientos("8VnAyXfmKwljqS0O7NY1");
            setTratamientos(listaTratamientos);
            setIsVisible(false);
        }
        obtenerTratamientos();
    }, [])

    const onPress = (tratamiento) => {
        navigation.navigate("treatmentView", {tratamiento: tratamiento})
    }

    return (
        <SafeAreaView style={styles.formContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewStlye}>
                <Loading isVisible={isVisible} text="Cargando"/>
                { tratamientos &&
                    tratamientos.map((tratamiento, i) => (
                        <ListItem key={i} bottomDivider onPress={() => {onPress(tratamiento)}}>
                            <ListItem.Content >
                                <ListItem.Title>{tratamiento.titulo}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginTop: -5,
        marginBottom: 20,
    },
    scrollViewStlye: {
        // alignItems: "center",
        // justifyContent: "center",
        width: "100%",
    }
});
