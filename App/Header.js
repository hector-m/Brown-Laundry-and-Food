
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E130C',
  },
  input: {
    height: 30,
    flex: 1,
    color: '#8E8E93',
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#2E241F',
    borderRadius: 10,
  },
});

const Header = (props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search..."
      //onChangeText={(text) => console.log('searching for ', text)}
    />
  </View>
);

export default Header;
