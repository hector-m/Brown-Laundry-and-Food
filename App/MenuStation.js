import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class MenuStation extends Component<{}> {
    constructor(props) {
        super(props);
    }


    makeStation() {
        let foodCodes = this.props.station["items"];
        let foods = [];
        for (let i=0; i < foodCodes.length; i++) {
            let code = foodCodes[i];
            if (this.props.items[code]["special"] === 1) {
                foods.push(
                    <Text key={i} style={styles.label}>
                        {this.props.items[code]["label"]}
                    </Text>

                );
            }
        }
        if (foods.length !== 0) {
            return (
                <View style={{}}>
                <Text style={styles.Sectionlabel}>{this.props.station["label"].toUpperCase()}</Text>
                {foods}
                </View>
            );
        }

    }


    render() {
        return (
            <View>
                {this.makeStation()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    Sectionlabel: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10,
      color: '#231f20',
      backgroundColor: 'transparent',
      alignSelf: "stretch",
    },
    label: {
      fontSize: 14,
      marginTop: 10,
      marginBottom: 10,
      color: '#231f20',
    },
});
