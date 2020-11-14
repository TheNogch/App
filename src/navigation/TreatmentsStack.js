import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Treatment from '../screens/Treatment/Treatment';
import AddTreatment from '../screens/Treatment/AddTreatment';
import TreatmentList from '../screens/Treatment/TreatmentList';
import TreatmentView from '../screens/Treatment/TreatmentView';

const Stack = createStackNavigator();

export default function TreatmentsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="treatment"
                component={Treatment}
                options={{ title: "Tratamientos" }}
            />
            <Stack.Screen 
                name="addTreatment"
                component={AddTreatment}
                options={{ title: "Añadir Tratamiento" }}
            />
            <Stack.Screen 
                name="treatmentList"
                component={TreatmentList}
                options={{ title: "Lista de Tratamientos" }}
            />
            <Stack.Screen 
                name="treatmentView"
                component={TreatmentView}
                options={{ title: "Vista de Tratamietno" }}
            />
        </Stack.Navigator>
    )
}
