import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  PushNotificationIOS
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from 'react-native-push-notification';
import Laundry from './Laundry';

export default class MachinesDisplay extends Component<{}> {

    displayMachines(machines) {
        var display = [];
        for (var i = 0; i < machines.length; i++) {
            if (machines[i]["time"] > 100) {
                display.push(
                    <View style={styles.item} key={i} >
                        <Image source={require('../img/available.png')} />
                        <Text style={styles.label}>Available</Text>
                    </View>
                );
            } else if (machines[i]["time"] != 0) {
                display.push(
                        this.displayUnavailable(machines, i)
                );
            }
        }
        return display
    }

    displayUnavailable(machines, i) {
        return (
            <View key={i} style={styles.item}>
                <TouchableOpacity onPress={() => this.handleNotification(machines[i])}>
                    <Image source={require('../img/unavailable.png')} />
                    <Text style={styles.label}>{machines[i]["time"]} min</Text>
                </TouchableOpacity>
            </View>
        );
    }

    handleNotification(machine) {
        now = new Date(Date.now()).toString();
        PushNotification.localNotificationSchedule({
          message: "Your " + this.props.type + " in " + this.props.room + " is done",
          date: new Date(Date.now() + (machine["time"] * 60 * 1000)),
          userInfo: {id: now, type: this.props.type, room: this.props.room},
        });
        Alert.alert(
            this.props.type.charAt(0).toUpperCase() + this.props.type.substring(1) + ' Reminder Being Set',
            'Would you like a reminder for your ' + this.props.type + ' when it finishes?',
            [
                {text: 'OK'},
                {text: 'Cancel', onPress: () => {PushNotification.cancelLocalNotifications({id: now });}, style: 'cancel'},
            ],
            { cancelable: true }
            )
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
