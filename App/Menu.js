import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Eaterie from './Eaterie';

export default class Eateries extends Component<{}> {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name} Menu`,
        headerTintColor: '#BDB9B7',
        headerStyle: {
            backgroundColor: '#1E130C',
        }
    });

    // componentDidMount() {
    //     let key = this.props.navigation.state.params.key;
    //     this.setState({loading : true});
    //     return fetch('https://api.students.brown.edu/laundry/rooms/'+ key +'/machines?get_status=true&client_id=8c6cde9c-9053-4e91-886a-bfe3efb3d340')
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({loading : false, refreshing : false});
    //             return responseJson;
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    render() {
        return (
            <LinearGradient colors={['#9A8478', '#1E130C']} locations={[0,0.55]} style={styles.background}>

            </LinearGradient>
        );
    }
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
  },
  row: {
      height: 201,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',

  },
  borders: {
      borderTopWidth: 1,
      borderTopColor: '#95989A',
      borderBottomWidth: 1,
      borderBottomColor: '#95989A'
  }
});
