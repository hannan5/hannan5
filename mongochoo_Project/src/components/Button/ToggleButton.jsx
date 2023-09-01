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
            backgroundColor: toggle ? '#3BA0D1' : '#E9E9E9',
          }}
          onPress={() => {
            setToggle(true);
            onchange(name[0]);
          }}>
          <Text
            style={{...styles.toggle_text1, color: toggle ? '#fff' : '#000'}}>
            {name[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.toggle_btn2,
            backgroundColor: toggle ? '#E9E9E9' : '#3BA0D1',
          }}
          onPress={() => {
            setToggle(false);
            onchange(name[1]);
          }}>
          <Text
            style={{...styles.toggle_text2, color: toggle ? '#000' : '#fff'}}>
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
    backgroundColor: '#E9E9E9',
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
