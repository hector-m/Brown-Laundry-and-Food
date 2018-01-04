import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushHandler extends Component {

    componentDidMount() {
        //console.log('mounted')
        PushNotification.configure({
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
            },
        });
    }


    render() {
        return null;
    }



}
