import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Eaterie from './Eaterie';

export default class Eateries extends Component<{}> {

    static navigationOptions = {
        title: 'Eateries',
        headerTintColor: '#BDB9B7',
        headerStyle: {
            backgroundColor: '#1E130C',
        }
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <LinearGradient colors={['#9A8478', '#1E130C']} locations={[0,0.55]} style={styles.background}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigate('Menu',{name: 'Ratty', key: '1531'})} style={styles.section}>
                        <Eaterie name={'Ratty'} />
                    </TouchableOpacity>

                    <View style={{borderLeftColor: '#95989A',borderLeftWidth: 1,height: 140,alignSelf: 'center',}}></View>

                    <TouchableOpacity onPress={() => navigate('Menu',{name: 'V-Dub', key: '1532'})} style={styles.section}>
                        <Eaterie  style={styles.dash} name={'V-Dub'} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.row,styles.borders]}>
                    <TouchableOpacity onPress={() => navigate('Menu',{name: "Andrew's Common", key: '1533'})} style={styles.section}>
                        <Eaterie name={"Andrew's Common"} />
                    </TouchableOpacity>

                    <View style={{borderLeftColor: '#95989A', borderLeftWidth: 1,height: 140, alignSelf: 'center',}}></View>

                    <TouchableOpacity onPress={() => navigate('Menu',{name: "Joe's", key: '1535'})} style={styles.section}>
                        <Eaterie style={styles.dash} name={"Joe's"} />
                    </TouchableOpacity>
                </View>


                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigate('Menu',{name: 'Blue Room', key: '1534'})} style={styles.section}>
                        <Eaterie name={'Blue Room'} />
                    </TouchableOpacity>

                    <View style={{borderLeftColor: '#95989A',borderLeftWidth: 1,height: 140,alignSelf: 'center',}}></View>

                    <TouchableOpacity onPress={() => navigate('Menu', {name: 'Ivy Room', key: '1536'})} style={styles.section}>
                        <Eaterie name={'Ivy Room'} />
                    </TouchableOpacity>
                </View>
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
  },
  section: {
      flex: 1
  }

});
