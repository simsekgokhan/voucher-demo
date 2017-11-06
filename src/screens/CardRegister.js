
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  Button
} from 'react-native';
import color from '../common/colors';

export default class CardRegister extends React.Component {

  static navigatorStyle = {
    navBarTextColor: 'white',
    navBarButtonColor: color.BLUE,
    tabBarHidden: true,          
  }

  onButtonPress = () => {

  }

  render() {

    return (
      <View style={styles.container}>        
        <TouchableOpacity 
          onPress={this.onButtonPress}
          style={styles.button}>                    
          <Image style={styles.leftRect} 
            source={require('../images/rect-left.png')}/>
          <Image style={styles.rightRect} 
          source={require('../images/rect-right.png')}/>   

          <Text style={styles.buttonText}> 
            It will be scanned automatically
          </Text>      

        </TouchableOpacity>           
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 40,
    marginHorizontal: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  leftRect: {
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonText: {
    height: 40,
    textAlign: 'center',
    position: 'absolute',     
    top: 276, 
    left: 0, 
    right: 0, 
    bottom: 0,     
    backgroundColor: 'transparent',  
    color: 'grey', 
    fontWeight: '700' 
  },
});
