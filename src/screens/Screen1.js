import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View 
} from 'react-native';

export default class Screen1 extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text> Screen1 </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: 'red',
  }
});






