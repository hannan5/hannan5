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
import DocumentPicker from 'react-native-document-picker';
export default UploadInput = ({
  head,
  subhead,
  icon,
  iconfocus,
  onSelect,
  setFiledata,
  filedata,
  name,
  pdf,
}) => {
  const [focus, setFocus] = useState(false);
  async function galleryaccess() {
    const options = {
      mediaType: 'application/pdf',
    };
    try {
      const result = await ImagePicker.launchImageLibrary(options);
      onSelect(result.assets[0].uri);
      // console.log(result.assets[0].uri.split('file:/').join(''));
      const obj = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      };
      setFiledata({...filedata, [name]: obj});

      setFocus(true);
    } catch (error) {
      console.log(error, 'error');
    }
  }
  const pdfaccess = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      onSelect(res[0].uri);
      const obj = {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].fileName,
      };
      setFiledata({...filedata, [name]: obj});
      setFocus(true);
    } catch (error) {
      console.log('Error selecting PDF:', error);
    }
  };
  return (
    <>
      <TouchableOpacity
        style={{
          ...styles.inputcontainer,
          borderColor: focus ? '#6EBE51' : '#DFDFDF',
          backgroundColor: focus ? '#6EBE51' : '#fff',
        }}
        onPress={() => {
          pdf ? pdfaccess() : galleryaccess();
        }}>
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
              color: focus ? '#fff' : '#000',
            }}>
            {head}
          </Text>
          {subhead && (
            <Text
              style={{
                ...styles.inputStyle,
                fontWeight: 300,
                color: focus ? '#fff' : '#000',
              }}>
              {subhead}
            </Text>
          )}
        </View>
        {focus ? (
          <>
            <CheckBox
              value={true}
              tintColors={{true: '#fff', false: '#3B3B3B'}}
              style={styles.checkbox}
            />
          </>
        ) : (
          <Image
            source={exporticon}
            style={{width: 30, objectFit: 'contain'}}
          />
        )}
      </TouchableOpacity>
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
    // marginBottom: 20,
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
