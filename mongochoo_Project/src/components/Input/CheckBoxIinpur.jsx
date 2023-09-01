import {useState} from 'react';

const {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} = require('react-native');
import CheckBox from '@react-native-community/checkbox';
import exporticon from '../../assests/icons/export.png';
import * as ImagePicker from 'react-native-image-picker';

export default CheckInput = ({head, subhead, icon, onBlur, onSelect}) => {
  const [focus, setFocus] = useState(3);
  // console.log(focus);
  let data = [
    {
      head: 'Serve',
      subhead: 'Post or share your work',
      db: 'serve',
    },
    {
      head: 'Seek',
      subhead: 'Search or find a service',
      db: 'seek',
    },
  ];
  return (
    <>
      {data.map((i, index) => (
        <TouchableOpacity
          style={{
            ...styles.inputcontainer,
            borderColor: focus == index ? '#3BA0D1' : '#DFDFDF',
            backgroundColor: focus == index ? '#3BA0D1' : '#fff',
          }}
          onPress={() => {
            setFocus(index);
            onSelect(i.db);
          }}
          key={index}>
          <Image source={icon} style={{width: 30, objectFit: 'contain'}} />
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
                color: focus == index ? '#fff' : '#000',
              }}>
              {i.head}
            </Text>
            <Text
              style={{
                ...styles.inputStyle,
                fontWeight: 300,
                color: focus == index ? '#fff' : '#000',
              }}>
              {i.subhead}
            </Text>
          </View>

          <CheckBox
            value={focus == index ? true : false}
            tintColors={{true: '#fff', false: '#3B3B3B'}}
            style={styles.checkbox}
            // onChange ={e => console.log(e)}
          />
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
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
