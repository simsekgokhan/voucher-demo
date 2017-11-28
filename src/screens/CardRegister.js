
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CardIOView, CardIOUtilities } from 'react-native-awesome-card-io';
import Color from '../common/colors';

export default class CardRegister extends React.Component {

  constructor(props) {
    super(props);
    // Subscribe to navigator events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    CardIOUtilities.preload();
  }

  static navigatorStyle = {
    tabBarHidden: true,   
    navBarButtonColor: Color.WHITE,        
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

  navigateToHoldCard = (card) => {
    this.props.navigator.push({
      screen: 'HoldCard',
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

  didScanCard = (card) => { // the scanned card  
    this.navigateToAddCard(card);
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}
        onPress={() => this.navigateToHoldCard()}>        
        <CardIOView style={{flex: 1}}
          hideCardIOLogo={true}
          didScanCard={this.didScanCard}          
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
