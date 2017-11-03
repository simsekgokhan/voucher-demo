
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  ScrollView, Button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VoucherItem from '../components/VoucherItem';
import { StackNavigator } from 'react-navigation';
import color from '../common/colors';
import VoucherDetails from '../screens/VoucherDetails';

class VouchersScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Back',
  };

  navigateToDetails = (voucherType) => { 
    const { navigate } = this.props.navigation;
    navigate('DetailsScreen', {voucherType: voucherType});
  }

  componentDidMount () {
    //this.navigateToDetails(VoucherItem.PURCHASED);
  }

  render() {
    const hasVoucher = true;     
    const balance = hasVoucher ? '$ 500,689.08' : '$ 0';

    const { navigate } = this.props.navigation;
    const navigateToDetails = (voucherType) => {  // todo: remove
      navigate('DetailsScreen', {voucherType: voucherType});
    }


    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={{color: 'rgba(255,255,255,0.7)'}}> 
              Total Balance 
          </Text>        
          <Text style={{color: 'white', fontSize: 20, marginTop: 5}}> {balance} </Text>        
        </View>
          {
            hasVoucher ? 
            <ScrollView vertical style={styles.scrollView}>
              <VoucherItem 
                onDetailsPress={() => this.navigateToDetails(VoucherItem.SENT)} 
                typeStr={VoucherItem.SENT}/>
              <VoucherItem 
                onDetailsPress={() => this.navigateToDetails(VoucherItem.RECEIVED)} 
                typeStr={VoucherItem.RECEIVED}/>
              <VoucherItem 
                onDetailsPress={() => this.navigateToDetails(VoucherItem.REDEEMED)} 
                typeStr={VoucherItem.REDEEMED}/>                        
              <VoucherItem 
                onDetailsPress={() => this.navigateToDetails(VoucherItem.PURCHASED)} 
                typeStr={VoucherItem.PURCHASED}/>
            </ScrollView>
            :            
            <View style={styles.logoView}>
              <Image
                style={{}}
                source={require('../images/voucher-logo.png')}
              />
              <Text style={{color: 'white', marginTop: 10}}> Buy Your First Voucher </Text>        
            </View>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  topView: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 350, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoView: {
    //bottom: Dimensions.get('window').height/2,     
    marginTop: 40,
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 20,
  },
  scrollView: {
    marginTop: 210,    
  }
});

const Vouchers = StackNavigator({
  HomeScr: { 
    screen: VouchersScreen, 
    navigationOptions: {
      header: null,      
    }
  },
  DetailsScreen: { 
    screen: VoucherDetails,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'black',  
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerBackTitleStyle: {
        color: color.BLUE,        
      }
    }
  },
});

export default Vouchers;