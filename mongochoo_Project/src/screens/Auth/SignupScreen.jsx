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
import {signUpSchema} from '../../Schemas/Schema';
import React, {useState} from 'react';
import {sendOtp, signup} from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader/loader';

const SignUp = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [Error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const forumsNames = [
    'Info sharing',
    'Business',
    'Food & Dining',
    'Entertainment',
    'Baby Care/Child Education',
    'Talk',
  ];

  const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    phone_no: '',
    email: '',
    password: '',
    user_type: '',
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
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      setLoader(true);
      console.log('Submitted values:', values);
      signup({
        ...values,
        phone_no: Number(values.phone_no),
        terms_and_condition: 1,
      })
        .then(res => {
          console.log('res', res.data);
          sendOtp({email: values.email});
          // console.log(values.email);
          AsyncStorage.setItem('Verify', values.email);
          AsyncStorage.setItem('role', values.user_type);
          AsyncStorage.setItem('token', res?.data?.data?.token);
          AsyncStorage.setItem('name', res?.data?.data?.username);
          navigation.navigate('OtpVerification');
        })
        .catch(e => {
          console.log(e, 'error');
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
                Sign Up
              </Text>
              <Text
                style={{
                  color: '#8E8E8E',
                  fontSize: 17,
                  lineHeight: 17,
                  marginTop: 15,
                  ...FontFamily.Medium,
                }}>
                Hi Create Your Mchongoo Account
              </Text>
            </View>

            <View style={styles.signupfieldContainer}>
              <View style={styles.fieldRow}>
                <View style={{width: '48%'}}>
                  <InputField
                    placeholder={'First Name'}
                    icon={user}
                    iconfocus={blackuser}
                    name={'first_name'}
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                  />
                  {touched.first_name && errors.first_name && (
                    <Text style={styles.errorText}>{errors.first_name}</Text>
                  )}
                </View>
                <View style={{width: '48%'}}>
                  <InputField
                    placeholder={'Last Name'}
                    icon={user}
                    iconfocus={blackuser}
                    name={'last_name'}
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                  />
                  {touched.last_name && errors.last_name && (
                    <Text style={styles.errorText}>{errors.last_name}</Text>
                  )}
                </View>
              </View>
              <View style={{width: '100%', marginBottom: 15}}>
                <InputField
                  placeholder={'Username'}
                  icon={user}
                  iconfocus={blackuser}
                  name={'username'}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
              </View>

              <View style={{width: '100%', marginBottom: 15}}>
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

              <View style={{width: '100%', marginBottom: 15}}>
                <InputField
                  placeholder={'Phone Number'}
                  icon={call}
                  iconfocus={call2}
                  name={'phone_no'}
                  onChangeText={handleChange('phone_no')}
                  onBlur={handleBlur('phone_no')}
                  keyboardType={'numeric'}
                />
                {touched.phone_no && errors.phone_no && (
                  <Text style={styles.errorText}>{errors.phone_no}</Text>
                )}
              </View>

              <View style={{width: '100%', marginBottom: 15}}>
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
              <View style={{width: '100%', marginBottom: 15}}>
                <Dropdown
                  options={forumsNames}
                  icon={user}
                  iconfocus={blackuser}
                  placeholder={'Select Role'}
                  name={'user_type'}
                  onBlur={handleBlur('user_type')}
                  onSelect={e => setFieldValue('user_type', e)}
                />
                {touched.user_type && errors.user_type && (
                  <Text style={styles.errorText}>{errors.user_type}</Text>
                )}
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginBottom: 15,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <CheckBox
                  tintColors={{true: '#000', false: '#000'}}
                  style={styles.checkbox}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    paddingLeft: 5,
                    ...FontFamily.Medium,
                  }}>
                  I agree to the Terms & Conditions
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{...styles.errorText}}>{Error}</Text>
              </View>

              <SimpleButton
                name="Sign up"
                //   onClick={() => navigation.navigate('OtpVerification')}
                onClick={handleSubmit}
                disabled={!toggleCheckBox ? true : false}
              />
              <View
                style={{width: '100%', alignItems: 'center', marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#DFDFDF',
                    ...FontFamily.Medium,
                  }}>
                  Already have an account?,
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Signin')}
                    style={{color: '#000'}}>
                    <Text style={{color: '#000'}}>Sign in</Text>
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
export default SignUp;

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
    paddingTop: '6%',
    marginBottom: '3%',
    alignItems: 'center',
  },
  signupfieldContainer: {
    marginTop: 20,
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  checkbox: {
    width: 25,
    borderWidth: 2,
    color: '#0000',
    borderRadius: 7,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 13,
  },
});
