import {FontFamily} from '../../assests/Constants/FontFamily';

import {Button, TouchableOpacity, Text, StyleSheet} from 'react-native';

const SimpleButton = ({name, onClick, disabled, style}) => {
  return (
    <TouchableOpacity
      style={styles.ButtonContainer}
      onPress={onClick}
      disabled={disabled}>
      <Text style={styles.ButtonText}>{name}</Text>
    </TouchableOpacity>
  );
};
export default SimpleButton;

const styles = StyleSheet.create({
  ButtonContainer: {
    width: '100%',
    backgroundColor: '#6EBE51',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    // paddingHorizontal: '10%',
  },
  ButtonText: {
    fontSize: 17,
    color: '#fff',
    ...FontFamily.SemiBold,
  },
});
