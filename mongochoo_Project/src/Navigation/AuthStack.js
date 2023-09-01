import AccountType from '../screens/Auth/AccountType';
import LocationAccess from '../screens/Auth/LocationAccess';
import OtpVerification from '../screens/Auth/OTPVerification';
import SignUp from '../screens/Auth/SignupScreen';
import Identify from '../screens/Auth/identify';
import IndividualIdentify from '../screens/Auth/individualDocument';
import { SelectInterst } from '../screens/Auth/selectInterst';
import SignIn from '../screens/Auth/signIn';
import HomeScreen from '../screens/Dashboard/Home';
import IntroScreen1 from '../screens/IntroductoryScreen/introScreen1';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import TabNavigation from './BottomTabs';

const { createNativeStackNavigator } = require('@react-navigation/native-stack');

const navOptionHandler = () => ({
  headerShown: false,
});

const AuthStack = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <AuthStack.Navigator initialRouteName="splashScreen">
      <AuthStack.Screen
        name="splashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="intro"
        component={IntroScreen1}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signin"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="OtpVerification"
        component={OtpVerification}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="identify"
        component={Identify}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="indivdual"
        component={IndividualIdentify}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="account"
        component={AccountType}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="interst"
        component={SelectInterst}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="location"
        component={LocationAccess}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Tabbar"
        component={TabNavigation}
        options={navOptionHandler}
      />
    </AuthStack.Navigator>
  );
};
