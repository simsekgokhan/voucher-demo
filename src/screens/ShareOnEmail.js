import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import color from '../common/colors';
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
        passProps: {id: this.props.id, confirmType: Voucher.SEND, amount: this.props.amount},        
      });
    }
  }

  onButtonPress(buttonId){
    this.setState({selectedButtonId: buttonId});
  }

  Button = (email, buttonId) => {
    return(
    <TouchableOpacity onPress={ () => { this.onButtonPress(buttonId)}} 
      style={styles.button}>
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
      <View style={styles.container}>
        <View style={[styles.blockBlack, {marginTop: 20}]}>
          <Text style={styles.smallText}> 
            RECENT SUBMITTERS
          </Text>                 
        </View>                          
        { this.Button('Norman.Garber@hotmail.com', 1)}                 
        { this.HorLine() }
        { this.Button('Emanuel.Barbieri@gmail.com', 2)}                         
        { this.HorLine() }
        { this.Button('Roxanne.Buckalow@hotmail.com', 3)}                         
        { this.HorLine() }
        { this.Button('Darlene.Buckalew@hotmail.com', 4)}                                  
        { this.HorLine() }
        { this.Button('Murray.Derek@hotmail.com', 5)}                   
        <View style={styles.blockBlack}>
          <Text style={styles.smallText}> 
            NEW SUBMITTER
          </Text>                 
        </View>         
        <TouchableOpacity style={styles.button}>
          <Text style={styles.smallText}> 
            To:
          </Text>        
          <Image source={require('../images/add-icon.png')} />                           
        </TouchableOpacity>               
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  blockBlack: {
    marginHorizontal: 4, 
    marginTop: 10,
    paddingVertical: 10,    
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  horLineView: {
    marginHorizontal: 4, 
    height: 1,
    backgroundColor: color.GREY_BACKGROUND,
  },
  horLine: {
    marginLeft: 20, 
    height: 1,
    backgroundColor: '#404040',
  },
  button: {
    marginHorizontal: 4, 
    flexDirection: 'row',
    alignItems: 'center',    
    justifyContent: 'space-between',     
    height: 56,
    padding: 20,
    backgroundColor: color.GREY_BACKGROUND,
  },
  smallText: {
    color: 'grey', 
    fontSize: 13, 
  },
  largeText: {
    color: 'white', 
    fontSize: 15, 
  }
});