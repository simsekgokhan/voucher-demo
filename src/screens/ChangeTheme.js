import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import {connect} from "react-redux";

import Color from '../common/colors';
import Voucher from '../common/voucher.constants';
import { setLiteTheme, setDarkTheme } from "../actions/appAction";

class ChangeTheme extends Component<{}> {

  state = { selectedButtonId: 2 }

  onButtonPress(buttonId){
    this.setState({selectedButtonId: buttonId});
    
    // if(buttonId === 1)
    //   this.props.setLiteTheme();    
    // else if(buttonId === 2)
    //   this.props.setDarkTheme();    
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
    const theme = this.props.app.theme;    
    
    return (
      <View style={[styles.container, {backgroundColor: theme.changeThemeBackgroundColor}]}>
        <View style={[styles.blockBlack, {marginTop: 20}]}>
          <Text style={styles.smallText}> 
            THEMES
          </Text>                 
        </View>                          
        { this.Button('Lite', 1)}                 
        { this.HorLine() }
        { this.Button('Dark', 2)}                         
        { this.HorLine() }
        { this.Button('Blue', 3)}                                        
      </View>
    );
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLiteTheme: () => {
      dispatch(setLiteTheme());      
    },
    setDarkTheme: () => {
      dispatch(setDarkTheme());      
    },
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTheme);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'black',
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
    backgroundColor: Color.GREY_BACKGROUND,
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
    backgroundColor: Color.GREY_BACKGROUND,
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