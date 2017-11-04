import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View 
} from 'react-native';
import color from '../common/colors';

export default class ConfirmScreen extends Component<{}> {

  static navigationOptions = ({ navigation })  => ({
    headerTintColor: color.BLUE,
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text> Confirm </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  block: {
    flex: 1,
    marginHorizontal: 20, 
    marginVertical: 100, 
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: color.GREY_BACKGROUND,
  }
});