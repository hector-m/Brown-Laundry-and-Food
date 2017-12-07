import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class MachinesDisplay extends Component<{}> {

    displayMachines(machines) {
        var display = [];
        for (var i = 0; i < machines.length; i++) {
            if (machines[i] > 100) {
                display.push(
                    <View style={styles.item} key={i} >
                        <Image source={require('../img/available.png')} />
                        <Text style={styles.label}>Available</Text>
                    </View>
                );
            } else {
                display.push(
                    <View style={styles.item} key={i} >
                        <Image source={require('../img/unavailable.png')} />
                        <Text style={styles.label}>{machines[i]} min</Text>
                    </View>
                );
            }
        }
        return display
    }





    render() {
        return (
            <View style={styles.display}>
                {this.displayMachines(this.props.machines)}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    label: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10,
      color: '#BDB9B7',
      backgroundColor: 'transparent',
    },
    item: {
        padding: 10,
    },
    display: {
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    }
});
