import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import PushNotification from 'react-native-push-notification';

export default class MyMachines extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            machines: this.props.machines,
        };
    }

    componentDidMount() {
        this.setState({loading: false});

    }

    _findTimeDiff(currentTime, alarmTime) {
        var diff = Math.abs(new Date(alarmTime) - currentTime);
        var minutes = Math.ceil((diff/1000)/60);
        return minutes.toString();
    }

    _deleteNote(data, rowMap) {
        let noteId = data.item["userInfo"]["id"]
        PushNotification.cancelLocalNotifications({id: noteId });
        rowMap[data.index].closeRow();

        const newData = [...this.state.machines];
		newData.splice(data.index, 1);
		this.setState({machines: newData});
    }



    render() {
        let now = new Date(Date.now());
        return (
            <SwipeListView
						useFlatList
						data={this.state.machines}
						renderItem={ (data, rowMap) => (
								<View style={styles.row}>
                                    <Text style={{textAlign: 'left',fontSize: 20, width: 65}}>{this._findTimeDiff(now,data.item["fireDate"])} min</Text>
                                    <View style={{alignItems: 'flex-start', width: 200, paddingVertical: 5}}>
                                        <Text style={{fontSize: 18}}>{data.item["userInfo"]["room"].toUpperCase()}</Text>
    									<Text>{data.item["userInfo"]["type"].toUpperCase()}</Text>
                                    </View>
								</View>
						)}
                        keyExtractor={ (item, index) => index.toString()}
						renderHiddenItem={ (data, rowMap) => (
							<View style={styles.rowBack}>
								<TouchableOpacity onPress={ _ => this._deleteNote(data, rowMap)}>
									<Text style={{color: '#FFF'}}>Delete</Text>
								</TouchableOpacity>
							</View>
						)}
						disableRightSwipe={true}
						rightOpenValue={-75}
                        previewRowKey={'0'}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
					/>
          );
    }
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#F5FCFF',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#FF3B30',
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        padding: 15
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#daccb6',
        justifyContent: 'space-around',
        minHeight: 75,
    },
    separator: {
      flex: 1,
      height: 0.5,
      backgroundColor: '#8E8E8E',
      borderRightColor: '#daccb6',
      borderRightWidth: 20,
      borderLeftColor: '#daccb6',
      borderLeftWidth: 20,
    },
});
