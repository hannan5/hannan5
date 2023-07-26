import React, {useEffect} from 'react';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import IntroScreen1 from './src/screens/IntroductoryScreen/introScreen1';
import SignUp from './src/screens/Auth/SignupScreen';
import OtpVerification from './src/screens/Auth/OTPVerification';
import Identify from './src/screens/Auth/identify';
import AccountType from './src/screens/Auth/AccountType';
import LocationAccess from './src/screens/Auth/LocationAccess';
import {SelectInterst} from './src/screens/Auth/selectInterst';
import Routes from './src/Navigation/Routes';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from './src/screens/Auth/signIn';
import {Provider} from 'react-redux';
import {Store} from './src/Store/Store';

function App() {
  // setTimeout(() => {
  //   return <SplashScreen />;
  // }, 2000);
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
