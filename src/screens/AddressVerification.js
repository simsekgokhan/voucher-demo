import React, { Component } from 'react';
import {
  StyleSheet, Image, TouchableOpacity
} from 'react-native';


export default class AddressVerification extends Component<{}> {
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
    this.props.navigator.popToRoot({ animationType: 'fade' });
    // Reset BuyVoucher tab to it's root before switching to it
    this.props.navigator.handleDeepLink({link: 'BuyVoucher.popToRoot'});
    this.props.navigator.switchToTab({ tabIndex: 1 });
  };
  
  render() {
    return (
      <Image
        style={styles.container}
        resizeMode='cover'
        source={require('../images/address-verification.png')}>
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