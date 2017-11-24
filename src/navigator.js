import { Navigation } from 'react-native-navigation';
import { Provider } from "react-redux";
import store from "./store";
import { deleteAllVouchers } from "./actions/vouchersAction";
import { resetVoucherIds, resetTime } from './model/voucher.model';

import Vouchers from './screens/Vouchers';
import BuyVoucher from './screens/BuyVoucher';
import Receive from './screens/Receive';
import More from './screens/More';
import Login from './screens/Login';
import VoucherDetails from './screens/VoucherDetails';
import ConfirmScreen from './screens/ConfirmScreen';
import MyWallet from './screens/MyWallet';
import CardRegister from './screens/CardRegister';
import HoldCard from './screens/HoldCard';
import AddCard from './screens/AddCard';
import Settings from './screens/Settings';
import ShareOnEmail from './screens/ShareOnEmail';
import ShareOnEmailSend from './screens/ShareOnEmailSend';
import ScanQrCode from './screens/ScanQrCode';
import ChangeTheme from './screens/ChangeTheme';

import Color from './common/colors';

export function startApp() {
  disableWarnings();  
  registerScreens();
  startSingleScreenApp();
}

// This function should not be used as soon as production development starts.
// The reason of using this function is to get rid of too many Image related warnings.
function disableWarnings() {
  console.disableYellowBox = true;   
}

function registerScreens() {
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
  Navigation.registerComponent('Settings', () => Settings);
  Navigation.registerComponent('ShareOnEmail', () => ShareOnEmail);
  Navigation.registerComponent('ShareOnEmailSend', () => ShareOnEmailSend);
  Navigation.registerComponent('ScanQrCode', () => ScanQrCode, store, Provider);
  Navigation.registerComponent('ChangeTheme', () => ChangeTheme, store, Provider);
}

export function startSingleScreenApp() {
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
      navBarBackgroundColor: Color.BACKGROUND,
      tabBarBackgroundColor: Color.BACKGROUND,
      screenBackgroundColor: Color.BACKGROUND,                              
    }
  });
}

export function startTabBasedApp(initialTabIdx=0) {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Vouchers',
        screen: 'Vouchers',
        icon: require('./images/vouchers.png'),
        selectedIcon: require('./images/vouchers-active.png'),
        title: 'Vouchers',
        navigatorStyle: {
          navBarHidden: true, 
          navBarButtonColor: Color.WHITE,
        },
      },
      {
        label: 'Buy Voucher',
        screen: 'BuyVoucher',
        icon: require('./images/buy.png'),
        selectedIcon: require('./images/buy-active.png'),
        title: 'Buy Voucher',
        navigatorStyle: {
          navBarButtonColor: Color.WHITE,
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
        icon: require('./images/receive.png'),
        selectedIcon: require('./images/receive-active.png'),
        title: 'Receive',
        drawUnderTabBar: true,
        navigatorStyle: {
          tabBarHidden: true,          
          navBarButtonColor: Color.WHITE,
          drawUnderTabBar: true,          
        },
      },
      {
        label: 'More',
        screen: 'More',
        icon: require('./images/more.png'),
        selectedIcon: require('./images/more-active.png'),
        title: 'More',
        navigatorStyle: {
          navBarHidden: true,
          navBarButtonColor: Color.WHITE,
        },
      },
    ],
    appStyle: {
      forceTitlesDisplay: false, 
      navBarBackgroundColor: Color.BACKGROUND_BLUE,
      screenBackgroundColor: Color.BACKGROUND,   
      navBarTextColor: Color.WHITE,                  
    }, 
    tabsStyle: {
      tabBarBackgroundColor: Color.BACKGROUND,   
      initialTabIndex: initialTabIdx,     
    }     
  });
}


