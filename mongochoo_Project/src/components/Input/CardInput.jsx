import {FontFamily} from '../../assests/Constants/FontFamily';

const {View, TextInput, StyleSheet, Image, Text} = require('react-native');

const CardInput = ({label}) => {
  return (
    <>
      <View style={styles.inputcontainer}>
        <Text style={styles.InputLabel}>{label}</Text>
        <TextInput
          style={{...styles.inputStyle}}
          //   onFocus={() => setFocus(true)}
          placeholderTextColor="#DFDFDF"
          name={'name'}
          //   onChangeText={onChangeText}
          //   onBlur={onBlur}
          //   keyboardType={keyboardType}
          //   secureTextEntry={secureTextEntry}
        />
      </View>
    </>
  );
};
export default CardInput;

const styles = StyleSheet.create({
  inputcontainer: {
    alignItems: 'flex-start',
    borderRadius: 17,
    width: '100%',
    display: 'flex',
    marginBottom: 10,
  },
  InputLabel: {
    color: '#535353',
    fontSize: 18,
    fontWeight: 'normal',
    ...FontFamily.Medium,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#A7A7A7',
    fontSize: 17,
    ...FontFamily.Medium,
    borderWidth: 2,
    height: 60,
    width: '100%',
    marginTop: 10,
    borderColor: '#DFDFDF',
    borderRadius: 15,
  },
});
