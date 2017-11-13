import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View , StatusBar, 
  KeyboardAvoidingView, Image, Dimensions
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { startTabBasedApp } from '../../App';
import Color from '../common/colors';

export default class Login extends Component<{}> {

  state = {
    loadStartSreen: true,
    signInSelected: false,   
    createAccountSelected: false,   
  };

  onBackButtonPress = () => {
    const signInSelected = this.state.signInSelected;
    this.setState({
      loadStartSreen: signInSelected ? false : true,
      signInSelected: signInSelected ? true : false,   
      createAccountSelected: false,
    });
  }

  login() {
    startTabBasedApp();    
  }
  
  signIn = () => {
    if(!this.state.loadStartSreen) {
      return this.login();      
    }

    this.setState({
      loadStartSreen: false,
      signInSelected: true,   
    });
  }

  createAccount = () => {
    this.setState({
      loadStartSreen: false,
      createAccountSelected: true,   
    });
  }

  render() {

    const signInButtonText = this.state.createAccountSelected ? 'Continue' : 'Sign In';
    
    let footerTextPartOne = 'By siging up, I agree to the ';
    let footerTextPartTwo = 'Terms of Use';
    if(this.state.createAccountSelected) {
      footerTextPartOne = 'Already have an account? ';
      footerTextPartTwo = 'Sign In';
    }
    else if(this.state.signInSelected) {
      footerTextPartOne = 'Forgot Password?';
      footerTextPartTwo = '';
    }

    return (
      <Image resizeMode='cover' style={styles.container}  
        source={require('../images/background-more.png')}>
        {
          this.state.createAccountSelected ?  
            <TouchableOpacity style={styles.backButton}
              onPress={this.onBackButtonPress}>
              <Image source={require('../images/back-button.png')} />
            </TouchableOpacity>    
            : null
        }
        <Image style={styles.logoView} 
          source={require('../images/blockchain-logo.png')}/>   
        <View style={styles.centerView}>
          {
            this.state.loadStartSreen ? 
              <Text 
                style={styles.textCenter}> 
                I'm already a member
              </Text> 
            :           
              <View style={styles.inputsView}>
                <View style={styles.input}>
                  <Text
                    style={styles.inputLabel}>
                    Email
                  </Text>
                  <TextInput
                    color='white'
                    selectionColor={Color.BLUE}                     
                    autoCorrect={false}
                    keyboardType='email-address'
                    defaultValue='Brain.Mendoza@hotmail.com'                          
                    placeholder='Brain.Mendoza@hotmail.com'      
                    placeholderTextColor='white'                    
                    style={styles.inputInput}>
                  </TextInput>
                </View>
                {
                  this.state.createAccountSelected ?            
                    <View style={styles.input}>
                      <Text
                        style={styles.inputLabel}>
                        Phone
                      </Text>
                      <TextInput
                        color='white'
                        selectionColor={Color.BLUE}                     
                        autoCorrect={false}
                        keyboardType='phone-pad'
                        defaultValue='605-848-7840'      
                        placeholder='605-848-7840'      
                        placeholderTextColor='grey'                    
                        style={styles.inputInput}>
                      </TextInput>
                    </View>
                    : 
                    null
                }
                <View style={styles.input}>
                  <Text
                    style={styles.inputLabel}>
                    Password
                  </Text>
                  <TextInput
                    color='white'
                    selectionColor={Color.BLUE}                     
                    autoCorrect={false}
                    keyboardType='default'
                    defaultValue='605-848-7840'  
                    placeholder=''      
                    placeholderTextColor='grey'  
                    secureTextEntry                                
                    style={styles.inputInput}>
                  </TextInput>
                </View>
              </View>            
          }
          <TouchableOpacity 
            style={styles.buttonView}
            onPress={ this.signIn }
          >
            <Text 
              style={styles.buttonText}> 
              {signInButtonText}
            </Text>
          </TouchableOpacity>
          {
            (this.state.createAccountSelected) ? 
            null
            : 
            <TouchableOpacity
              style={styles.buttonView2}
              onPress={ this.createAccount }
            >
              <Text
                style={styles.buttonText2}> 
                Create an Account
              </Text>
            </TouchableOpacity> 
          }
        </View>
        <View style={styles.footerView} >
          <Text style={{color: 'white'}} >
            {footerTextPartOne}
            <Text style={{color: '#33ccff', fontWeight: "bold"}}> 
              {footerTextPartTwo} 
            </Text>
          </Text>
        </View>
      </Image>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  backButton: {
    width: 80,
    height: 40,
    padding: 10,    
    position: 'absolute', 
    top: 20, 
    left: 0, 
    right: 0, 
    bottom: 0, 
  },
  logoView: {
    alignItems: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },
  inputsView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flexDirection: 'row',
    backgroundColor: Color.GREY_BACKGROUND,    
    margin: 1,
    height: 50,
    width: Dimensions.get('window').width,
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.7)', 
    width: 100, 
    fontSize: 15,
    lineHeight: 15,        
    justifyContent: 'center',
    textAlign: 'left',
    alignSelf: 'center',    
    marginLeft: 20,
  },
  inputInput: {        
    width: 248,
    fontSize: 16,    
  },
  centerView: {
    marginTop: 80,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
    color: 'white', 
    fontWeight: '700',    
  },
  buttonView: {
    backgroundColor: '#33ccff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 300,
    height: 50,
  }, 
  buttonView2: {
    borderColor: '#33ccff',
    borderWidth: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 300,
    height: 50,
  }, 
  buttonText: {
    textAlign: 'center',
    color: 'black', 
    fontWeight: '700'
  },
  buttonText2: {
    textAlign: 'center',
    color: '#33ccff', 
    fontWeight: '700'
  },
  footerView: {
    position: 'absolute', 
    top: 600, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});
