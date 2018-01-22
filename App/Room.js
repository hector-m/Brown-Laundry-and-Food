import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MachinesDisplay from './MachinesDisplay';

export default class Room extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            Washers: [],
            Dryers: [],
            Error: null,
        };
    }



    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}`,
        headerTintColor: '#BDB9B7',
        headerStyle: {
            backgroundColor: '#1E130C',
        }
    });

    componentWillMount() {
        let key = this.props.navigation.state.params.key;
        this.setState({loading : true});
        return fetch('https://api.students.brown.edu/laundry/rooms/'+ key +'/machines?get_status=true&client_id=8c6cde9c-9053-4e91-886a-bfe3efb3d340')
            .then((response) => response.json())
            .then((responseJson) => {
                this.getRoomData(responseJson);
                this.setState({loading : false, refreshing : false});
                return responseJson;
            })
            .catch((error) => {
                this.setState({ Error:
                    <Image source={require('../img/error.png')} style={styles.error}/>
                });
                this.setState({loading : false, refreshing : false});
            });
    }

    getRoomData(json) {
    	var availWashers = [];	// available washers
    	var unavailWashers = [];	// unavailabe washers
    	var availDryers = [];	// available dryers
    	var unavailDryers = [];	// unavailable dryers
        var validMachines = {"washNdry": [1, 1], "dry": [0, 1], "dblDry": [0, 2], "washFL": [1, 0]};
    	for (var i = 0; i < json["results"].length; i++) {
    		var machineType = json["results"][i]["type"];
    		if (Object.keys(validMachines).indexOf(machineType) != -1) {	// if machine was washer or dryer
    			var machine = validMachines[machineType];
    			var timeRemaining = json["results"][i]["time_remaining"];
    			if (json["results"][i]["avail"]) {	// if machine not in use
    				availWashers = availWashers.concat(Array(machine[0]).fill({ time: timeRemaining + 100, id: json["results"][i]["id"]}));
    				availDryers = availDryers.concat(Array(machine[1]).fill({ time: timeRemaining + 100, id: json["results"][i]["id"]}));

    			} else {
    				unavailWashers = unavailWashers.concat(Array(machine[0]).fill({ time: timeRemaining, id: json["results"][i]["id"]}));
    				unavailDryers = unavailDryers.concat(Array(machine[1]).fill({ time: timeRemaining, id: json["results"][i]["id"]}));
    			}
    		}
    	}
        this.setState({ Washers : availWashers.concat(unavailWashers)});
        this.setState({ Dryers : availDryers.concat(unavailDryers)});
    }


    _onRefresh() {
        let key = this.props.navigation.state.params.key;
        this.setState({loading : true});
        return fetch('https://api.students.brown.edu/laundry/rooms/'+ key +'/machines?get_status=true&client_id=8c6cde9c-9053-4e91-886a-bfe3efb3d340')
            .then((response) => response.json())
            .then((responseJson) => {
                this.getRoomData(responseJson);
                this.setState({loading : false, refreshing : false});
                return responseJson;
            })
            .catch((error) => {
                this.setState({ Error:
                    <Image source={require('../img/error.png')} style={styles.error}/>
                });
                this.setState({loading : false, refreshing : false});
            });
    }





    render() {

        if (this.state.loading) {
          return (
            <LinearGradient colors={['#9A8478', '#1E130C']} locations={[0,0.55]} style={styles.background}>
                <ActivityIndicator size="large" color="#9A8478"/>
            </LinearGradient>
          );
        }

        if (this.state.Error == null) {
            return (
                <LinearGradient colors={['#9A8478', '#1E130C']} locations={[0,0.55]} style={styles.background}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.loading}
                                onRefresh={this._onRefresh.bind(this)}
                            />}
                    >
                        <Text style={styles.notify}>*click on your running machine to set notification</Text>

                        <Text style={styles.label}>Washers</Text>
                        <MachinesDisplay type={"washer"} room={this.props.navigation.state.params.name} machines={this.state.Washers} />
                        <Text style={styles.label}>Dryers</Text>
                        <MachinesDisplay type={"dryer"} room={this.props.navigation.state.params.name} machines={this.state.Dryers} />
                    </ ScrollView>
                </LinearGradient>
            );
        } else {
            return (
                <ScrollView
                    contentContainerStyle={styles.background}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this._onRefresh.bind(this)}
                        />}
                >
                    <LinearGradient colors={['#9A8478', '#1E130C']} locations={[0,0.55]} style={styles.background}>
                        {this.state.Error}
                    </LinearGradient>
                </ ScrollView>
            );
        }

    }
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    },
  borders: {
      borderTopWidth: 1,
      borderTopColor: '#95989A',
      borderBottomWidth: 1,
      borderBottomColor: '#95989A'
  },
  label: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#BDB9B7',
    backgroundColor: 'transparent',
  },
  notify: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#1E130C',
    backgroundColor: 'transparent',
  },
  item: {
      padding: 10,
  },
  error: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
});
