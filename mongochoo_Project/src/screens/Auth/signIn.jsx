import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  //   CheckBox,
} from 'react-native';
// import {CheckBox} from '@react-native-community/checkbox ';
import logo from '../../assests/images/small-logo.png';
import {InputField} from '../../components/Input/inputfield';
import user from '../../assests/icons/user.png';
import sms from '../../assests/icons/sms.png';
import lock from '../../assests/icons/lock.png';
import call from '../../assests/icons/call.png';
import sms2 from '../../assests/icons/sms-black.png';
import lock2 from '../../assests/icons/lock-black.png';
import call2 from '../../assests/icons/call-back.png';
import buissenes from '../../assests/icons/bussines.png';
import blackuser from '../../assests/icons/user-black.png';
import SimpleButton from '../../components/Button/Button';
import Dropdown from '../../components/Input/Dropdown';
import CheckBox from '@react-native-community/checkbox';
import {FontFamily} from '../../assests/Constants/FontFamily';
import {useFormik} from 'formik';
import {loginSchema, signUpSchema} from '../../Schemas/Schema';
import React, {useState} from 'react';
import {login, sendOtp, signup} from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader/loader';

const SignIn = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [Error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  const initialValues = {
    email: '',
    password: '',
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
    validationSchema: loginSchema,
    onSubmit: (values, action) => {
      setLoader(true);
      // console.log('Submitted values:', values);
      login(values)
        .then(async res => {
          await AsyncStorage.setItem('name', res?.data?.data?.username);
          await AsyncStorage.setItem('login', 'true');
          AsyncStorage.setItem('token', res?.data?.data?.token);
          navigation.navigate('Tabbar');
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
        <SafeAreaView style={styles.SingupContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.signupUpper}>
              <Image
                source={logo}
                style={{width: '35%', objectFit: 'contain'}}
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: 38,
                  fontSize: 24,
                  lineHeight: 29,
                  paddingVertical: 5,
                  marginTop: 20,
                  ...FontFamily.Bold,
                }}>
                Sign In
              </Text>
            </View>

            <View style={styles.signupfieldContainer}>
              <View style={{width: '100%', marginBottom: 20}}>
                <InputField
                  placeholder={'Email'}
                  icon={sms}
                  iconfocus={sms2}
                  name={'email'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={{width: '100%', marginBottom: 20}}>
                <InputField
                  placeholder={'Password'}
                  icon={lock}
                  iconfocus={lock2}
                  name={'password'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{...styles.errorText, marginBottom: 10}}>
                  {Error}
                </Text>
              </View>
              <SimpleButton
                name="Login"
                //   onClick={() => navigation.navigate('OtpVerification')}
                onClick={handleSubmit}
                //   disabled={!toggleCheckBox ? true : false}
              />
              <View
                style={{width: '100%', alignItems: 'center', marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#DFDFDF',
                    ...FontFamily.Medium,
                  }}>
                  Create a new account?,
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    style={{color: '#000'}}>
                    <Text style={{color: '#000'}}> Sign up</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  SingupContainer: {
    flex: 1,
    padding: '3%',
    paddingHorizontal: '5%',
    backgroundColor: '#fff',
  },
  signupUpper: {
    // flex: 0.12,
    paddingHorizontal: '5%',
    paddingTop: '10%',
    marginBottom: '3%',
    alignItems: 'center',
  },
  signupfieldContainer: {
    marginTop: '20%',
    justifyContent: 'center',
    // backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center', // height: '70%',
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkbox: {
    width: 25,
    // borderColor: '#000',
    borderWidth: 2,
    color: '#0000',
    borderRadius: 7,
    // backgroundColor: '#000',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 13,
  },
});
