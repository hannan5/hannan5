const {View, TextInput, StyleSheet, Image} = require('react-native');
import {FontFamily} from '../../assests/Constants/FontFamily';
import searchicon from '../../assests/icons/search-normal.png';
import serviceicon from '../../assests/icons/serviceIcon.png';

const SearchInput = () => {
  return (
    <>
      <View
        style={{
          ...styles.inputcontainer,
          borderColor: '#DFDFDF',
        }}>
        <Image source={searchicon} style={{width: 20, objectFit: 'contain'}} />
        <View
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '75%',
            // backgroundColor: 'red',
          }}>
          <TextInput
            style={{...styles.inputStyle}}
            placeholder={'Search'}
            placeholderTextColor="#BCBCBC"
          />
        </View>
        <Image source={serviceicon} style={{width: 35, objectFit: 'contain'}} />
      </View>
    </>
  );
};
export default SearchInput;

const styles = StyleSheet.create({
  inputcontainer: {
    flexDirection: 'row',
    borderWidth: 2,
    height: 55,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    borderRadius: 18,
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  inputStyle: {
    color: '#000',
    fontSize: 17,
    ...FontFamily.Medium,
  },
  checkbox: {
    width: 25,
    borderColor: '#000',
    borderWidth: 2,
    color: '#0000',
    //   backgroundColor: '#000',
  },
});
