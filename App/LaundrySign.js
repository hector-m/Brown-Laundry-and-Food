import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Text,
  PushNotificationIOS,
  TouchableOpacity
} from 'react-native';
import IconBadge from 'react-native-icon-badge';

export default class LaundrySign extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            notifications: 0,
            unseen: ""
        };
    }

    static oldValue = 0;
    static newValue = 0;
    static _interval;

    componentDidMount() {
        this._interval = setInterval(() => {
            this.setState(() => {
                PushNotificationIOS.getScheduledLocalNotifications( (test) => this.newValue = test.length);
                return { unseen: "does not display"}
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    shouldComponentUpdate() {
        const differentNotes = this.state.notifications !== this.newValue;
        return differentNotes;
    }

    componentDidUpdate() {
        if (this.newValue < 10) {
            this.setState({notifications: this.newValue});
        }
    }


    render() {
        if (this.state.notifications > 0) {
            return (
                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center', marginRight: 15}}>
                    <IconBadge
                        MainElement={
                            <Image style={styles.icon} source={require('../img/available.png')} />
                        }
                        BadgeElement={
                            <Text style={styles.text}>{this.state.notifications}</Text>
                        }
                        IconBadgeStyle={
                            {
                            marginTop: -10,
                            width:20,
                            height:20,
                            backgroundColor: 'red'}
                        }
                        Hidden={this.state.BadgeCount==0}
                    />
                </View>
            );
        } else {
            return (
                    <Image style={[styles.icon,{ marginRight: 25}]} source={require('../img/available.png')} />
            )
        }

    }
}


const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10
    }
});
