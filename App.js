/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  PushNotificationIOS,
} from 'react-native';
import Eateries from './App/Eateries';
import Home from './App/Home';
import Laundry from './App/Laundry';
import FoodMenu from './App/FoodMenu';
import Room from './App/Room';
import MyMachines from './App/MyMachines';
import { StackNavigator, } from 'react-navigation';

StatusBar.setBarStyle('light-content', true);

const MyApp = StackNavigator({
  Home: {screen: Home},
  Eateries: {screen: Eateries},
  Laundry: {screen: Laundry},
  FoodMenu: {screen: FoodMenu},
  Room: {screen: Room},
  MyMachines: {screen: MyMachines},
});

export default class App extends Component<{}> {
  render() {
    return (
      <MyApp />
    );
  }

    componentWillMount(){
        PushNotificationIOS.addEventListener('register', (token) => console.log('TOKEN', token))
        PushNotificationIOS.addEventListener('notification', (notification) => console.log('Notification', notification, "APP state", AppStateIOS.currentState))
        // you could check the app state to respond differently to push notifications depending on if the app is running in the background or is currently active.
        PushNotificationIOS.requestPermissions();
    }
}
