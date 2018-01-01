import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import MenuStation from './MenuStation';

export default class MenuDisplay extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            start: this.props.start,
            end: this.props.end,
            Error: null,
        }
        this.state.start = Moment(this.state.start, ["HH:mm"]).format("hh:mm A");
        this.state.end = Moment(this.state.end, ["HH:mm"]).format("hh:mm A");
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
                    <View style={styles.labelBox}>
                        <Text style={styles.label}>{this.props.name.toUpperCase()} SPECIALS</Text>
                        <Text style={styles.time}> {this.state.start} - {this.state.end} </Text>
                    </View>

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
      color: '#231f20',
    },
    time: {
      fontSize: 14,
      textAlign: 'center',
      color: '#231f20',
    },
    labelBox : {
        marginTop: 15,
        borderWidth: 1,
    },
    display: {
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 10
    }
});
