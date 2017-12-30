import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MenuDisplay from './MenuDisplay';

export default class Menu extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            Menu: null,
            key: this.props.navigation.state.params.key,
            Error: null,
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name} Menu`,
        headerTintColor: '#BDB9B7',
        headerStyle: {
            backgroundColor: '#1E130C',
        }
    });

    componentWillMount() {
        this.setState({loading : true});
        let date = new Date()
        let month = date.getMonth();
        return fetch('http://legacy.cafebonappetit.com/api/2/menus?cafe=' + this.state.key + '&date=' + date.getFullYear() + '-' + month + '-' + date.getDate())
            .then((response) => response.json())
            .then((responseJson) => {
                this.getMenuData(responseJson);
                this.setState({loading : false, refreshing : false});
                return responseJson;
            })
            .catch((error) => {
                this.setState({ Error:
                    <Image source={require('../img/error.png')} style={styles.error}/>
                });
            });
    }

    getMenuData(json) {
        let display = [];
        dayMenu = json["days"]["0"].cafes[this.state.key].dayparts["0"];


        for (let i = 0; i < dayMenu.length; i++) {
            display.push(
                <MenuDisplay key={i} name={dayMenu[i]["label"]} items={json["items"]} food={dayMenu[i]["stations"]}/>
            );
        }
        this.setState({Menu: display});
    }




    render() {
        if (this.state.Error == null) {
            return (
                <View style={styles.background}>
                    <ScrollView>
                    {this.state.Menu}
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={styles.background}>
                    {this.state.Error}
                </View>
            );
        }

    }
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#daccb6',
  },
  error: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
});
