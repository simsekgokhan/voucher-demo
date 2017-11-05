import { Navigation } from 'react-native-navigation';

import Vouchers from './src/screens/Vouchers';
import BuyVoucher from './src/screens/BuyVoucher';
import Receive from './src/screens/Receive';
import More from './src/screens/More';
import Login from './src/screens/Login';

import color from './src/common/colors';

Navigation.registerComponent('Vouchers', () => Vouchers);
Navigation.registerComponent('BuyVoucher', () => BuyVoucher);
Navigation.registerComponent('Receive', () => Receive);
Navigation.registerComponent('More', () => More);
Navigation.registerComponent('Login', () => Login);

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
  }
});

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
          navBarHidden: true
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
          navBarButtonColor: color.BLUE,
        },
        navigatorStyle: {
          navBarHidden: true
        },
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
          navBarButtonColor: color.BLUE,
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
      },
    ],
    appStyle: {
      forceTitlesDisplay: false, 
      navBarBackgroundColor: 'black',
    }, 
    tabsStyle: {
      tabBarBackgroundColor: 'black',   
      initialTabIndex: initialTabIdx,     
    }     
  });
}


