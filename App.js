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
} from 'react-native';
import Eateries from './App/Eateries';
import Home from './App/Home';
import Laundry from './App/Laundry';
import Menu from './App/Menu';
import Room from './App/Room';
import { StackNavigator, } from 'react-navigation';

StatusBar.setBarStyle('light-content', true);

const MyApp = StackNavigator({
  Home: {screen: Home},
  Eateries: {screen: Eateries},
  Laundry: {screen: Laundry},
  Menu: {screen: Menu},
  Room: {screen: Room},
});

export default class App extends Component<{}> {
  render() {
    return (
      <MyApp />
    );
  }
}
