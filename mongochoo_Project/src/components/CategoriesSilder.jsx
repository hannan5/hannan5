import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {useState} from 'react';
import {FontFamily} from '../assests/Constants/FontFamily';

const Categories = () => {
  const category = ['Recommended', 'Trending', 'Most Viewd', 'Trending'];
  const [select, setSelect] = useState(0);
  return (
    <View>
      <ScrollView
        style={{
          flex: 1,
        }}
        horizontal={true}>
        {category.map((i, index) => (
          <View style={{width: 200, marginHorizontal: 10}} key={index}>
            <TouchableOpacity
              style={{
                ...styles.ButtonContainer,
                backgroundColor: index == select ? '#000' : 'transparent',
              }}
              onPress={() => setSelect(index)}
              //   disabled={disabled}
            >
              <Text
                style={{
                  ...styles.ButtonText,
                  color: index == select ? '#fff' : '#000',
                }}>
                {i}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default Categories;

const styles = StyleSheet.create({
  ButtonContainer: {
    width: 140,
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
