import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import color from '../common/colors';
import Voucher from '../common/voucher.constants';
import VoucherDetails from '../screens/VoucherDetails';

export default class AddCard extends Component<{}> {

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { 
    if (event.type === 'NavBarButtonPress' && event.id === 'done'){          
      this.props.navigator.popToRoot({ animationType: 'fade' });
      // Reset BuyVoucher tab to it's root before switching to it
      this.props.navigator.handleDeepLink({link: 'BuyVoucher.popToRoot'});      
      this.props.navigator.switchToTab({ tabIndex: 1 });      
    }
  }

  Input = (placeholder, maxLength = 4, keyboardType='number-pad') => {
    return(
      <TextInput
        defaultValue={this.props.showEmptyForm ? null : placeholder}
        style={styles.input}
        selectionColor={color.BLUE} 
        autoCorrect={false}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor='grey'/> 
    );
  }

  render() {
    const showEmptyForm = this.props.showEmptyForm;        
    const card = {
      inputOne: showEmptyForm ? '0000' : '4055',
      inputTwo: showEmptyForm ? '0000' : '1234',
      inputThree: showEmptyForm ? '0000' : '5678',
      inputFour: showEmptyForm ? '0000' : '9000',
      inputName: showEmptyForm ? 'Name Cardholder' : 'Brian Mendoza',
      inputDate: showEmptyForm ? 'MM/YY' : '01/20',
      inputCvv: showEmptyForm ? '0000' : '',
    }   
    
    return (
      <View style={styles.container}>
        <Text style={styles.topText}>
          Add New Credit Card
        </Text>
        <View style={styles.card}>
          <View style={styles.cardBlock}>        
            <View style={styles.inputRow}>
              <Text style={styles.rowOne}>
                Credit Card Number
              </Text>
            </View>    
            <View style={styles.inputRow}>
              {this.Input(card.inputOne)}             
              {this.Input(card.inputTwo)} 
              {this.Input(card.inputThree)} 
              {this.Input(card.inputFour)} 
            </View>       
            <Text style={styles.rowOne}>
              Holder Name                        MM/YY           CVV
            </Text>            
            <View style={styles.inputRow}>
              <TextInput style={[styles.input, {width: 136}]}
                defaultValue={this.props.showEmptyForm ? null : card.inputName}
                selectionColor={color.BLUE} 
                autoCorrect={false}
                placeholder={card.inputName}      
                placeholderTextColor='grey'/> 
              {this.Input(card.inputDate, 5, 'numbers-and-punctuation')} 
              {this.Input(card.inputCvv)}                         
            </View>     
          </View>
        </View>        
        {
          showEmptyForm ? null :
          <Image style={styles.verLine} 
            source={require('../images/dashed-ver-line.png')}/>   
          }
        {
          showEmptyForm ? null :
          <Text style={styles.bottomText}>
          {`
            Fill in the CVV field to
            register the Credit Card
          `}
          </Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  topText: {
    alignSelf: 'center',
    color: 'grey', 
    fontSize: 15,
    marginTop: 80,
  },
  card: {
    marginHorizontal: 20, 
    marginVertical: 20, 
    alignItems: 'center',
    backgroundColor: color.GREY_BACKGROUND,
    width: 344,
    height: 228,
  },
  cardBlock: {

  },
  rowOne: {
    fontSize: 11, 
    color: 'white', 
    marginTop: 40,
    marginLeft: 4  
  },
  inputRow: {
    flexDirection: 'row',
  },
  input: {
    margin: 4,
    fontSize: 15,
    color: 'white',
    backgroundColor: 'black',
    borderColor: color.BLUE,
    borderWidth: 1,
    borderRadius: 5,    
    width: 64,
    height: 34, 
    textAlign: 'center',
  },
  verLine: {
    position: 'absolute',     
    top: 314, 
    left: 300, 
    right: 0, 
    bottom: 0,     
  },
  bottomText: {
    textAlign: 'right',
    color: color.BLUE, 
    fontSize: 15,
    marginRight: 14,
    position: 'absolute',     
    top: 350, 
    left: 144, 
    right: 0, 
    bottom: 0,     
    backgroundColor: 'transparent',    
    width: 220,
  },
});