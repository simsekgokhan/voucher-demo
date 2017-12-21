import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View, Image
} from 'react-native';
import Color from '../common/colors';

// Enable/disable "Change Theme" menu action
const SHOW_CHANGE_THEME_ITEM = false;

export default class IBANVerifivation extends Component<{}> {

  changeTheme = () => {
    this.props.navigator.push({
      screen: 'ChangeTheme',
      title: 'Change Theme',
      backButtonTitle: 'Back',
    });
  }

  render() {
    return (
      <Image style={styles.container}
        resizeMode='cover'
        source={require('../images/background.png')}>
        <View style={styles.block}>
          <Text style={styles.largeText}>
            Payout
          </Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.largeText}>
            Normal
          </Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.largeText}>
            Instant/Express
          </Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.largeText}>
            Pay In
          </Text>
        </View>
      </Image>
  );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    marginVertical: 1,
    height: 68,
    padding: 20,
    backgroundColor: '#FFFFFF70'
  },
  largeText: {
    color: '#82828270',
    fontWeight: '600',
    fontSize: 17,
  }
});