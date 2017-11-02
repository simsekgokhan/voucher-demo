
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  ScrollView, Button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VoucherItem from '../components/VoucherItem';
import { StackNavigator } from 'react-navigation';
import color from '../common/colors';

class VouchersScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Back',
  };

  render() {
    const hasVoucher = true;     
    const balance = hasVoucher ? '$ 500,689.08' : '$ 0';

    const { navigate } = this.props.navigation;
    const navigateToDetails = () => navigate('DetailsScreen', {user: ''});

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
                onDetailsPress={navigateToDetails} 
                typeStr={VoucherItem.REDEEM}/>
              <VoucherItem 
                onDetailsPress={navigateToDetails} 
                typeStr={VoucherItem.SENT}/>
              <VoucherItem 
                onDetailsPress={navigateToDetails} 
                typeStr={VoucherItem.PURCHASED}/>
              <VoucherItem 
                onDetailsPress={navigateToDetails} 
                typeStr={VoucherItem.RECEIVED}/>
              <VoucherItem 
                onDetailsPress={navigateToDetails} 
                typeStr={VoucherItem.REDEEM}/>
              <VoucherItem 
                onDetailsPress={navigateToDetails} 
                typeStr={VoucherItem.SENT}/>
              <VoucherItem 
                onDetailsPress={navigateToDetails} 
                typeStr={VoucherItem.PURCHASED}/>
              <VoucherItem 
                onDetailsPress={navigateToDetails} 
                typeStr={VoucherItem.RECEIVED}/>
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

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation })  => ({
    title: `Voucher ${navigation.state.params.user}`,
    headerTintColor: color.BLUE,    
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{backgroundColor: 'black', flex: 1}}>
        <Text style={{color: 'white'}}>
          Voucher No: {params.user}
        </Text>
      </View>
    );
  }
}

const Vouchers = StackNavigator({
  HomeScr: { 
    screen: VouchersScreen, 
    navigationOptions: {
      header: null,      
    }
  },
  DetailsScreen: { 
    screen: DetailsScreen ,
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