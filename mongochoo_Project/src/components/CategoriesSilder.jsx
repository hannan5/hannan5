import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {useState} from 'react';
import {FontFamily} from '../assests/Constants/FontFamily';
import {useDispatch} from 'react-redux';
import {AddFilter} from '../Store/Store';

const Categories = ({setFilter}) => {
  const category = ['Recommended', 'Trending', 'MostViewed', 'Trending'];
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();
  return (
    // <View>
    <ScrollView horizontal={true} style={{width: '90%'}}>
      {category.map((i, index) => (
        <View style={{width: 150, height: 60, marginBottom: '3%'}} key={index}>
          <TouchableOpacity
            style={{
              ...styles.ButtonContainer,
              backgroundColor: index == select ? '#000' : 'transparent',
            }}
            onPress={() => {
              setSelect(index);
              dispatch(AddFilter({filter: i}));
              setFilter(i);
            }}
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
    // </View>
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
