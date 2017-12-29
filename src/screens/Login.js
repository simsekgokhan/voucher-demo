import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View , StatusBar, 
  KeyboardAvoidingView, Image, Dimensions
} from 'react-native';
import moment from 'moment'
import {connect} from "react-redux";

import { startTabBasedApp } from '../navigator';
import Color from '../common/colors';
import { addVoucher, updateVoucher } from "../actions/vouchersAction";
import Voucher from '../common/voucher.constants';
import { createVoucher } from '../model/voucher.model';

class Login extends Component<{}> {

  addFakeVouchers() {
    this.props.addVoucher(createVoucher(Voucher.PURCHASED, 300, moment().valueOf() - 1000*60*49));
    this.props.addVoucher(createVoucher(Voucher.RECEIVED, 200, moment().valueOf() - 1000*60*65));

    this.props.addVoucher(createVoucher(Voucher.RECEIVED, 50, moment().valueOf() - 1000*60*73));
    this.props.updateVoucher({ id: 1202, newStatus: Voucher.SENT, email: 'Emanuel.Barbieri@gmail.com', timeStamp: moment().valueOf() - 1000*60*33});

    this.props.addVoucher(createVoucher(Voucher.PURCHASED, 25, moment().valueOf() - 1000*60*90));
    this.props.updateVoucher({ id: 1203, newStatus: Voucher.REFUNDED, email: 'Norman.Garber@hotmail.com', timeStamp: moment().valueOf() - 1000*60*45 });

    this.props.addVoucher(createVoucher(Voucher.PURCHASED, 100, moment().valueOf() - 1000*60*57));

    this.props.addVoucher(createVoucher(Voucher.PURCHASED, 40, moment().valueOf() - 1000*60*49));
    this.props.updateVoucher({ id: 1205, newStatus: Voucher.SENT, email: 'Darlene.Buckalew@hotmail.com', timeStamp: moment().valueOf() - 1000*60*27 });
    this.props.updateVoucher({ id: 1205, newStatus: Voucher.REDEEMED, email: 'Roxanne.Buckalow@hotmail.com', timeStamp: moment().valueOf() - 1000*60*20 });
  }

  componentDidMount() {
    this.addFakeVouchers();
  }

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
    if(!this.state.loadStartSreen) 
      return this.login();         

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

  TextInput = (keyboardType, defaultValue, isPassword=false) => {
    return(
      <TextInput
        style={styles.inputInput}
        color={Color.INPUT_TEXT}
        selectionColor={Color.BLUE}                     
        autoCorrect={false}
        keyboardType={keyboardType}
        defaultValue={defaultValue}  
        secureTextEntry={isPassword}>
      </TextInput>
    );
  }

  render() {

    const signInButtonText = this.state.createAccountSelected ? 'Continue' : 'Sign In';
    
    let footerTextPartOne;
    let footerTextPartTwo;
    if(this.state.loadStartSreen) {
      footerTextPartOne = 'By signing up, I agree to the ';
      footerTextPartTwo = 'Terms of Use';
    }
    else if(this.state.createAccountSelected) {
      footerTextPartOne = 'Already have an account? ';
      footerTextPartTwo = 'Sign In';
    }
    else if(this.state.signInSelected) {
      footerTextPartOne = '';
      footerTextPartTwo = '';
    }

    return (
      <View style={styles.container}>
        {
          this.state.createAccountSelected ?  
            <TouchableOpacity style={styles.backButton}              
              onPress={this.onBackButtonPress}>
              <Image source={require('../images/back-button.png')} />
            </TouchableOpacity>    
            : 
            null
        }
        <Image style={styles.logoView} 
          source={require('../images/app-logo.png')}/>   
        <View style={styles.centerView}>
          {
            this.state.loadStartSreen ? 
              <Text style={styles.textCenter}> 
                I'm already a member
              </Text> 
            :           
              <View style={styles.inputsView}>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>
                    Email
                  </Text>
                  {this.TextInput('email-address', 'Brain.Mendoza@hotmail.com')}                  
                </View>
                {
                  this.state.createAccountSelected ?            
                    <View style={styles.input}>
                      <Text style={styles.inputLabel}>
                        Phone
                      </Text>
                      {this.TextInput('phone-pad', '605-848-7840')}                  
                    </View>
                    : 
                    null
                }
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>
                    Password
                  </Text>
                  {this.TextInput('default', '605-848', true)}
                </View>
                {
                  (this.state.signInSelected && !this.state.createAccountSelected) ?
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                  :
                  null
                }
              </View>            
          }
          <TouchableOpacity style={styles.buttonView}
            onPress={this.signIn}>
            <Text style={[styles.buttonText, {color: Color.FIRST_BUTTON_TEXT}]}> 
              {signInButtonText}
            </Text>
          </TouchableOpacity>
          {
            (this.state.createAccountSelected || this.state.signInSelected) ?
              null 
              : 
              <TouchableOpacity 
                style={[styles.buttonView, {backgroundColor: Color.SECOND_BUTTON_BACKGROUND}]}
                onPress={this.createAccount}>
                <Text style={[styles.buttonText, {color: Color.SECOND_BUTTON_TEXT}]}> 
                  Create an Account
                </Text>
              </TouchableOpacity>
          }
          {
            (this.state.signInSelected && !this.state.createAccountSelected) ?
              <View style={styles.signUpLinkView}>
                <Text style={[styles.textCenter, {fontSize: 16, paddingRight: 5}]}>
                  Dont't have an account?
                </Text>
                <TouchableOpacity
                  onPress={this.createAccount}>
                  <Text style={{color: Color.WHITE, fontSize: 18, fontWeight: '700'}}>
                    Sign Up.
                  </Text>
                </TouchableOpacity>
              </View>
              :
              null
          }
        </View>
        <View style={styles.footerView} >
          <Text style={{color: Color.WHITE}} >
            {footerTextPartOne}
            <Text style={{color: Color.WHITE, textDecorationLine: "underline"}}> 
              {footerTextPartTwo} 
            </Text>
          </Text>
          {
            (this.state.signInSelected && !this.state.createAccountSelected) ?
            <TouchableOpacity
              onPress={this.signIn}>
              <View style={styles.touchIDView}>
                <Text style={[styles.textCenter,{ fontSize: 18, paddingBottom: 10, fontWeight: '700'}]}>
                  Touch ID
                </Text>
                <Image source={require('../images/touchid-login.png')}>
                </Image>
              </View>
            </TouchableOpacity>
            :
            null
          }
        </View>
      </View>
      );
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateVoucher: (state) => {
      dispatch(updateVoucher(state));      
    },
    addVoucher: (state) => {
      dispatch(addVoucher(state));      
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_LOGIN,
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
    backgroundColor: Color.INPUT_BACKGROUND,    
    margin: 1,
    height: 50,
    width: Dimensions.get('window').width,
  },
  inputLabel: {
    color: Color.INPUT_LABEL, 
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
    color: Color.WHITE, 
    backgroundColor : 'transparent', 
    fontWeight: '700',    
  },
  buttonView: {
    backgroundColor: Color.FIRST_BUTTON_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 300,
    height: 50,
    borderRadius: 5,    
  }, 
  buttonText: {
    textAlign: 'center',
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
  forgotPasswordText: {
    color: Color.WHITE,
    paddingTop: 8,
    paddingRight: 18,
    fontSize: 15,
    alignSelf: 'flex-end',
  },
  signUpLinkView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 15
  },
  touchIDView: {
    marginBottom: 90,
    alignItems: 'center',
  }
});
