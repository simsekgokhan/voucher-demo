
import React, { Component } from 'react';
import {
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  ScrollView, Button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from "react-redux";
import Modal from 'react-native-modal';

import VoucherItem from '../components/VoucherItem';
import Color from '../common/colors';
import VoucherDetails from '../screens/VoucherDetails';
import Voucher from '../common/voucher.constants';

class Vouchers extends React.Component {

  state = {
    sendModal: false, 
    showOnlyActiveVouchers: false,
  }

  constructor(props) {
    super(props);
    // Subscribe to navigator events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.voucherId = 0;
    this.voucherBalance = 0;
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      this.props.navigator.handleDeepLink({
        link: 'AllTabs.popToRoot',
        payload: { sender: 'Vouchers' }
      });
    }
    else if (event.type === 'DeepLink' && event.link === 'AllTabs.popToRoot' &&
             event.payload.sender !== 'Vouchers') {
      this.props.navigator.resetTo({
        screen: 'Vouchers',
        navigatorStyle: { navBarHidden: true }
      });
    }
  }

  navigateToDetails = (voucher) => {
    this.props.navigator.push({
      screen: 'VoucherDetails',
      title: 'Voucher',
      backButtonTitle: 'Back',
      passProps: {voucher}
    })
  }

  onPayPress = (voucher) => {
    this.props.navigator.push({
      screen: 'Scan',
      title: 'Scan QR-Code' ,
      backButtonTitle: 'Back',
      navigatorStyle: {
        tabBarHidden: true,          
        navBarButtonColor: Color.WHITE,
        drawUnderTabBar: true,          
      },
      passProps: {
        id: voucher.id,
        amount: voucher.balance
      },
    });    
  };

  onQrSendPress = () => {
    this.setState({ sendModal: false });    
    this.props.navigator.push({
      screen: 'ShareOnEmail',
      title: 'Share On Email',
      backButtonTitle: 'Back',
      navigatorButtons: {
        rightButtons: [{
          id: 'send',
          title: 'Send',
        }]
      },
      passProps: {
        id: this.voucherId,
        confirmType: Voucher.SENT,
        amount: this.voucherBalance
      },
    });
  };

  onSendPress = (voucher) => {    
    this.setState({ sendModal: true });
    this.voucherId = voucher.id;
    this.voucherBalance = voucher.balance;
  };

  onCancelPress = () => {
    this.setState({ sendModal: false });
  };

  onAllVouchers = () => {
    this.setState({showOnlyActiveVouchers: false});
  }

  onActiveVouchers = () => {
    this.setState({showOnlyActiveVouchers: true});
  }

  VoucherItem = (voucher) => {
    return(
      <VoucherItem key={voucher.id}
        onDetailsPress={ () => this.navigateToDetails(voucher) }
        onPayPress={ () => this.onPayPress(voucher) }
        onSendPress={ () => this.onSendPress(voucher) }
        voucher={voucher}/>
    );
  }

  render() {
    const hasVoucher = (this.props.vouchers.allVouchers.length > 0);
    const balance = this.props.vouchers.balance;

    let voucherItems = [];
    const allVouchers = this.props.vouchers.allVouchers;
    for(const voucher of allVouchers){
      // If this is SendVoucher screen, show only purchased and received vouchers,
      // otherwise show all vouchers
      if(this.props.sendVoucherScreen || this.state.showOnlyActiveVouchers) {
        if(voucher.status === Voucher.ACTIVE)
          voucherItems.unshift(this.VoucherItem(voucher));
      }
      else 
        voucherItems.unshift(this.VoucherItem(voucher));      
    }

    const selected = { color: Color.BLUE, backgroundColor: Color.WHITE };
    const unselected = { color: Color.WHITE, backgroundColor: Color.TRANSPARENT };
    const allVouchersButton = this.state.showOnlyActiveVouchers ? unselected : selected;
    const activeVouchersButton = this.state.showOnlyActiveVouchers ? selected : unselected;

    return (
      <Image resizeMode='cover' style={styles.container}
        source={require('../images/background.png')}>
        <Image style={styles.appLogo}
          source={require('../images/app-logo-small.png')}/>
        <View style={styles.topView}>
          <Text style={styles.totalBalance}>
            Total Balance
          </Text>
          <Text style={styles.balance}>
            $ {balance}.00
          </Text>
        </View>
        {
          hasVoucher ? 
          <View>
            { 
              this.props.sendVoucherScreen ? null :
              <View style={styles.filterButtons}>
                <TouchableOpacity style={styles.filterButton} onPress={this.onAllVouchers}>
                  <Text style={[styles.filterButtonText, allVouchersButton]}>
                    All Vouchers
                  </Text>
                </TouchableOpacity>       
                <TouchableOpacity style={styles.filterButton} onPress={this.onActiveVouchers}>
                  <Text style={[styles.filterButtonText, activeVouchersButton]}>
                    Active Vouchers
                  </Text>
                </TouchableOpacity>   
              </View>  
            }             
            <ScrollView vertical style={styles.scrollView}>
              {voucherItems}
            </ScrollView>
          </View>
          :
          <View style={styles.logoView}>
            <Image source={require('../images/voucher-logo.png')}/>
            <Text style={styles.buyYourText}>
              Buy Your First Voucher
            </Text>
          </View>
        }
        <Modal isVisible={this.state.sendModal}>
          <View style={styles.modalMainContainer}>
            <LinearGradient
              start={[0, 0]} end={[1, 0]}
              colors={['#ffffff', '#ccf2ff']}
              style={styles.modalContainer}>
              <View style={styles.modalQr}>
                <Text style={styles.modalQrText}>
                  Send QR Code
                </Text>
                <Image
                  style={styles.modalQrImage}
                  source={require('../images/qr-code.png')}/>
              </View>
              <TouchableOpacity
                onPress={this.onQrSendPress}
                style={styles.modalSend}>
                <Image source={require('../images/send.png')}/>
                <Text style={[styles.buttonText, {color: Color.RED}]}>
                  Send
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              onPress={this.onCancelPress}
              style={styles.modalCancel}>
              <Text style={styles.textCancel}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>        
      </Image>
    );
  }
}

