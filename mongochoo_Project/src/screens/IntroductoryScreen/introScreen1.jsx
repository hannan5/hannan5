import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import logo from '../../assests/images/small-logo.png';
import intro1 from '../../assests/images/intro1.png';
import intro2 from '../../assests/images/into2.png';
import intro3 from '../../assests/images/intro3.png';

import SimpleButton from '../../components/Button/Button';
import {useState} from 'react';
import {FontFamily} from '../../assests/Constants/FontFamily';

const IntroScreen1 = ({navigation}) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const data = [
    {
      head: 'Any Service',
      para: 'An unlimited list of service providers at your finger tips.',
      img: intro1,
    },
    {
      head: 'Secure your plans',
      para: 'A world of service provision at your finger tips.',
      img: intro2,
    },
    {
      head: 'Serve, Grow and Inspire',
      para: 'Various service providers at your finger tips',
      img: intro3,
    },
  ];
  return (
    <>
      <SafeAreaView style={styles.maincontainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingLeft: '5%', paddingRight: '5%'}}>
            <View style={styles.uppersection}>
              <Image
                source={logo}
                style={{width: '15%', objectFit: 'contain'}}
              />
              <Text
                style={{color: '#000', fontSize: 17, ...FontFamily.Medium}}
                onPress={() => navigation.navigate('SignUp')}>
                Skip
              </Text>
            </View>
            {data.map((i, index) => (
              <View
                style={{display: currentScreen == index ? 'flex' : 'none'}}
                key={index}>
                <View style={styles.imgView}>
                  <Image source={intro1} style={styles.mainImg} />
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      textAlign: 'left',
                      fontSize: 44,
                      marginTop: 40,
                      fontWeight: 500,
                      ...FontFamily.SemiBold,
                      width: currentScreen == 0 ? '50%' : '100%',
                    }}>
                    {i.head}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: '#242424',
                      marginTop: 2,
                      ...FontFamily.Medium,
                    }}>
                    {i.para}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.bottomSection}>
              <View style={styles.slidercontainer}>
                <TouchableOpacity
                  style={styles.sliderbtn}
                  onPress={() => setCurrentScreen(0)}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.sliderbtn,
                    width: '25%',
                    backgroundColor: currentScreen == 0 ? '#DFDFDF' : '#000',
                  }}
                  onPress={() => setCurrentScreen(1)}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.sliderbtn,
                    width: '25%',
                    backgroundColor:
                      currentScreen == 0 || currentScreen == 1
                        ? '#DFDFDF'
                        : '#000',
                  }}
                  onPress={() => setCurrentScreen(1)}></TouchableOpacity>
              </View>
              <View style={{width: '40%'}}>
                <SimpleButton
                  name="Next"
                  onClick={() => {
                    currentScreen == 2
                      ? navigation.navigate('SignUp')
                      : setCurrentScreen(currentScreen + 1);
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default IntroScreen1;

const styles = StyleSheet.create({
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 80,
    marginBottom: 20,
    // backgroundColor: 'red',
    // height: '100%',
    // paddingBottom: '10%',
    // height: '100%',
  },
  slidercontainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderbtn: {
    backgroundColor: '#000',
    height: 10,
    borderRadius: 14,
    width: '45%',
  },
  maincontainer: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    // paddingLeft: '5%',
    // paddingRight: '5%',
    // backgroundColor: '#000',
  },
  uppersection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgView: {
    width: '100%',
    alignItems: 'center',
    paddingTop: '5%',
  },
  mainImg: {
    //   width: '100%',
    objectFit: 'contain',
    //   backgroundColor: '#000',
    resizeMode: 'contain',
    paddingTop: '1%',
    height: 280,
  },
});
