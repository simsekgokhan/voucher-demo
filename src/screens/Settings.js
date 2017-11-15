import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import Color from '../common/colors';

export default class Settings extends Component<{}> {

  changeTheme = () => {
    this.props.navigator.push({
      screen: 'ChangeTheme',
      title: 'Change Theme',
      backButtonTitle: 'Back',
    });
  }

  render() {      
    return (
      <View style={styles.container}>
        <View style={[styles.blockBlack, {marginTop: 20}]}>
          <Text style={styles.smallText}> 
            PERSONAL INFORMATION
          </Text>                 
        </View>        
        <View style={styles.block}>
          <Text style={styles.largeText}> 
            Brian.Mendoza@hotmail.com
          </Text>                 
          <Text style={styles.smallText}> 
            Email
          </Text>              
        </View>        
        <View style={styles.block}>
          <Text style={styles.largeText}> 
            605-848-7840
          </Text>                 
          <Text style={styles.smallText}> 
            Phone
          </Text>              
        </View>     
        <View style={styles.blockBlack}>
          <Text style={styles.smallText}> 
            PASSWORD
          </Text>                 
        </View>         
        <TouchableOpacity style={styles.block}>
          <Text style={[styles.largeText, {color: Color.BLUE}]}> 
            Change Password
          </Text>                              
        </TouchableOpacity>     
        <View style={styles.blockBlack}>
          <Text style={styles.smallText}> 
            THEME
          </Text>                 
        </View>         
        <TouchableOpacity onPress={this.changeTheme} style={styles.block}>
          <Text style={[styles.largeText, {color: Color.BLUE}]}> 
            Change Theme
          </Text>                              
        </TouchableOpacity>                     
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
  },
  blockBlack: {
    marginHorizontal: 4, 
    marginTop: 10,
    paddingVertical: 10,    
    paddingHorizontal: 20,
    backgroundColor: Color.BACKGROUND,
  },
  block: {
    marginHorizontal: 4, 
    marginVertical: 2,
    height: 68,
    padding: 20,
    backgroundColor: Color.BACKGROUND_GREY,
  },
  smallText: {
    color: Color.TEXT_GREY, 
    fontSize: 13, 
  },
  largeText: {
    color: Color.TEXT_DEFAULT, 
    fontSize: 17, 
  }
});