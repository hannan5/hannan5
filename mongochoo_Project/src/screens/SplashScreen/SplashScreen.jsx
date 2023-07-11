import {SafeAreaView, View, Image} from 'react-native';
import logo from '../../assests/images/logoBg.png';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const navigateScreen = async () => {
    const check = await AsyncStorage.getItem('firsttime');
    const login = await AsyncStorage.getItem('login');
    // console.log(check);
    if (check == 'true') {
      if (login == 'true') {
        navigation.navigate('Tabbar');
      } else {
        navigation.navigate('Signin');
      }
    } else {
      AsyncStorage.setItem('firsttime', 'true');
      navigation.navigate('intro');
    }
  };

  setTimeout(() => {
    navigateScreen();
  }, 1000);

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Image source={logo} style={{width: '60%', objectFit: 'contain'}} />
        </View>
      </SafeAreaView>
    </>
  );
};
export default SplashScreen;
