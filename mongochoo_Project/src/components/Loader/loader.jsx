import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {FontFamily} from '../../assests/Constants/FontFamily';
import React, {useState, useEffect} from 'react';

const Loader = () => {
  const [firstDot, setfirstDot] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setfirstDot(prev => (prev + 1) % 3);
    }, 500);
  }, []);

  return (
    <>
      <SafeAreaView>
        <View style={styles.loaderDiv}>
          <Text
            style={[
              //   Fontstyles.heading,
              FontFamily.SemiBold,
              styles.loadingText,
            ]}>
            Loading
          </Text>
          <View style={styles.dotDiv}>
            <View
              style={firstDot == 0 ? styles.dotGreen : styles.dotWhite}></View>

            <View
              style={firstDot == 1 ? styles.dotGreen : styles.dotWhite}></View>
            <View
              style={firstDot == 2 ? styles.dotGreen : styles.dotWhite}></View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  loaderDiv: {
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100%',
  },
  loadingText: {
    color: '#000',
    textAlign: 'center',
  },
  dotDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '12%',
    marginTop: 10,
  },
  dotGreen: {
    width: 10,
    height: 10,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  dotWhite: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default Loader;
