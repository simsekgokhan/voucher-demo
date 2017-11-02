import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View , StatusBar, 
  KeyboardAvoidingView, Image, Alert, Dimensions
} from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class Login extends Component<{}> {

  state = {
    loadStartSreen: true,
    signInSelected: false,   
    createAccountSelected: false,   
  };

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

  login() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Vouchers',
          screen: 'Vouchers',
          icon: require('../images/voucher.png'),
          selectedIcon: require('../images/voucher-active.png'),
          title: 'Vouchers',
          navigatorStyle: {
            navBarHidden: true
          },
        },
        {
          label: 'Buy Voucher',
          screen: 'BuyVoucher',
          icon: require('../images/buy-voucher.png'),
          selectedIcon: require('../images/buy-voucher-active.png'),
          title: 'Buy Voucher'
        },
        {
          label: 'Receive',
          screen: 'Receive',
          icon: require('../images/receive.png'),
          selectedIcon: require('../images/receive-active.png'),
          title: 'Receive',
          navigatorStyle: {
            navBarHidden: true
          },
        },
        {
          label: 'More',
          screen: 'More',
          icon: require('../images/more.png'),
          selectedIcon: require('../images/more-active.png'),
          title: 'More',
        },
      ],
      appStyle: {
        forceTitlesDisplay: false, 
        navBarBackgroundColor: 'black',
      }, 
      tabsStyle: {
        tabBarBackgroundColor: 'black',        
      }     
    });
  }
  
  render() {

    let xx = false;

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
      <KeyboardAvoidingView behavior='padding' style={styles.rootView}>
        <View style={styles.logoView}>
          <Image
            style={styles.logo}
            source={require('../images/page1-logo.png')}
          />
          <View style={styles.logoText}>
            <Text 
              style={styles.logoTextUp}> 
              blockchain
            </Text>
            <Text 
              style={styles.logoTextDown}> 
              VOUCHER
            </Text>            
          </View>
        </View>
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
                        placeholder='605-848-7840'      
                        placeholderTextColor='white'                    
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
                    placeholder='xxxxxxxxxxxxxxx'      
                    placeholderTextColor='white'  
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
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: 'black',
  },
  logoView: {
    alignItems: 'center',
    marginTop: 100,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 56,
    height: 56,
  },
  logoText: {
    marginLeft: 20,
    //alignItems: 'flex-end', // todo
  },
  logoTextUp: {
    fontSize: 30,
    textAlign: 'left',
    color: 'white', 
  },
  logoTextDown: {
    fontSize: 20,
    textAlign: 'left',
    color: 'white', 
  },
  inputsView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',    
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

  // <TextInput
  //   placeholder='username or email'
  //   placeholderTextColor='rgba(255,255,255,0.7)'
  //   returnKeyType='next'
  //   onSubmitEditing={() => this.passInput.focus()}
  //   keyboardType='email-address'
  //   autoCapitalize='none'
  //   autoCorrect={false}
  //   style={styles.input}
  // />
  // <TextInput
  //   placeholder='password'
  //   placeholderTextColor='rgba(255,255,255,0.7)'
  //   secureTextEntry
  //   returnKeyType='go'
  //   style={styles.input}
  //   ref={(dummyVar) => this.passInput = dummyVar}
  // />

  // input: {
  //   height: 40,
  //   backgroundColor: 'rgba(255,255,255,0.2)',
  //   //marginBottom: 20,
  //   color: '#FFF',
  //   paddingHorizontal: 10,
  //   margin: 10,
  // },