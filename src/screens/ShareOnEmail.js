import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import Color from '../common/colors';
import Voucher from '../common/voucher.constants';

export default class ShareOnEmail extends Component<{}> {

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = { selectedButtonId: 5 }

  onNavigatorEvent(event) { 
    if (event.type === 'NavBarButtonPress' && event.id === 'send'){
      this.props.navigator.push({
        screen: 'ShareOnEmailSend',
        title: 'Share On Email',
        backButtonTitle: 'Back',      
        navigatorButtons: {
          rightButtons: [{
            id: 'send',
            title: 'Send',    
          }]
        },
        passProps: { 
          id: this.props.id, 
          confirmType: Voucher.SEND,
          amount: this.props.amount
        }        
      });
    }
  }

  onButtonPress(buttonId){
    this.setState({selectedButtonId: buttonId});
  }

  Button = (email, buttonId) => {
    return(
    <TouchableOpacity style={styles.button}
      onPress={() => { this.onButtonPress(buttonId) }}>
      <Text style={styles.largeText}> 
        {email}
      </Text>                         
      { 
        (buttonId === this.state.selectedButtonId) ? 
        <Image source={require('../images/tick-icon.png')}/> 
        : null
      }          
    </TouchableOpacity>       
    );
  }

  HorLine = () => {
    return(
      <View style={styles.horLineView}>
        <View style={styles.horLine}/>        
      </View>    
    );
  }

  render() {      

    const selectedButtonId = this.state.selectedButtonId;

    return (
      <Image style={styles.container}
        resizeMode='cover' 
        source={require('../images/background.png')}>   
        <View style={{paddingLeft: 24, marginTop: 24, marginBottom: 12}}>
          <Text style={styles.smallText}> 
            RECENT SUBMITTERS
          </Text>                              
        </View>
        { this.Button('Norman.Garber@hotmail.com', 1) }                 
        { this.HorLine() }
        { this.Button('Emanuel.Barbieri@gmail.com', 2) }                         
        { this.HorLine() }
        { this.Button('Roxanne.Buckalow@hotmail.com', 3) }                         
        { this.HorLine() }
        { this.Button('Darlene.Buckalew@hotmail.com', 4) }                                  
        { this.HorLine() }
        { this.Button('Murray.Derek@hotmail.com', 5) }         
        <View style={{paddingLeft: 24, marginTop: 24, marginBottom: 12}}>
          <Text style={[styles.smallText, {color: Color.TEXT_GREY_DARK}]}> 
            NEW SUBMITTER
          </Text>                              
        </View>                 
        <TouchableOpacity style={[styles.button, {backgroundColor: Color.WHITE}]}>
          <Text style={[styles.smallText, {color: Color.TEXT_GREY_DARK}]}> 
            To:
          </Text>        
          <Image source={require('../images/add-icon.png')}/>                           
        </TouchableOpacity>               
      </Image>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blockBlack: {
    marginHorizontal: 4, 
    marginTop: 10,
    paddingVertical: 10,    
    paddingHorizontal: 20,
    backgroundColor: Color.BACKGROUND_GREY_LITE,
  },
  horLineView: {
    marginHorizontal: 4, 
    height: 1,
    backgroundColor: Color.WHITE,
  },
  horLine: {
    marginLeft: 20, 
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  button: {
    marginHorizontal: 4, 
    flexDirection: 'row',
    alignItems: 'center',    
    justifyContent: 'space-between',     
    height: 56,
    padding: 20,
    backgroundColor: '#e7f6fd',    
  },
  smallText: {
    color: Color.WHITE, 
    backgroundColor: Color.TRANSPARENT,
    fontSize: 15, 
  },
  largeText: {
    color: Color.TEXT_DEFAULT, 
    fontSize: 15, 
  }
});