import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View 
} from 'react-native';

export default class Voucher extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text> Vouchers </Text>
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






