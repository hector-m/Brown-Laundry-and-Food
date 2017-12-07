import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Eaterie extends Component<{}> {


    render() {
        var icon;
        var style;
        if (this.props.name === 'Ratty') {
            this.icon = require('../img/rat.png');
            this.style = {
                marginTop: 16.5,
                marginBottom: 16.5,
            }
        } else if (this.props.name === 'V-Dub'){
            this.icon = require('../img/waffler.png');
        } else if (this.props.name === "Andrew's Common"){
            this.icon = require('../img/pizza.png');
        } else if (this.props.name === "Joe's"){
            this.icon = require('../img/burger.png');
            this.style = {
                marginTop: 1.5,
                marginBottom: 1.5,
            }
        } else if (this.props.name === 'Blue Room'){
            this.icon = require('../img/cupcake.png');
            this.style = {
                marginTop: 6,
                marginBottom: 6,
            }
        } else if (this.props.name === 'Ivy Room'){
            this.icon = require('../img/blender.png');
        } else {
            this.icon = require('../img/spoon.png');
        }

        return (
                <View style={styles.section}>
                    <Image source={this.icon} style={[styles.image, this.style]}/>
                    <Text style={styles.label}>{this.props.name}</Text>
                </View>
        );
    }
}


const styles = StyleSheet.create({
  label: {
    fontSize: 17,
    textAlign: 'center',
    color: '#BDB9B7',
    backgroundColor: 'transparent',
  },
  image: {
      alignSelf: 'center',
  },
  section: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
  }
});
