import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import Color from '../common/colors';
import Voucher from '../common/voucher.constants';

export default class AddCard extends Component<{}> {

  constructor(props) {
    super(props);
    /// Subscribe to navigator events
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

  Input = (placeholder, maxLength = 4, keyboardType='number-pad', autoFocus=false) => {
    return(
      <TextInput
        defaultValue={this.props.showEmptyForm ? null : placeholder}
        style={styles.input}
        selectionColor={Color.BLUE} 
        autoCorrect={false}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor={'b3b3b3'}
      /> 
    );
  }

  render() {
    const showEmptyForm = this.props.showEmptyForm;        
    const card = {
      inputOne: showEmptyForm ? '0000' : '4055',
      inputTwo: showEmptyForm ? '0000' : '1234',
      inputThree: showEmptyForm ? '0000' : '5678',
      inputFour: showEmptyForm ? '0000' : '9000',
      inputName: showEmptyForm ? 'Full Name on Card ' : 'Brian Mendoza',
      inputDate: showEmptyForm ? 'MM/YY' : '01/20',
      inputCvv: showEmptyForm ? '0000' : '',
    }   

    const scannedCard = this.props.card;
    if(scannedCard !== undefined && scannedCard.scanned) {
      if(scannedCard.cardNumber !== null){
        card.inputOne = scannedCard.cardNumber.substring(0,4);
        card.inputTwo = scannedCard.cardNumber.substring(4,8);
        card.inputThree = scannedCard.cardNumber.substring(8,12);
        card.inputFour = scannedCard.cardNumber.substring(12,16);
      } 
           
      if(scannedCard.cardholderName !== null) 
        card.inputName = scannedCard.cardholderName;

      if(scannedCard.expiryYear !== 0 && scannedCard.expiryMonth !== 0 ) 
        card.inputDate = (scannedCard.expiryMonth + '/' + scannedCard.expiryYear);
    }            

    return (
      <Image style={styles.container}
        resizeMode='cover' 
        source={require('../images/background.png')}>  
        <Text style={styles.topText}>
          Add New Credit Card
        </Text>
        <Image style={styles.card} 
          source={require('../images/card.png')}>      
          <View style={styles.cardBlock}>        
            <View style={styles.inputRow}>
              <Text style={styles.rowOne}>
                Credit Card Number
              </Text>
            </View>    
            <View style={styles.inputRow}>
              {this.Input(card.inputOne, 4, 'number-pad', showEmptyForm)}             
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
                selectionColor={Color.BLUE} 
                autoCorrect={false}
                placeholder={card.inputName}      
                placeholderTextColor={'b3b3b3'}/> 
              {this.Input(card.inputDate, 5, 'numbers-and-punctuation')} 
              {this.Input(card.inputCvv, 4, 'number-pad', !showEmptyForm)}                         
            </View>     
            <View style={[styles.inputRow, {justifyContent: 'space-between'}]}>
              <Text> </Text>
              <Image style={{marginTop: 10, marginRight: 4}} 
                source={require('../images/visa-logo-my-wallet.png')}/> 
            </View>            
          </View>
        </Image>        
        {
          showEmptyForm ? 
          null :
          <Image style={styles.verLine} 
            source={require('../images/dashed-ver-line.png')}/>   
        }
        {
          showEmptyForm ? 
          null :
          <Text style={styles.bottomText}>
            {`
              Fill in the CVV field
              to register the Credit Card
            `}
          </Text>
        }
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    alignItems: 'center',
  },
  topText: {
    alignSelf: 'center',
    color: Color.WHITE, 
    backgroundColor: Color.TRANSPARENT,    
    fontSize: 15,
    marginTop: 62,
  },
  card: {
    marginHorizontal: 20, 
    marginVertical: 20, 
    alignItems: 'center',
  },
  cardBlock: {
    paddingTop: 20,
  },
  rowOne: {
    fontSize: 11, 
    color: Color.TEXT_GREY_DARK, 
    backgroundColor: Color.TRANSPARENT,
    marginTop: 20,
    marginLeft: 4,  
    marginBottom: 4,  
  },
  inputRow: {
    flexDirection: 'row',
  },
  input: {
    margin: 4,
    fontSize: 15,
    color: Color.BLACK,
    backgroundColor: '#e7f6fd',
    borderColor: Color.BLUE,
    borderWidth: 1,
    borderRadius: 5,    
    width: 64,
    height: 34, 
    textAlign: 'center',
  },
  verLine: {
    position: 'absolute',     
    top: 280, 
    left: 268, 
    right: 0, 
    bottom: 0,     
  },
  bottomText: {
    textAlign: 'right',
    color: Color.TEXT_GREY_DARK, 
    fontSize: 15,
    marginRight: 14,
    position: 'absolute',     
    top: 328, 
    left: 132, 
    right: 0, 
    bottom: 0,     
    backgroundColor: Color.TRANSPARENT,    
    width: 228,
  },
});