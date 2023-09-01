import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const CustomOTPInput = ({digitCount, name, onChangeText, onBlur, onSelect}) => {
  const [otp, setOTP] = useState('');
  const inputRefs = useRef([]);

  const handleOTPChange = (index, value) => {
    const newOTP = otp.split('');
    newOTP[index] = value;
    onSelect(newOTP.join(''));
    setOTP(newOTP.join(''));
    // Move to the next input field
    if (value && index < digitCount - 1) {
      inputRefs.current[index + 1].focus();
     }
  };

  const handleOTPKeyPress = (index, key) => {
    // Delete the previous digit when backspace is pressed
    if (key === 'Backspace' && index > 0 && !otp[index]) {
      const newOTP = otp.split('');
      newOTP[index - 1] = '';
      setOTP(newOTP.join(''));
      inputRefs.current[index - 1].focus();
    }
  };
  const renderInputFields = () => {
    const inputFields = [];
    for (let i = 0; i < digitCount; i++) {
      const isLastInput = i === digitCount - 1;
      const inputStyle = [styles.input, isLastInput && styles.lastInput];

      inputFields.push(
        <TextInput
          key={i}
          style={inputStyle}
          maxLength={1}
          keyboardType="numeric"
          value={otp[i]}
          onChangeText={value => handleOTPChange(i, value)}
          onKeyPress={({nativeEvent: {key}}) => handleOTPKeyPress(i, key)}
          onFocus={() => inputRefs.current[i].focus()}
          ref={ref => (inputRefs.current[i] = ref)}
          name={name}
          onBlur={onBlur}
          // onChangeText={onChangeText}
        />,
      );
    }
    return inputFields;
  };
  return <View style={styles.container}>{renderInputFields()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 2,
    borderColor: '#DFDFDF',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    borderRadius: 15,
    marginHorizontal: '2%',
  },
});

export default CustomOTPInput;
