import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import identifyIcon from '../../assests/icons/identifyicon.png';
import UploadInput from '../../components/Input/uploadInput';
import SimpleButton from '../../components/Button/Button';
import locationIcon from '../../assests/icons/locationIcon.png';
import location from '../../assests/icons/location.png';
import location1 from '../../assests/icons/location1.png';
import CheckBoxIinpur from '../../components/Input/CheckBoxIinpur';
import arrow from '../../assests/icons/arrow-left.png';
import {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader/loader';
import Geolocation from '@react-native-community/geolocation';

export default function LocationAccess({navigation}) {
  const [focus, setFocus] = useState(false);
  const [location, setLocation] = useState(null);
  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(info => console.log(info));
  // }, []);
  const submitHandler = async () => {
    setLoader(true);
    AsyncStorage.setItem('login', 'true');
    navigation.navigate('Tabbar');
    setLoader(false);
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.maincontainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginTop: 40}}>
              <Image source={arrow} style={{...styles.mainImg, width: 40}} />
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                //   marginTop: 50,
              }}>
              <View style={styles.imgView}>
                <Image source={locationIcon} style={styles.mainImg} />
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={styles.head}>Location Acces</Text>
                <Text style={styles.para}>
                  To ensure that you have access to the best service, we need
                  your location.
                </Text>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 20}}>
              <TouchableOpacity
                style={{
                  ...styles.inputcontainer,
                  borderColor: focus ? '#000' : '#DFDFDF',
                  backgroundColor: focus ? '#000' : '#fff',
                }}
                onPress={() => {
                  // Geolocation.getCurrentPosition(info => console.log(info));
                  setFocus(!focus);
                }}>
                <Image
                  source={focus ? location1 : location}
                  style={{width: 30, objectFit: 'contain'}}
                />
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: '75%',
                    // backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      ...styles.inputStyle,
                      fontWeight: 500,
                      color: focus ? '#fff' : '#000',
                    }}>
                    Use current location
                  </Text>
                </View>

                <CheckBox
                  value={focus ? true : false}
                  tintColors={{true: '#fff', false: '#3B3B3B'}}
                  style={styles.checkbox}
                  // onChange ={e => console.log(e)}
                />
              </TouchableOpacity>
            </View>
            {/* <View style={{width: '100%', marginTop: 20}}>
              <UploadInput head={'Select Location'} icon={location} />
            </View> */}
            <View
              style={{
                alignItems: 'center',
                marginTop: 10,
                paddingBottom: 50,
                top: '4%',
              }}>
              <SimpleButton name="Continue" onClick={submitHandler} />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imgView: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: '5%',
    // backgroundColor: 'red',
  },
  mainImg: {
    objectFit: 'contain',
    paddingTop: '1%',
    // height: 80,
    width: 100,
    // backgroundColor: 'blue',
  },
  maincontainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    // backg?roundColor: '#000',
  },
  head: {
    color: '#000',
    textAlign: 'left',
    fontSize: 44,
    //   marginTop: 40,
    fontWeight: 500,
  },
  para: {fontSize: 17, color: '#8e8e8e', marginTop: 2},
  inputcontainer: {
    flexDirection: 'row',
    borderWidth: 2,
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    borderRadius: 17,
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  inputStyle: {
    color: '#000',
    fontSize: 17,
  },
  checkbox: {
    width: 25,
    borderColor: '#000',
    borderWidth: 2,
    color: '#0000',
    //   backgroundColor: '#000',
  },
});
