import React, { Component } from 'react';
import { 
  StyleSheet, Text, TouchableOpacity, View, Image, Switch
} from 'react-native';
import { connect } from 'react-redux';
import Color from '../common/colors';
import { setHourFormat } from "../actions/appAction";
import Time from '../common/time';

// Enable/disable "Change Theme" menu action
const SHOW_CHANGE_THEME_ITEM = false;

 class Settings extends Component<{}> {

  changeTheme = () => {
    this.props.navigator.push({
      screen: 'ChangeTheme',
      title: 'Change Theme',
      backButtonTitle: 'Back',
    });
  };
  changeHourFormat = (value) => {
    if(value) {
      this.props.setHourFormat(Time.TIME_FORMAT_24);
      return;
    }
    this.props.setHourFormat(Time.TIME_FORMAT_12);
  };

  render() {
    return (
      <Image style={styles.container}
        resizeMode='cover' 
        source={require('../images/background.png')}>  
        <View style={styles.persInfo}>
          <Text style={styles.labels}> 
            PERSONAL INFORMATION
          </Text>                 
        </View>        
        <View style={styles.block}>
          <Text style={styles.largeText}> 
            Brian.Mendoza@hotmail.com
          </Text>                 
          <Text style={styles.smallText}> 
            Email
          </Text>              
        </View>        
        <View style={styles.block}>
          <Text style={styles.largeText}> 
            605-848-7840
          </Text>                 
          <Text style={styles.smallText}> 
            Phone
          </Text>              
        </View>       
        <View style={styles.persInfo}>
          <Text style={styles.labels}>
            PASSWORD
          </Text>                 
        </View>                
        <TouchableOpacity style={[styles.block, {marginTop: 0}]}>
          <Text style={[styles.largeText, {color: Color.BLUE}]}> 
            Change Password
          </Text>                              
        </TouchableOpacity>     
        {
          SHOW_CHANGE_THEME_ITEM ?
          <View>
            <View style={styles.blockBlack}>
              <Text style={styles.smallText}> 
                THEME
              </Text>                 
            </View>         
            <TouchableOpacity style={styles.block}
              onPress={this.changeTheme}>
              <Text style={[styles.largeText, {color: Color.BLUE}]}> 
                Change Theme
              </Text>                              
            </TouchableOpacity>   
          </View>  
          : 
          null                
        }
        <View style={styles.persInfo}>
          <Text style={[styles.labels, {color: '#828282'}]}>
            TIME REPRESENTATION
          </Text>
        </View>
        <View style={styles.timeBlock}>
          <Text style={styles.largeText}>
            24-hour format
          </Text>
          <Switch
            value={this.props.format === Time.TIME_FORMAT_24}
            onValueChange={this.changeHourFormat}
            style={styles.switch}
          />
  </View>
      </Image>        
    );
  }
  
}

export default connect((state) => {
  return {
    format: state.app.timeFormat
  }
}, (dispatch) => {
  return {
    setHourFormat: (format) => dispatch(setHourFormat(format))
  }
})(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  persInfo: {
    paddingLeft: 24, 
    marginTop: 24, 
    marginBottom: 12
  },
  blockBlack: {
    marginHorizontal: 4, 
    marginTop: 10,
    paddingVertical: 10,    
    paddingHorizontal: 20,
  },
  block: {
    marginHorizontal: 4,
    marginVertical: 1,
    height: 68,
    padding: 20,
    backgroundColor: '#e7f6fd',
  },
  timeBlock: {
    backgroundColor: '#FFFFFF95',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 4,
    marginVertical: 1,
    height: 68,
    padding: 20,
  },
  labels: {
    color: Color.WHITE, 
    backgroundColor: Color.TRANSPARENT,    
    fontSize: 13, 
  },
  smallText: {
    color: Color.TEXT_GREY_DARK, 
    backgroundColor: Color.TRANSPARENT,    
    fontSize: 13, 
  },
  largeText: {
    color: Color.TEXT_DEFAULT, 
    fontSize: 17, 
  },
  switch: {
    backgroundColor: '#e5e5ea',
    borderRadius: 18,
  }
});