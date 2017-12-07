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
import MachinesDisplay from './MachinesDisplay';

export default class Room extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            Washers: [],
            Dryers: [],
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
                console.error(error);
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
    				availWashers = availWashers.concat(Array(machine[0]).fill(timeRemaining + 100));
    				availDryers = availDryers.concat(Array(machine[1]).fill(timeRemaining + 100));
    			} else {
    				unavailWashers = unavailWashers.concat(Array(machine[0]).fill(timeRemaining));
    				unavailDryers = unavailDryers.concat(Array(machine[1]).fill(timeRemaining));
    			}
    		}
    	}
        this.setState({ Washers : availWashers.concat(unavailWashers)});
        this.setState({ Dryers : availDryers.concat(unavailDryers)});
    }








    render() {
        return (
            <LinearGradient colors={['#9A8478', '#1E130C']} locations={[0,0.55]} style={styles.background}>
                <ScrollView>
                <Text style={styles.label}>Washers</Text>
                <MachinesDisplay machines={this.state.Washers} />
                <Text style={styles.label}>Dryers</Text>
                <MachinesDisplay machines={this.state.Dryers} />
                </ ScrollView>
            </LinearGradient>
            // <ListView
            //         enableEmptySections
            //         horizontal
            //         dataSource={this.state.availWashers}
            //         renderRow={(data) => <View style={styles.item}>
            //                               <Image source={require('../img/available.png')} style={styles.stretch} />
            //                               <Text style={styles.label}>{data} min</Text>
            //                               </View>}
            //         />

        );
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
  item: {
      padding: 10,
  }
});
