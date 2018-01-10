import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PushNotificationIOS,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Home extends Component<{}> {
    static navigationOptions = {
    title: 'Home',
    header: null,

    };
  static navigationOptions = ({ navigation }) => ({
      //headerTintColor: '#BDB9B7',
      headerStyle: {
        backgroundColor: '#1E130C',
          shadowColor: 'transparent',
          elevation:0,
          borderBottomWidth: 0

      },
      headerBackTitle: 'Home'
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient colors={['#1E130C', '#1E130C']} locations={[.5,1]} style={styles.background}>
        <TouchableOpacity onPress={() => navigate('Eateries')}>
            <View style={styles.box}>
                <Image source={require('../img/spoon.png')} style={styles.stretch}/>
                <Text style={styles.label}>
                Eateries
                </Text>
            </View>
        </TouchableOpacity>

        <View style={{
           borderBottomColor: '#95989A',
           borderBottomWidth: 1,}}>
        </View>

        <TouchableOpacity onPress={() => navigate('Laundry')}>
            <View style={styles.box}>
                <Image source={require('../img/laundry.png')} style={styles.stretch}/>
                <Text style={styles.label}>
                Laundry
                </Text>
            </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
    paddingBottom: 50,
  },
  label: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 30,
    color: '#BDB9B7',
    backgroundColor: 'transparent',
  },
  stretch: {
      alignSelf: 'center',
  },
  box: {

  },
});
