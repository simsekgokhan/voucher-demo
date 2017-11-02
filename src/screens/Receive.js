
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View 
} from 'react-native';

export default class Receive extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text> Rec </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: 'yellow',
  }
});






