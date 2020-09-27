import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import HomeStack from './HomeStack';
import LocationStack from './LocationStack';
import TreatmentsStack from './TreatmentsStack';
import AccountStack from './AccountStack';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const Tab = createBottomTabNavigator();
// const LOCATION_TASK_NAME = 'background-location-task';

export default function Navigation() {

    // BackgroundLocation();

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="home"
                screenOptions={({route}) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                })}
            >
                <Tab.Screen 
                    name="home"
                    component={HomeStack}
                    options={{title: "Pagina Principal"}}
                />
                <Tab.Screen 
                    name="location"
                    component={LocationStack}
                    options={{title: "Ubicaciones"}}
                />
                <Tab.Screen 
                    name="treatments"
                    component={TreatmentsStack}
                    options={{title: "Tratamientos"}}
                />
                <Tab.Screen 
                    name="account"
                    component={AccountStack}
                    options={{title: "Cuenta"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
//     if (error) {
//       console.log("Error")
//       return;
//     }
//     if (data) {
//       const { locations } = data; 
//       console.log("Locations", locations);
      
//       // do something with the locations captured in the background
//     }
//   });

// async function BackgroundLocation(){
//     const { status } = await Location.requestPermissionsAsync();
//     if (status === 'granted') {
//       await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//         accuracy: Location.Accuracy.Balanced,
//         timeInterval: 2500,
//         distanceInterval: 5,
//         showsBackgroundLocationIndicator: false,
//         foregroundService: {
//           notificationTitle: "Ubicacion Test",
//           notificationBody: "Estamos usando algo xd nice :)"
//         }
//       });
//     }
// }

function screenOptions(route, color){
    let iconName;

    switch (route.name) {
        case "home":
            iconName = "home";
            break;
        case "location":
            iconName = "map-marker";
            break;
        case "treatments":
            iconName = "hospital-box";
            break;
        case "account":
            iconName = "account";
            break;
        default:
            break;
    }
    return (
        <Icon type="material-community" name={iconName} size={22} color={color} />
    )

}