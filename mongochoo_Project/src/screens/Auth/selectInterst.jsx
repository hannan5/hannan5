import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import arrow from '../../assests/icons/arrow-left.png';
import interstIcon from '../../assests/icons/interstIcon.png';
import UploadInput from '../../components/Input/uploadInput';
import SimpleButton from '../../components/Button/Button';
import CheckBox from '@react-native-community/checkbox';
import {GetInterst, PostInterst} from '../../Api';
import Loader from '../../components/Loader/loader';

export function SelectInterst({navigation}) {
  const [focus, setFocus] = useState(false);
  const [allInterst, setAllInterst] = useState([]);
  const [select, setSelect] = useState([]);
  const [Error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  const interst = [
    'Audit',
    'Graphics Design',
    'Illustration',
    'Photography',
    'Art',
    'Animation',
    'Film',
    'Social Media',
    'Website Design',
    'Marketing',
    'UI Design',
    'Ads',
    'App Development',
    '3D Design',
  ];
  const getInterst = () => {
    GetInterst()
      .then(res => {
        console.log(res.data.data, 'res');
        setAllInterst(res.data.data);
      })
      .catch(e => {
        console.log(e, 'e');
      })
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getInterst();
  }, []);

  const onclickHandler = item => {
    let temp = select.filter(ite => ite == item.id);
    if (temp.length == 0) {
      setSelect([...select, item.id]);
    } else {
      setSelect(select.filter(ite => ite != item.id));
    }
  };
  const submitHandler = () => {
    setLoader(true);
    if (select.length == 0) {
      setError('Please select atleast 1 interst');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      PostInterst(select)
        .then(res => {
          navigation.navigate('location');
        })
        .catch(e => {
          console.log(e?.response?.data?.message);
        })
        .finally(() => {
          setLoader(false);
        });
    }
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
                // marginTop: 5,
              }}>
              <View style={styles.imgView}>
                <Image source={interstIcon} style={styles.mainImg} />
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={styles.head}>Select your interest</Text>
                <Text style={styles.para}>What are you interest in?</Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {allInterst.map((i, index) => (
                <SelectedBox
                  focus={i.id == select.filter(ite => ite == i.id)}
                  setFocus={setFocus}
                  i={i}
                  index={index}
                  key={index}
                  onClick={() => {
                    onclickHandler(i);
                  }}
                />
              ))}
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{...styles.errorText, marginBottom: 10}}>
                {Error}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 10,
                paddingBottom: 20,
              }}>
              <SimpleButton name="Continue" onClick={submitHandler} />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

export const SelectedBox = ({setFocus, focus, i, index, onClick}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.inputView,
        borderColor: focus ? '#6EBE51' : '#DFDFDF',
        backgroundColor: focus ? '#6EBE51' : '#fff',
      }}
      key={index}
      onPress={onClick}>
      <CheckBox
        value={focus}
        tintColor="#000"
        style={styles.checkbox}
        tintColors={{true: '#fff', false: '#3B3B3B'}}
      />
      <Text style={{...styles.inputText, color: focus ? '#fff' : '#000'}}>
        {i.name}
      </Text>
    </TouchableOpacity>
  );
};
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
  checkbox: {
    width: 25,
    borderColor: '#000',
    borderWidth: 2,
    color: '#0000',
  },
  inputView: {
    borderWidth: 2,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: 100,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#D2D2D2',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  inputText: {
    color: '#000',
    fontSize: 17,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 13,
  },
});
