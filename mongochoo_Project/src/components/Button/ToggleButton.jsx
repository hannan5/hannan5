import {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ToggleButton = ({name, onchange}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <TouchableOpacity style={styles.toggle_View}>
        <TouchableOpacity
          style={{
            ...styles.toggle_btn1,
            backgroundColor: toggle ? '#5FB945' : '#E3FFD9',
          }}
          onPress={() => {
            setToggle(true);
            onchange(name[0]);
          }}>
          <Text
            style={{...styles.toggle_text1, color: toggle ? '#fff' : '#5FB945'}}>
            {name[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.toggle_btn2,
            backgroundColor: toggle ? '#E3FFD9' : '#5FB945',
          }}
          onPress={() => {
            setToggle(false);
            onchange(name[1]);
          }}>
          <Text
            style={{...styles.toggle_text2, color: toggle ? '#5FB945' : '#fff'}}>
            {name[1]}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};
export default ToggleButton;

const styles = StyleSheet.create({
  toggle_View: {
    backgroundColor: '#E3FFD9',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    height: 55,
    borderRadius: 15,
  },
  toggle_btn1: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  toggle_btn2: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  toggle_text1: {
    color: '#929292',
    fontSize: 15,
    fontWeight: 'normal',
  },
  toggle_text2: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'normal',
  },
});
