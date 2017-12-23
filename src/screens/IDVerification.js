import React, { Component } from 'react';
import {
  StyleSheet, Image, TouchableOpacity
} from 'react-native';


export default class IDVerification extends Component<{}> {
  constructor(props) {
    super(props);
    /// Subscribe to navigator events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress' && event.id === 'skip'){
      this.nextScreen();
    }
  }

  nextScreen = () => {
    this.props.navigator.push({
      screen: 'AddressVerification',
      title: 'Address Verification',
      backButtonTitle: 'Back',
      passProps: {showEmptyForm: true},
      navigatorButtons: {
        rightButtons: [{
          id: 'skip',
          title: 'Skip',
        }]
      }
    });
  };

  render() {
    return (
      <Image
        style={styles.container}
        resizeMode='cover'
        source={require('../images/id-verification.png')}>
        <TouchableOpacity
          style={styles.button}
          onPress={ () => this.nextScreen() }>

        </TouchableOpacity>
      </Image>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
  }
});