import { Navigation } from 'react-native-navigation';
import { Provider } from "react-redux";
import store from "./src/store";
import { deleteAllVouchers } from "./src/actions/vouchersAction";
import { resetVoucherIds, resetTime } from './src/model/voucher.model';

import Vouchers from './src/screens/Vouchers';
import BuyVoucher from './src/screens/BuyVoucher';
import Receive from './src/screens/Receive';
import More from './src/screens/More';
import Login from './src/screens/Login';
import VoucherDetails from './src/screens/VoucherDetails';
import ConfirmScreen from './src/screens/ConfirmScreen';
import MyWallet from './src/screens/MyWallet';
import CardRegister from './src/screens/CardRegister';
import HoldCard from './src/screens/HoldCard';
import AddCard from './src/screens/AddCard';
import SendVoucher from './src/screens/SendVoucher';
import Settings from './src/screens/Settings';
import ShareOnEmail from './src/screens/ShareOnEmail';
import ShareOnEmailSend from './src/screens/ShareOnEmailSend';
import ScanQrCode from './src/screens/ScanQrCode';
import ChangeTheme from './src/screens/ChangeTheme';

import Color from './src/common/colors';

// Tab root screens
Navigation.registerComponent('Vouchers', () => Vouchers, store, Provider);
Navigation.registerComponent('BuyVoucher', () => BuyVoucher, store, Provider);
Navigation.registerComponent('Receive', () => Receive, store, Provider);
Navigation.registerComponent('More', () => More, store, Provider);
Navigation.registerComponent('Login', () => Login, store, Provider);

// Stackable screens
Navigation.registerComponent('VoucherDetails', () => VoucherDetails);
Navigation.registerComponent('ConfirmScreen', () => ConfirmScreen, store, Provider);
Navigation.registerComponent('MyWallet', () => MyWallet);
Navigation.registerComponent('CardRegister', () => CardRegister);
Navigation.registerComponent('HoldCard', () => HoldCard);
Navigation.registerComponent('AddCard', () => AddCard);
Navigation.registerComponent('SendVoucher', () => SendVoucher);
Navigation.registerComponent('Settings', () => Settings);
Navigation.registerComponent('ShareOnEmail', () => ShareOnEmail);
Navigation.registerComponent('ShareOnEmailSend', () => ShareOnEmailSend);
Navigation.registerComponent('ScanQrCode', () => ScanQrCode, store, Provider);
Navigation.registerComponent('ChangeTheme', () => ChangeTheme, store, Provider);

// Main app entrance here
startSingleScreenApp();

export function startSingleScreenApp(){
  resetVoucherIds();
  resetTime();

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'Login',
      title: 'Login',
      navigatorStyle: {
        navBarHidden: true
      }
    },
    appStyle: {
      forceTitlesDisplay: false,
      navBarBackgroundColor: 'black',
      tabBarBackgroundColor: 'black',
      screenBackgroundColor: 'black',                              
    }
  });
}

export function startTabBasedApp(initialTabIdx=0) {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Vouchers',
        screen: 'Vouchers',
        icon: require('./src/images/voucher.png'),
        selectedIcon: require('./src/images/voucher-active.png'),
        title: 'Vouchers',
        navigatorStyle: {
          navBarHidden: true, 
          navBarTextColor: 'white',
          navBarButtonColor: Color.BLUE,
        },
      },
      {
        label: 'Buy Voucher',
        screen: 'BuyVoucher',
        icon: require('./src/images/buy-voucher.png'),
        selectedIcon: require('./src/images/buy-voucher-active.png'),
        title: 'Buy Voucher',
        navigatorStyle: {
          navBarTextColor: 'white',
          navBarButtonColor: Color.BLUE,
        },
        navigatorButtons: {
          rightButtons: [{
            id: 'buy',
            title: 'Buy',    
          }]
        }  
      },
      {
        label: 'Receive',
        screen: 'Receive',
        icon: require('./src/images/receive.png'),
        selectedIcon: require('./src/images/receive-active.png'),
        title: 'Receive',
        drawUnderTabBar: true,
        navigatorStyle: {
          tabBarHidden: true,          
          navBarTextColor: 'white',
          navBarButtonColor: Color.BLUE,
          drawUnderTabBar: true,
          tabBarBackgroundColor: 'black',  
        },
      },
      {
        label: 'More',
        screen: 'More',
        icon: require('./src/images/more.png'),
        selectedIcon: require('./src/images/more-active.png'),
        title: 'More',
        navigatorStyle: {
          navBarHidden: true,
          navBarTextColor: 'white',
          navBarButtonColor: Color.BLUE,
        },
      },
    ],
    appStyle: {
      forceTitlesDisplay: false, 
      navBarBackgroundColor: 'black',
      screenBackgroundColor: 'black',                        
    }, 
    tabsStyle: {
      tabBarBackgroundColor: 'black',   
      initialTabIndex: initialTabIdx,     
    }     
  });
}