const mapStateToProps = (state) => {
  return { vouchers: state.vouchers }
}

export default connect(mapStateToProps)(Vouchers);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: Color.BACKGROUND,
  },
  appLogo: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 0,
    bottom: 0,
  },
  topView: {
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  totalBalance: {
    color: Color.WHITE,
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  balance: {
    color: Color.WHITE,
    fontSize: 26,
    backgroundColor: 'transparent',
    marginTop: 5,
  },
  logoView: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyYourText: {
    color: Color.WHITE,
    fontSize: 20,
    backgroundColor: 'transparent',
    marginTop: 18,
  },
  scrollView: {
    marginTop: 10,
    marginBottom: 220,
  },
  textCancel: {
    fontSize: 20,
    color: '#007aff',
  },
  modalMainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: 474,
    borderRadius: 14,
    backgroundColor: '#000000',
    marginBottom: 15,
  },
  modalCancel: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  modalSend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  modalQr: {
    height: 418,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#3f3f3f',
    borderBottomWidth: 0.5,
  },
  modalQrImage: {
    marginTop: 31,
  },
  modalQrText: {
    backgroundColor: 'transparent',
    fontSize: 13,
    color: '#828282',
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 18,
    paddingHorizontal: 4
  },  
  filterButtons: {
    borderRadius: 5, 
    marginTop: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterButton: {
    width: Dimensions.get('window').width/2 - 10,
    height: 30,        
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: Color.WHITE,
    textAlign: 'center',    
  },  
  filterButtonText: {
    height: 30,            
    fontSize: 15,
    fontWeight: 'bold',    
    paddingTop: 5,
    textAlign: 'center',
  },
});
