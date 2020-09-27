import React from 'react';
import { YellowBox } from 'react-native';
import Logged from "./src/navigation/Account/Logged";
import { firebaseApp } from './src/utils/firebase';

import {decode, encode} from 'base-64';

YellowBox.ignoreWarnings(["Setting a timer"]);

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

setInterval(function(){ console.log("Hello"); }, 3000);
setInterval(function(){ console.log("Bye"); }, 1000);

export default function App() {
  return <Logged />;
}
