import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View , StatusBar
} from 'react-native';

export default class LoginForm extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <TextInput 
          placeholder='username or email'
          placeholderTextColor='rgba(255,255,255,0.7)'
          returnKeyType='next'
          onSubmitEditing={ () => this.passInput.focus() }
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}           
          />
        <TextInput 
          placeholder='password'
          placeholderTextColor='rgba(255,255,255,0.7)'
          secureTextEntry
          returnKeyType='go'          
          style={styles.input}        
          ref={ (dummyVar) => this.passInput = dummyVar }   
          />
        <TouchableOpacity style={styles.buttonCon}>
          <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonCon: {
      backgroundColor: '#2980b9',
      paddingVertical: 15,
  }, 
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF', 
    fontWeight: '700'
  }
});
