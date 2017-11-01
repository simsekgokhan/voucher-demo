import { Navigation } from 'react-native-navigation';

import Screen1 from './src/screens/Screen1';
import Screen2 from './src/screens/Screen2';
import Login from './src/screens/Login';

  Navigation.registerComponent('Screen1', () => Screen1);
  Navigation.registerComponent('Screen2', () => Screen2);
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
      forceTitlesDisplay: false
    }      
  });

//   // Navigation.startTabBasedApp({
//   //   tabs: [
//   //     {
//   //       label: 'Buy Voucher',
//   //       screen: 'Screen1',
//   //       icon: require('./src/images/icon1.png'),
//   //       selectedIcon: require('./src/images/icon1_selected.png'),
//   //       title: 'Buy Voucher'
//   //     },
//   //     {
//   //       label: 'Voucher',
//   //       screen: 'Screen2',
//   //       icon: require('./src/images/icon2.png'),
//   //       selectedIcon: require('./src/images/icon2_selected.png'),
//   //       title: 'Voucher'
//   //     },
//   //   ]
//   // });

//   // Navigation.showModal({screen: 'Login'});
  


// import React, { Component } from 'react';
// import { Image, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
// import { Navigation } from 'react-native-navigation';
// import LoginForm from './src/components/LoginForm';
// import Screen1 from './src/screens/Screen1';
// import Screen2 from './src/screens/Screen2';

// export default class App extends Component<{}> {
//   render() {
//     return (
//       <KeyboardAvoidingView behavior='padding' style={styles.container}>
//         <View style={styles.logoCon}>
//           <Image 
//             style={styles.logo}
//             source={require('./src/images/octocat.png')} 
//           />
//         </View>    
//         <LoginForm />
//       </KeyboardAvoidingView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#3498db',
//   },
//   logoCon: {
//     alignItems: 'center',
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 100,
//     height: 100,
//   },
// });
