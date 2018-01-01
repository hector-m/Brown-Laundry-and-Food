import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropdownMenu from 'react-native-dropdown-menu';
import MenuDisplay from './MenuDisplay';

export default class Menu extends Component<{}> {
    constructor(props) {
        super(props);
        let day = new Date();
        this.state = {
            Menu: null,
            key: this.props.navigation.state.params.key,
            Error: null,
            loading : true,
            date: day,
            dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"],
        }
        this.refreshData = this.refreshData.bind(this);
    }


    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name} Menu`,
        headerTintColor: '#BDB9B7',
        headerStyle: {
            backgroundColor: '#1E130C',
        },
    });


    componentWillMount() {
        this.setState({loading : true});
        let month = this.state.date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let day = this.state.date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return fetch('http://legacy.cafebonappetit.com/api/2/menus?cafe=' + this.state.key + '&date=' + this.state.date.getFullYear() + '-' + month + '-' + day)
            .then((response) => response.json())
            .then((responseJson) => {
                this.getMenuData(responseJson);
                this.setState({loading : false, refreshing : false});
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
                this.setState({ Error:
                    <Image source={require('../img/error.png')} style={styles.error}/>
                , loading : false, refreshing : false});
            });
    }

    getMenuData(json) {
        let display = [];
        dayMenu = json["days"]["0"].cafes[this.state.key].dayparts["0"];

        for (let i = 0; i < dayMenu.length; i++) {
            display.push(
                <MenuDisplay key={i} name={dayMenu[i]["label"]} items={json["items"]} food={dayMenu[i]["stations"]} start={dayMenu[i]["starttime"]} end={dayMenu[i]["endtime"]}/>
            );
        }

        if (dayMenu.length == 0) {
            display.push(
                <View key={0}>
                    <Text style={styles.closed}>{this.props.navigation.state.params.name} is Unnavailable Today</Text>
                </View>
            );
        }

        this.setState({Menu: display});
    }

    refreshData(alphaday) {
        this.setState({loading : true});
        let month = this.state.date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let day = this.state.date.getDate() + alphaday;
        if (day < 10) {
            day = '0' + day;
        }
        console.log(alphaday);
        return fetch('http://legacy.cafebonappetit.com/api/2/menus?cafe=' + this.state.key + '&date=' + this.state.date.getFullYear() + '-' + month + '-' + day)
            .then((response) => response.json())
            .then((responseJson) => {
                this.getMenuData(responseJson);
                this.setState({loading : false, refreshing : false});
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
                this.setState({ Error:
                    <Image source={require('../img/error.png')} style={styles.error}/>
                , loading : false, refreshing : false});
            });
    }




    render() {
        if (this.state.loading) {
          return (
            <View style={styles.background}>
              <ActivityIndicator size="large" color="#231f20"/>
            </View>
          );
        }
        if (this.state.Error == null) {
            var twoDays = new Date();
            var threeDays = new Date();
            twoDays.setDate(twoDays.getDate() + 2);
            threeDays.setDate(threeDays.getDate() + 3);
            let data = [["Today","Tomorrow", this.state.dayOfWeek[twoDays.getDay()], this.state.dayOfWeek[threeDays.getDay()]]];
            return (
                <View style={styles.background}>
                <DropdownMenu style={{flex: 1,}}
                                  bgColor={"#1E130C"}
                                  tintColor={"#BDB9B7"}
                                  selectItemColor={"red"}
                                  data={data}
                                  maxHeight={410}
                                  handler={(selection, row) => this.refreshData(row)} >
                  <ScrollView>
                  {this.state.Menu}
                  </ScrollView>
                </DropdownMenu>
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
  closed: {
      fontSize: 20,
      textAlign: 'center',
      color: 'red',
      backgroundColor: 'transparent',
      marginTop: 20,
  }
});
