import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  FlatList,
  PushNotificationIOS,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SearchBar } from "react-native-elements";
import LaundrySign from './LaundrySign';


export default class Laundry extends Component<{}> {

    constructor(props) {
    super(props);
    var rooms = {"111 BROWN ST RM106": 1429213, "125-127 WATERMAN STREET RM003": 1429265,"315 THAYER ST": 1429240, "ANDREWS E RM154": 14292350, "ANDREWS W RM160": 1429250, "ARCHIBALD-BRONSON RMA103": 1429212, "BARBOUR APTS RM070": 1429231, "BUXTON HOUSE RM008": 1429215,  "CASWELL MIDDLE RM000": 1429216,  "CASWELL NORTH RM010B": 1429253, "CHAMPLIN RM110A": 1429217, "CHAPIN HOUSE RM023": 1429218, "DIMAN HOUSE RM028": 142927, "DIMAN HOUSE RM106": 1429249, "EVERETT-POLAND RM243": 1429251, "EVERETT-POLAND RM166": 1429267, "GOODARD HOUSE RM018": 142928, "GOODARD HOUSE RM130": 142922, "GRAD CENTER A RM120": 1429221, "GRAD CENTER B RM113": 1429222, "GRAD CENTER C RM120": 1429220, "GRAD CENTER D RM130": 1429223, "HARKNESS HOUSE RM023": 142929,"HARKNESS HOUSE RM106": 1429245,"HEDGEMAN D RM009A": 1429224,"HOPE COLLEGE RM015": 1429225, "JAMISON-MEAD RMJ055": 1429246, "KING HOUSE RM007": 1429226, "LITTLEFIELD HALL RM011": 1429227,  "MACHADO HOUSE RM209": 1429237, "MARCY HOUSE RM028": 1429210, "METCALF HALL": 1429229, "MILLER HALL": 1429230, "MINDEN HALL RM102": 1429257,  "MORRISS RM211A": 1429254, "MORRISS RM311A": 1429255, "MORRISS RM411A": 1429256, "NPEMBROKE 2 RM000": 1429232, "NPEMBROKE 3 RM000": 1429233, "NPEMBROKE 3 RM020": 1429252,"NPEMBROKE 4 RM117": 1429234, "OLNEY HOUSE RM024": 1429211, "PERKINS RM020": 1429235,  "PLANTATIONS HOUSE RM108": 1429236, "SEARS HOUSE RM023": 1429238, "SEARS HOUSE RM106": 1429263, "SLATER HALL RM008": "1429239","VGQA RM001": 1429247, "VGQA RM007": 1429288, "WAYLAND HOUSE RM023": 1429241, "WEST HOUSE RM100B": 1429214,  "WOOLLEY RM101A": 1429219, "WOOLLEY RM201A": 1429258, "WOOLLEY RM301A": 1429259, "WOOLLEY RM401A": 1429260,"YO10 RM142": 1429242, "YO2 RM142": 1429243,"YO4 RM142": 1429244}
    this.state = {
      dataSource: Object.keys(rooms),
      search: '',
      rooms: rooms,
    };
  }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        const { navigate } = navigation;
        return {
            title: 'Laundry Rooms',
            headerTintColor: '#BDB9B7',
            headerStyle: {
                backgroundColor: '#1E130C',
            },
            headerBackTitle: 'Rooms',
            headerRight : <TouchableOpacity onPress={() => navigate('MyMachines')}><LaundrySign /></TouchableOpacity>,
        }
    };

    textChange(event) {
        var rooms = ["111 BROWN ST RM106": "1429213", "125-127 WATERMAN STREET RM003": "1429265","315 THAYER ST": "1429240", "ANDREWS E RM154": "14292350", "ANDREWS W RM160": "1429250", "ARCHIBALD-BRONSON RMA103": "1429212", "BARBOUR APTS RM070": "1429231", "BUXTON HOUSE RM008": "1429215",  "CASWELL MIDDLE RM000": "1429216",  "CASWELL NORTH RM010B": "1429253", "CHAMPLIN RM110A": "1429217", "CHAPIN HOUSE RM023": "1429218", "DIMAN HOUSE RM028": "142927", "DIMAN HOUSE RM106": "1429249", "EVERETT-POLAND RM243": "1429251", "EVERETT-POLAND RM166": "1429267", "GOODARD HOUSE RM018": "142928", "GOODARD HOUSE RM130": "142922", "GRAD CENTER A RM120": "1429221", "GRAD CENTER B RM113": "1429222", "GRAD CENTER C RM120": "1429220", "GRAD CENTER D RM130": "1429223", "HARKNESS HOUSE RM023": "142929","HARKNESS HOUSE RM106": "1429245","HEDGEMAN D RM009A": "1429224","HOPE COLLEGE RM015": "1429225", "JAMISON-MEAD RMJ055": "1429246", "KING HOUSE RM007": "1429226", "LITTLEFIELD HALL RM011": "1429227",  "MACHADO HOUSE RM209": "1429237", "MARCY HOUSE RM028": "1429210", "METCALF HALL": "1429229", "MILLER HALL": "1429230", "MINDEN HALL RM102": "1429257",  "MORRISS RM211A": "1429254", "MORRISS RM311A": "1429255", "MORRISS RM411A": "1429256", "NPEMBROKE 2 RM000": "1429232", "NPEMBROKE 3 RM000": "1429233", "NPEMBROKE 3 RM020": "1429252","NPEMBROKE 4 RM117": "1429234", "OLNEY HOUSE RM024": "1429211", "PERKINS RM020": "1429235",  "PLANTATIONS HOUSE RM108": "1429236", "SEARS HOUSE RM023": "1429238", "SEARS HOUSE RM106": "1429263", "SLATER HALL RM008": "1429239","VGQA RM001": "1429247", "VGQA RM007": "1429288", "WAYLAND HOUSE RM023": "1429241", "WEST HOUSE RM100B": "1429214",  "WOOLLEY RM101A": "1429219", "WOOLLEY RM201A": "1429258", "WOOLLEY RM301A": "1429259", "WOOLLEY RM401A": "1429260","YO10 RM142": "1429242", "YO2 RM142": "1429243","YO4 RM142": "1429244"];
        let filteredData = rooms.filter(room => room.includes(event.toUpperCase()));
        this.setState({search: event, dataSource: filteredData});
    }

    clearText() {
        this.setState({search: '', dataSource: Object.keys(this.state.rooms)});
    }

  render() {
      const { navigate } = this.props.navigation;
    return (
      <LinearGradient colors={['#9A8478', '#1E130C']} locations={[0,0.55]} style={styles.background}>
        <FlatList
            data={this.state.dataSource}
            renderItem={ ({item}) => <TouchableOpacity onPress={() => navigate('Room',{name: item, key: this.state.rooms[item]})}><View><Text style={styles.label}>{item}</Text></View></TouchableOpacity>}
            keyExtractor={ (item, index) => index}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            ListHeaderComponent={
                            <SearchBar
                                containerStyle={styles.container}
                                inputStyle={styles.input}
                                placeholderTextColor={'#8E8E93'}
                                round
                                icon={{color: '#8E8E93'}}
                                clearIcon={{padding: 10, color: '#8E8E93'}}
                                onChangeText={this.textChange.bind(this)}
                                onClearText={this.clearText.bind(this)}
                                placeholder='Search Room...' />
                          }
        />
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
  label: {
    fontSize: 17,
    marginVertical: 12,
    marginLeft: 15,
    color: '#BDB9B7',
    backgroundColor: 'transparent',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#8E8E8E',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E130C',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  input: {
    height: 30,
    flex: 1,
    color: '#BDB9B7',
    fontSize: 15,
    backgroundColor: '#2E241F',
  },
});
