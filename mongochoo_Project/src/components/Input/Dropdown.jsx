import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
// import { defaultColor, fonts } from '../assets/theme/default';
// import { DropdownSvg } from '../assets/icons';
import buissenes from '../../assests/icons/bussines.png';
import buissnessblack from '../../assests/icons/buissness-black.png';

const Dropdown = ({
  label,
  options,
  onSelect,
  placeholder,
  icon,
  iconfocus,
  onBlur,
  onChangeText,
  name,
  // selectedOption,
  //   onSelect,
}) => {
  //   const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = option => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    onSelect(option);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
        // marginTop: 5,
        borderColor: selectedOption ? '#000' : '#fff',
        borderRadius: 17,
        borderWidth: 2,
      }}>
      <TouchableOpacity
        style={{
          ...styles.inputcontainer,
          borderColor: focus ? '#000' : '#DFDFDF',
        }}
        onPress={() => toggleDropdown()}>
        <Image
          source={
            selectedOption == 'Business'
              ? buissnessblack
              : selectedOption == 'Individual '
              ? iconfocus
              : icon
          }
          style={{width: 30, objectFit: 'contain'}}
        />
        <TextInput
          style={{...styles.inputStyle}}
          onFocus={() => setFocus(true)}
          placeholder={placeholder}
          placeholderTextColor="#DFDFDF"
          value={selectedOption}
          editable={false}
          name={name}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownOptionsContainer}>
            <TouchableOpacity style={styles.optionsContainer}>
              <Image
                source={buissenes}
                style={{width: 30, objectFit: 'contain'}}
              />
              <Text
                style={{...styles.inputStyle, color: '#ababab'}}
                onPress={() => handleSelect('Business')}>
                Business
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsContainer}>
              <Image source={icon} style={{width: 30, objectFit: 'contain'}} />
              <Text
                style={{...styles.inputStyle, color: '#ababab'}}
                onPress={() => {
                  handleSelect('Individual');
                }}>
                Individual
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
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
  },

  dropdownContainer: {
    // position: 'absolute',
    // top: 50,
    width: '100%',
    // backgroundColor: 'red',
    height: 100,
    borderBottomEndRadius: 17,
    borderBottomLeftRadius: 17,
    borderWidth: 2,
    borderColor: '#ececec',
  },
  dropdownOptionsContainer: {
    height: 100,
    // backgroundColor: '#000',
  },
  optionsContainer: {
    flexDirection: 'row',
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  dropdownScrollView: {
    // zIndex: 9
  },
  dropdownOption: {
    height: 44,
    justifyContent: 'center',
    textAlignVertical: 'center',
    // borderColor: defaultColor.divider.co lor,
    borderBottomStyle: 'solid',
  },
  optionText: {
    // marginTop: 6,
    paddingHorizontal: 5,
    // ...defaultColor.black,
    paddingHorizontal: 10,
    // ...fonts.semibold
  },
});

export default Dropdown;
