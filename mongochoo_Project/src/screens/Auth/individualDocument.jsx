import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import identifyIcon from '../../assests/icons/identifyicon.png';
import UploadInput from '../../components/Input/uploadInput';
import SimpleButton from '../../components/Button/Button';
import gallery from '../../assests/icons/gallery.png';
import document from '../../assests/icons/document-text.png';
import archived from '../../assests/icons/archive-book.png';
import {UploadKYC} from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import { indivdual} from '../../Schemas/Schema';
import Loader from '../../components/Loader/loader';

export default function IndividualIdentify({navigation}) {
  const [filedata, setFiledata] = useState([]);
  const [loader, setLoader] = useState(false);

  const initialValues = {
    profile_photo: '',
    national_id: '',
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
    validationSchema: indivdual,
    onSubmit: async (values, action) => {
      setLoader(true);
      const email = await AsyncStorage.getItem('Verify');
      const formData = new FormData();
      formData.append('email', email);
      formData.append('profile_photo', filedata?.profile_photo);
      formData.append('national_id', filedata?.national_id);
      UploadKYC(formData)
        .then(res => {
          console.log(res);
          navigation.navigate('account');
        })
        .catch(e => {
          console.log(e.response.data.message, 'e');
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
                <Text style={styles.head}>Identify Yourself</Text>
                <Text style={styles.para}>
                  Please upload the document below
                </Text>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 20, marginBottom: 20}}>
              <UploadInput
                head={'Profile Photo'}
                subhead={'Choose from camera roll'}
                icon={gallery}
                name={'profile_photo'}
                // onChangeText={handleChange('logo')}
                onBlur={handleBlur('profile_photo')}
                onSelect={e => setFieldValue('profile_photo', e)}
                setFiledata={setFiledata}
                filedata={filedata}
                pdf={false}
                //   iconfocus={identifyIcon}
              />
              {touched.profile_photo && errors.profile_photo && (
                <Text style={styles.errorText}>{errors.profile_photo}</Text>
              )}
            </View>
            {/* <View style={{width: '100%', marginTop: 20, marginBottom: 20}}>
              <UploadInput
                head={'Upload Business Registration'}
                subhead={'Pdf file'}
                icon={document}
                name={'business_registration'}
                // onChangeText={handleChange('logo')}
                onBlur={handleBlur('business_registration')}
                onSelect={e => setFieldValue('business_registration', e)}
                setFiledata={setFiledata}
                filedata={filedata}
              />
              {touched.business_registration &&
                errors.business_registration && (
                  <Text style={styles.errorText}>
                    {errors.business_registration}
                  </Text>
                )}
            </View> */}
            <View style={{width: '100%', marginTop: 20, marginBottom: 20}}>
              <UploadInput
                head={'Upload ID/Passport'}
                subhead={'Choose from camera roll'}
                icon={gallery}
                name={'national_id'}
                // onChangeText={handleChange('logo')}
                onBlur={handleBlur('national_id')}
                onSelect={e => setFieldValue('national_id', e)}
                setFiledata={setFiledata}
                filedata={filedata}
                pdf={false}
              />
              {touched.national_id && errors.national_id && (
                <Text style={styles.errorText}>{errors.national_id}</Text>
              )}
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
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
    paddingBottom: '2%',
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
    marginTop: 5,
    fontSize: 13,
    // marginBottom: 20,
  },
});
