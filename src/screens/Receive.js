
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import Camera from 'react-native-camera';
import color from '../common/colors';

let lastActiveTabIndex = 0;

export default class Receive extends Component<{}> {

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    leftButtons: [{
      //title: 'Back',
      id: 'back',
      icon: require('../images/back-button.png'),      
    }
  ]
  }

  onNavigatorEvent(event) { 
    if(event.unselectedTabIndex >= 0)
      lastActiveTabIndex = event.unselectedTabIndex;

    if (event.type === 'NavBarButtonPress' && event.id ==='back')     
        this.props.navigator.switchToTab({ tabIndex: lastActiveTabIndex });      
  }

  render() {
     return (
      <View style={styles.container}>

      <TouchableOpacity 
        onPress={() => this.onButtonPress(5)}
        style={styles.button5}>                    
        <Image style={styles.imagestyle} source={require('../images/scan-icon.png')}>           
        </Image>          
      </TouchableOpacity>    

      </View>
     )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});






