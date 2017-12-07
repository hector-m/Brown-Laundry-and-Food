import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
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
        backgroundColor: '#9A8478',
          shadowColor: 'transparent',
          elevation:0,
          borderBottomWidth: 0

      }
  });
  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient colors={['#9A8478', '#1E130C']} locations={[0,0.55]} style={styles.background}>
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
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
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
