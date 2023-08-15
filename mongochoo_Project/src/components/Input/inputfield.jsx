const {View, TextInput, StyleSheet, Image,} = require('react-native');
import {useState} from 'react';
import {FontFamily} from '../../assests/Constants/FontFamily';

export const InputField = ({
  placeholder,
  icon,
  iconfocus,
  name,
  onChangeText,
  onBlur,
  keyboardType,
  secureTextEntry,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <>
      <View
        style={{
          ...styles.inputcontainer,
          borderColor: focus ? '#000' : '#DFDFDF',
        }}>
        <Image
          source={focus ? iconfocus : icon}
          style={{width: 30, objectFit: 'contain'}}
        />
        <TextInput
          style={{...styles.inputStyle}}
          onFocus={() => setFocus(true)}
          placeholder={placeholder}
          placeholderTextColor="#DFDFDF"
          name={name}
          onChangeText={onChangeText}
          onBlur={onBlur}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputcontainer: {
    flexDirection: 'row',
    borderWidth: 2,
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    borderRadius: 17,
    width: '100%',
    // marginBottom: 20,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000',
    fontSize: 17,
    ...FontFamily.Medium,
  },
});
