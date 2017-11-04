import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View 
} from 'react-native';

export default class ConfrmScreen extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text> Buy </Text>
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