import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import identifyIcon from '../../assests/icons/accountIcon.png';
import user from '../../assests/icons/user.png';
import CheckInput from '../../components/Input/CheckBoxIinpur';
import SimpleButton from '../../components/Button/Button';
import courthouse from '../../assests/icons/courthouse.png';
import {useFormik} from 'formik';
import {accountUsage} from '../../Api';
import {accountUsagSchema} from '../../Schemas/Schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import Loader from '../../components/Loader/loader';

export default function AccountType({navigation}) {
  const initialValues = {
    account_usage: '',
  };
  const [loader, setLoader] = useState(false);

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
    validationSchema: accountUsagSchema,
    onSubmit: async (values, action) => {
      setLoader(true);
      const email = await AsyncStorage.getItem('Verify');
      console.log(values);
      let body = {
        ...values,
        email: email,
      };
      accountUsage(body)
        .then(res => {
          navigation.navigate('interst');
        })
        .catch(e => {})
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
        <SafeAreaView style={styles.maincontainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginTop: 30,
              }}>
              <View style={styles.imgView}>
                <Image source={identifyIcon} style={styles.mainImg} />
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={styles.head}>Choose your Account type</Text>
                <Text style={styles.para}>What are you looking for?</Text>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 30}}>
              <CheckInput
                icon={user}
                onBlur={handleBlur('account_usage')}
                onSelect={e => setFieldValue('account_usage', e)}
              />
            </View>
            <View style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
              {touched.account_usage && errors.account_usage && (
                <Text style={styles.errorText}>{errors.account_usage}</Text>
              )}
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <SimpleButton name="Continue" onClick={handleSubmit} />
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
    // backgroundColor: '#000',
  },
  head: {
    color: '#000',
    textAlign: 'left',
    fontSize: 44,
    //   marginTop: 40,
    fontWeight: 500,
  },
  para: {fontSize: 17, color: '#8e8e8e', marginTop: 2},
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});
