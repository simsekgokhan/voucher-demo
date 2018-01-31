import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Share, Linking, ScrollView
} from 'react-native';
import {connect} from "react-redux";

import Color from '../common/colors';
import { startSingleScreenApp } from '../navigator';
import { deleteAllVouchers } from "../actions/vouchersAction";

const rightButtons = {
  rightButtons: [{
    id: 'skip',
    title: 'Skip',
  }]
}

class More extends Component<{}> {

  constructor(props) {
    super(props);
    // Subscribe to navigator events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected')
      this.props.navigator.handleDeepLink({
        link: 'AllTabs.popToRoot',
        payload: { sender: 'More' }
      });
    else if (event.type === 'DeepLink' && event.link === 'AllTabs.popToRoot' &&
             event.payload.sender !== 'More') {
      this.props.navigator.resetTo({
        screen: 'More',
        navigatorStyle: { navBarHidden: true }
      });
    }
  }

  navigateTo(screen, title, backButtonTitle, rightButtonEnabled,
             passProps=null, navBarHidden=false) {
    this.props.navigator.push({
      screen: screen,
      title: title,
      navigatorStyle: {
        navBarHidden: navBarHidden,
        navBarButtonColor: Color.WHITE,
      },
      backButtonTitle: backButtonTitle,
      navigatorButtons: rightButtonEnabled ? rightButtons : null,
      passProps: passProps,
    });
  }

  share() {
    Share.share({
      message: 'Share Blockchain Voucher',
      url: 'https://google.com',
      title: 'Share'
    }, {
      // Android only:
      dialogTitle: 'Share Blockchain Voucher',
    })
  }

  goHome() {
    Linking.openURL('http://blockchainvoucher.com');
  }

  onButtonPress = (button) => {
    switch(button) {
      case 1:
        this.navigateTo('MyWallet', 'My Wallet', 'Back', false);
        break;
      case 2:
        this.navigateTo('CardRegister', 'Card Registration', 'Cancel', true);
        break;
      case 3:
        this.navigateTo('Vouchers', '', '', false, {sendVoucherScreen: true}, true);
        break;
      case 4:
        this.navigateTo('Settings', 'Settings', 'Back', false);
        break;
      case 5:
        this.share();
        break;
      case 6:
        this.navigateTo('IBANVerification', 'IBAN Verification', 'Back', false);
        break;
      case 7:
        this.goHome();
        break;
      case 8:
        this.props.deleteAllVouchers();
        startSingleScreenApp();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Image style={styles.container}
        resizeMode='cover'
        source={require('../images/background.png')}>
        <Image style={{margin: 40}}
          source={require('../images/app-logo-medium.png')}/>
        <Image style={styles.row0}
          source={require('../images/more-row-0.png')}>
          <View style={styles.row0View}>
            <Image style={{marginTop: 6}}
              source={require('../images/balance-icon.png')}/>
            <View style={styles.textView}>
              <Text style={styles.text}>
                Current Balance
              </Text>
              <Text style={styles.textBalance}>
                $ {this.props.balance}.00
              </Text>
            </View>
          </View>
        </Image>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <TouchableOpacity style={styles.rowButton}
            onPress={() => this.onButtonPress(1)}>
            <Image source={require('../images/wallet-icon.png')}/>
            <Text style={styles.textButton}>
                My Wallet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowButton}
            onPress={ () => this.onButtonPress(2)}>
            <Image source={require('../images/card-reg-icon.png')} />
            <Text style={styles.textButton}>
                Payment Card Registration
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowButton}
            onPress={ () => this.onButtonPress(3)}>
            <Image source={require('../images/send-voucher-icon.png')}/>
            <Text style={styles.textButton}>
                Send Voucher
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowButton}
            onPress={() => this.onButtonPress(4)}>
            <Image source={require('../images/settings-icon.png')}/>
            <Text style={styles.textButton}>
                Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowButton}
            onPress={() => this.onButtonPress(5)}>
            <Image source={require('../images/invite-icon.png')}/>
            <Text style={styles.textButton}>
                Invite Contacts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowButton,{paddingLeft: 14}]}
            onPress={() => this.onButtonPress(6)}>
            <Image source={require('../images/iban-icon.png')}/>
            <Text style={styles.textButton}>
                IBAN Verification
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowButton,{paddingLeft: 14}]}
            onPress={() => this.onButtonPress(7)}>
            <Image source={require('../images/about-icon.png')}/>
            <Text style={[styles.textButton,{ marginLeft: 19}]}>
                About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowButton, {marginBottom: 0}]}
            onPress={() => this.onButtonPress(8)}>
            <Image source={require('../images/logout-icon.png')}/>
            <Text style={[styles.textButton, {color: Color.BLUE, marginLeft: 16}]}>
                Log out
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{backgroundColor: '#b8e9fa', flex:1,
                      width:Dimensions.get('window').width}}>
        </View>
      </Image>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    balance: state.vouchers.balance,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllVouchers: () => {
      dispatch(deleteAllVouchers());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(More);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Color.BACKGROUND,
  },
  logo: {
    alignItems: 'center',
    justifyContent:'center',
  },
  row0: {
    marginBottom: 2,
    height: 112,
    justifyContent:'center',
  },
  row0View: {
    flexDirection: 'row',
    marginLeft: 22,
  },
  textView: {
    marginLeft: 18,
  },
  text: {
    fontSize: 18,
    backgroundColor: Color.TRANSPARENT,
    color: Color.TEXT_DEFAULT
  },
  textBalance: {
    color: Color.TEXT_MORE_BALANCE,
    fontSize: 26,
    backgroundColor: Color.TRANSPARENT,
    marginTop: 4,
  },
  rowButton: {
    backgroundColor: Color.BACKGROUND,
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    paddingLeft: 16,
    width: Dimensions.get('window').width - 6,
    marginBottom: 2,
  },
  textButton: {
    marginLeft: 22,
    fontSize: 18,
    backgroundColor: Color.TRANSPARENT,
    color: Color.TEXT_DEFAULT
  },
  scrollView: {
    marginBottom: 56,
  }
});
