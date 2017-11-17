
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  Button
} from 'react-native';
import { CardIOView, CardIOUtilities } from 'react-native-awesome-card-io';
import Color from '../common/colors';

export default class CardRegister extends React.Component {

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { 
    if (event.type === 'NavBarButtonPress' && event.id === 'skip'){
      this.props.navigator.push({
        screen: 'AddCard',
        title: 'Card Registration',
        backButtonTitle: 'Back',
        passProps: {showEmptyForm: true},
        navigatorButtons: {
          rightButtons: [{
            id: 'done',
            title: 'Done',            
          }]
        }     
      });
    }
  }

  static navigatorStyle = {
    tabBarHidden: true,   
    navBarButtonColor: Color.WHITE,        
  }

  navigateToAddCard = (card) => {
    this.props.navigator.push({
      screen: 'AddCard',
      title: 'Card Registration',
      backButtonTitle: 'Back',
      passProps: {showEmptyForm: (card === null), card: card},
      navigatorButtons: {
        rightButtons: [{
          id: 'done',
          title: 'Done',
        }]
      }     
    });
  }

  componentWillMount() {
    CardIOUtilities.preload();
  }

  didScanCard = (card) => { // the scanned card  
    this.navigateToAddCard(card);
  }

  render() {
    return (
      <TouchableOpacity 
        onPress={() => this.navigateToAddCard()}
        style={styles.container}>        
        <CardIOView 
          hideCardIOLogo={true}
          didScanCard={this.didScanCard}
          style={{ flex: 1 }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    justifyContent: 'center',
  },
});
