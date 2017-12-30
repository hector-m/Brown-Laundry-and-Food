import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MenuStation from './MenuStation';

export default class MenuDisplay extends Component<{}> {
    constructor(props) {
        super(props);
    }


    makeSection() {
        let food = this.props.food;
        let display = [];
        for (let i = 0; i < food.length; i++) {
            let station = food[i];
            display.push (
                <MenuStation key={i} station={station} items={this.props.items} />
            );
        }
        if (food.length === 0) {

        } else {
            return (
                <View>
                <Text style={styles.label}>{this.props.name.toUpperCase()} SPECIALS</Text>
                {display}
                </View>
            );
        }

    }


    render() {
        return (
            <View style={styles.display}>
                {this.makeSection()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    label: {
      fontSize: 28,
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 10,
      color: '#231f20',
      borderWidth: 1,
    },
    display: {
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'column',

    }
});
