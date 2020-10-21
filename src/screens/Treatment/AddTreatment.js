import React, { useState } from 'react';
import { Alert, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Input, Button, Icon } from "react-native-elements";
import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import Loading from  '../../components/Loading';
import TratamientoClass from '../../clasess/TratamientoClass';

export default function AddTreatment( {navigation} ) {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [show, setShow] = useState(false);

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    const onSubmit = () => {
        Alert.alert('Confirmacion nuevo tratamiento', "¿Desea agregar el tratamiento?",
        [{
            text: 'Si',
            onPress: () => {
                setIsVisible(true)
                const tratamiento = new TratamientoClass(formData.title, formData.body, formData.type, formData.startDate, formData.frequency, formData.interval, formData.endDate)
                console.log(tratamiento.objetoTratamiento())
                try{
                    tratamiento.agregarTratamiento("8VnAyXfmKwljqS0O7NY1");
                }catch(error){
                    console.log(error)
                }
                setIsVisible(false)
                navigation.navigate("treatment")
            }
        },
        {
            text: 'No',
            style: 'cancel'
        }], {cancelable: false})
    }

    const showDatepicker = () => {
        setShow(!show);
    }

    const onDateChange = (date) => {
        console.log(moment(date).format('DD/MM/YYYY').toString() + " " + moment(date).format('HH:MM').toString());
        setFormData({...formData, ["startDate"]: moment(date).format('DD/MM/YYYY').toString() + " " + moment(date).format('HH:MM').toString()})
        showDatepicker();
    }

    const obtenerTratamientos = async () => {
        const listaTratamientos = await TratamientoClass.obtenerListaTratamientos("8VnAyXfmKwljqS0O7NY1");
        listaTratamientos.forEach(doc => {
            console.log(doc);
        });
        
    }

    
    return (
        <SafeAreaView style={styles.formContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewStlye}>
                <Input
                    placeholder="Titulo Tratamiento"
                    containerStyle={styles.inputTitle}
                    onChange={(e) => onChange(e, "title")}
                    label="Titulo Tratamiento"
                />
                <Input
                    placeholder="Descripcion Tratamiento"
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChange(e, "body")}
                    label="Descripcion Tratamiento"
                    inputContainerStyle={styles.innerInput}
                />
                <Picker
                    selectedValue={formData.type}
                    style={{height: 50, width: "100%"}}
                    onValueChange={(itemValue, itemIndex) => setFormData({...formData, ["type"]: itemValue})}
                    >
                    <Picker.Item label="Medicamento" value="medicamento" />
                    <Picker.Item label="Actividad" value="actividad" />
                </Picker>
                <Input
                    value = {formData.startDate}
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChange(e, "startDate")}
                    label="Fecha inicio tratamiento"
                    inputContainerStyle={styles.innerInput}
                    disabled={true}
                    rightIcon={
                        <Icon
                        type="material-community"
                        name="calendar"
                        iconStyle={styles.iconRight}
                        onPress={showDatepicker}
                        />
                    }
                />
                <Input
                    placeholder="Frecuencia Tratamiento"
                    keyboardType='numeric'
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChange(e, "interval")}
                    label="Frecuencia Tratamiento"
                    inputContainerStyle={styles.innerInput}
                />
                <Picker
                    selectedValue={formData.frequency}
                    style={{height: 50, width: "100%"}}
                    onValueChange={(itemValue, itemIndex) => setFormData({...formData, ["frequency"]: itemValue})}
                    >
                    <Picker.Item label="Horas" value="hrs" />
                    <Picker.Item label="Días" value="dd" />
                    <Picker.Item label="Meses" value="mm" />
                </Picker>
                <Button
                    title="Añadir Tratamiento"
                    containerStyle={styles.btnContainerAdd}
                    buttonStyle={styles.btnRegister}
                    onPress={onSubmit}
                />
                <Button
                    title="Obtener Tratamientos"
                    containerStyle={styles.btnContainerAdd}
                    buttonStyle={styles.btnRegister}
                    onPress={obtenerTratamientos}
                />
                <DateTimePicker
                    isVisible = {show}
                    mode="datetime"
                    onConfirm = {onDateChange}
                    onCancel = {showDatepicker}
                    is24Hour = {true}
                >
                </DateTimePicker>
                <Loading isVisible={isVisible} text="Cargando"/>
            </ScrollView>
        </SafeAreaView>
    )
}

function defaultFormValue() {
    return {
      title: "",
      body: "",
      type: "medicamento",
      startDate: "",
      frequency: "hrs",
      interval: "",
      endDate: false
    };
  }

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginTop: -5,
        marginBottom: 20,
    },
    scrollViewStlye: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    inputTitle: {
        width: "100%",
        marginTop: 20,
    },
    inputBody: {
        width: "100%",
        marginTop: 20,
    },
    innerInput: {
        
    },
    btnContainerAdd: {
        marginTop: 20,
        width: "95%",
    },
    disabled: {
        color: "black"
    }
});