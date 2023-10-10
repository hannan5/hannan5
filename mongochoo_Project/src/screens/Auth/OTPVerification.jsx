import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import logo from '../../assests/images/logoBg.png';
import otpIcon from '../../assests/icons/otpicon.png';
import CustomOTPInput from '../../components/Input/OtpInput';
import arrow from '../../assests/icons/arrow-left.png';
import SimpleButton from '../../components/Button/Button';
import {FontFamily} from '../../assests/Constants/FontFamily';
import {useFormik} from 'formik';
import {OtpSchema} from '../../Schemas/Schema';
import {ResendOtp, matchOtp, sendOtp} from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import Loader from '../../components/Loader/loader';

const OtpVerification = ({navigation}) => {
  const initialValues = {
    code: '',
  };
  const [Error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  const getEmail = async () => {
    const email = await AsyncStorage.getItem('Verify');
    setEmail(email);
  };
  useEffect(() => {
    getEmail();
  }, []);
  const resend = async () => {
    const email = await AsyncStorage.getItem('Verify');
    ResendOtp({email: email});
  };
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: OtpSchema,
    onSubmit: async (values, action) => {
      setLoader(true);
      const email = await AsyncStorage.getItem('Verify');
      const role = await AsyncStorage.getItem('role');
      // console.log({otp: Number(values.code), email: email});
      matchOtp({otp: Number(values.code), email: email})
        .then(res => {
          role == 'Business'
            ? navigation.navigate('identify')
            : navigation.navigate('indivdual');
        })
        .catch(e => {
          setError(e.response.data.message);
          setTimeout(() => {
            setError('');
          }, 2000);
        })
        .finally(() => {
          setLoader(false);
        });
    },
  });
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SafeAreaView
          style={{
            backgroundColor: '#fff',
            flex: 1,
            paddingLeft: '5%',
            paddingRight: '5%',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginTop: 20}}>
              <Image source={arrow} style={{width: 40, objectFit: 'contain'}} />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={logo}
                style={{
                  width: '60%',
                  objectFit: 'contain',
                }}
              />
              <Image
                source={otpIcon}
                style={{
                  objectFit: 'contain',
                  height: 220,
                }}
              />
              <Text
                style={{
                  fontSize: 35,
                  color: '#000',
                  marginTop: 20,
                  fontWeight: 500,
                  ...FontFamily.SemiBold,
                }}>
                OTP Verification
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: '#6A6A6A',
                  marginTop: 20,
                  ...FontFamily.Medium,
                }}>
                Enter an OTP Code sent to {email}
              </Text>
              {/* <View> */}
              <CustomOTPInput
                digitCount={6}
                name={'code'}
                onChangeText={handleChange('code')}
                onBlur={handleBlur('code')}
                onSelect={e => setFieldValue('code', e)}
              />
              {touched.code && errors.code && (
                <Text style={styles.errorText}>{errors.code}</Text>
              )}
              {/* </View> */}
              <Text
                style={{
                  fontSize: 18,
                  color: '#DFDFDF',
                  marginTop: 30,
                  ...FontFamily.Medium,
                }}>
                Did'nt receive OTP Code?
                <Text style={{color: '#000'}} onPress={resend}>
                  {' '}
                  Resend Code
                </Text>
              </Text>
              <Text style={{...styles.errorText, marginBottom: 10}}>
                {Error}
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 20,
                  paddingBottom: 30,
                }}>
                <SimpleButton
                  name="Verify & Proceed"
                  onClick={() => handleSubmit()}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 13,
  },
  //   SingupContainer: {
  //     flex: 1,
  //     // padding: '3%',
  //     paddingHorizontal: '5%',
  //     backgroundColor: '#fff',
  //   },
  //   signupUpper: {
  //     // flex: 0.12,
  //     paddingHorizontal: '5%',
  //     paddingTop: '8%',
  //     alignItems: 'center',
  //   },
});
