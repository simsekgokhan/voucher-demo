import { Navigation } from 'react-native-navigation';

import Vouchers from './src/screens/Vouchers';
import BuyVoucher from './src/screens/BuyVoucher';
import Receive from './src/screens/Receive';
import More from './src/screens/More';
import Login from './src/screens/Login';

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
