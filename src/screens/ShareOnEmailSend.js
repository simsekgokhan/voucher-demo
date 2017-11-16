import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import Color from '../common/colors';
import Voucher from '../common/voucher.constants';

export default class ShareOnEmailSend extends Component<{}> {

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { 
    if (event.type === 'NavBarButtonPress' && event.id === 'send'){
      this.props.navigator.push({
        screen: 'ConfirmScreen',
        title: Voucher.SEND,
        backButtonTitle: 'Cancel',
        passProps: {id: this.props.id, confirmType: Voucher.SEND, amount: this.props.amount},
      });
    }
  }

  Input = (value, width=260, keyboardType='email-address', 
           multiline=false, autoFocus=false) => {
    return(
      <TextInput
        defaultValue={value}        
        style={[styles.input, {width: width}]}
        selectionColor={Color.BLUE} 
        autoCorrect={true}
        autoFocus={autoFocus}
        multiline={multiline}
        maxHeight={126}        
        keyboardType={keyboardType}/> 
    );
  }

  render() {      
    return (
      <View style={styles.container}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.text}> 
            To:
          </Text>        
          {this.Input('murray.derek@hotmail.com')}                                       
          <TouchableOpacity style={styles.addButton}>
            <Image source={require('../images/add-icon.png')}/>                                     
          </TouchableOpacity>  
        </View>               
        <View style={styles.row}>
          <Text style={[styles.text, {paddingRight: 6}]}> 
            Subject:
          </Text>        
          {this.Input('The Emerald Buddha', 290, 'default')}                                       
        </View>           
        <View style={[styles.row, {marginBottom: 0}]}>
            <Text style={[styles.text, {paddingRight: 6}]}> 
              Note
            </Text>                                             
        </View>       
        <View style={styles.noteView}>        
          {this.Input('', 340, 'default', true, true)}       
        </View>
                
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_GREY_LITE,
    paddingTop: 24,
  },
  row: {
    marginHorizontal: 4, 
    marginVertical: 1, 
    flexDirection: 'row',
    alignItems: 'center',        
    height: 56,
    paddingLeft: 20,
    backgroundColor: Color.WHITE,
  },
  noteView: {
    marginHorizontal: 4, 
    paddingHorizontal: 12,
    paddingBottom: 18,
    flexDirection: 'row',
    backgroundColor: Color.WHITE,
  },
  text: {
    color: Color.TEXT_GREY_DARK, 
    fontSize: 15, 
  },
  input: {
    paddingLeft: 10,
    fontSize: 15,
    color: Color.TEXT_DEFAULT,
  },
  addButton: {
    flexDirection: 'row',
    paddingRight: 12,
    width: 50, 
    height: 50,
    alignItems: 'center',    
    justifyContent: 'center',     
  }
});