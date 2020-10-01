import * as Permissions from 'expo-permissions';
import * as Notifications from  'expo-notifications';
// Version 0.5 "estable", envio de notificaciones por medio de la app misma sin pruebas( a la espera del componente sentinel
// para inicio de pruebas junto a la " alarma de fuga")
// en android solo revibe notificaciones si la app "ExpoClient" con el proyecto montado esta en segundo plano
// Confirma permisos de notificaciones y los pide de ser necesario
// recive notificaciones mediante expo notifications tools
// https://expo.io/notifications

async function registerForPushNotificationsAsync(){
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalstatus = status;

    if (status !== 'granted'){
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalstatus = status;
    }
    if (finalstatus !== 'granted'){
        return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    console.log(status, token);

    return token;
}

export default function Notifier(){
   token = registerForPushNotificationsAsync();
}

// importar siguiente libreria para hacer uso de notificaciones
//import Notifier from './src/Notifier';
export function SendNotification(token,titleNotification,bodyNotification,soundNotification,priorityNotification){
    const request = {
        to: token, // ExpoPushToken
        //data?: ,// JSON object 
        title: titleNotification, //string
        body: bodyNotification, //string
        sound: soundNotification, //'default', // null,
        //ttl?: , //number, try again cada ttl? segundos
        //expiration?: ,//number, tiempo en segundos para expirar
        priority: priorityNotification,// 'default' | 'normal | 'high',
        //badge?: , //number,
    }
}
