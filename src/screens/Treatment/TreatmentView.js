import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { Input, Button, Icon } from "react-native-elements";
import {Picker} from '@react-native-community/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import TratamientoClass from '../../clasess/TratamientoClass';

export default function TreatmentView( { route, navigation } ) {
    const { tratamiento } = route.params;
    const [formData, setFormData] = useState(tratamiento);
    const [show, setShow] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    const showDatepicker = () => {
        setShow(!show);
    }

    const onDateChange = (date) => {
        console.log(moment(date).format('DD/MM/YYYY').toString() + " " + moment(date).format('HH:MM').toString());
        setFormData({...formData, ["fechaInicio"]: moment(date).format('DD/MM/YYYY').toString() + " " + moment(date).format('HH:MM').toString()})
        showDatepicker();
    }

    const onPressDelete = () => {
        const tratamientoConID = new TratamientoClass(formData.titulo, formData.descripcion, formData.tipo, formData.fechaInicio, formData.frecuencia, formData.intervalo, formData.fechaFin, formData.id);
        tratamientoConID.eliminarTratamiento("8VnAyXfmKwljqS0O7NY1");
        navigation.navigate("treatment");
    }

    const onPressUpdate = () => {
        const tratamientoConID = new TratamientoClass(formData.titulo, formData.descripcion, formData.tipo, formData.fechaInicio, formData.frecuencia, formData.intervalo, formData.fechaFin, formData.id);
        tratamientoConID.modificarTratamiento("8VnAyXfmKwljqS0O7NY1");
        navigation.navigate("treatment");
    }
    

    return (
        <SafeAreaView style={styles.formContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewStlye}>
                <Input
                    value={formData.titulo}
                    containerStyle={styles.inputTitle}
                    onChange={(e) => onChange(e, "titulo")}
                    label="Titulo Tratamiento"
                />
                <Input
                    value={formData.descripcion}
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChange(e, "descripcion")}
                    label="Descripcion Tratamiento"
                    inputContainerStyle={styles.innerInput}
                />
                <Picker
                    selectedValue={formData.tipo}
                    style={{height: 50, width: "100%"}}
                    onValueChange={(itemValue, itemIndex) => setFormData({...formData, ["tipo"]: itemValue})}
                    >
                    <Picker.Item label="Medicamento" value="medicamento" />
                    <Picker.Item label="Actividad" value="actividad" />
                </Picker>
                <Input
                    value = {formData.fechaInicio}
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChange(e, "fechaInicio")}
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
                    value={formData.intervalo}
                    keyboardType='numeric'
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChange(e, "intervalo")}
                    label="Frecuencia Tratamiento"
                    inputContainerStyle={styles.innerInput}
                />
                <Picker
                    selectedValue={formData.frecuencia}
                    style={{height: 50, width: "100%"}}
                    onValueChange={(itemValue, itemIndex) => setFormData({...formData, ["frecuencia"]: itemValue})}
                    >
                    <Picker.Item label="Horas" value="hrs" />
                    <Picker.Item label="Días" value="dd" />
                    <Picker.Item label="Meses" value="mm" />
                </Picker>
                <Button
                    title="Modificar"
                    containerStyle={styles.btnContainerAdd}
                    buttonStyle={styles.btnRegister}
                    onPress={onPressUpdate}
                />
                <Button
                    title="Eliminar"
                    containerStyle={styles.btnContainerAdd}
                    buttonStyle={styles.btnRegister}
                    onPress={onPressDelete}
                />
                <DateTimePicker
                    isVisible = {show}
                    mode="datetime"
                    onConfirm = {onDateChange}
                    onCancel = {showDatepicker}
                    is24Hour = {true}
                ></DateTimePicker>
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
    btnRegister: {
        color: "red"
    },
    disabled: {
        color: "black"
    }
})