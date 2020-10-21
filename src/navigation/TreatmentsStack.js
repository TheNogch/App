import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Treatment from '../screens/Treatment/Treatment';
import AddTreatment from '../screens/Treatment/AddTreatment';

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
        </Stack.Navigator>
    )
}
