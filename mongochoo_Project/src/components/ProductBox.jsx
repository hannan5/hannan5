import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import img from '../assests/icons/cleaning.png';
import location from '../assests/icons/location.png';
import notify from '../assests/icons/notification.png';
import heart from '../assests/icons/heart.png';
import photo from '../assests/icons/photo.png';

const ProductBox = ({navigation}) => {
  return (
    <TouchableOpacity
      style={styles.box_main}
      onPress={() => {
        navigation.navigate('Productdetails');
      }}>
      <View>
        <Image
          source={img}
          style={{
            width: '100%',
            // objectFit: 'covwe ',
            height: 200,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        />
      </View>
      <View style={styles.box_details}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: '5%',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View>
              <Image
                source={photo}
                style={{
                  height: 40,
                  width: 40,
                  //   objectFit: 'contain',
                }}
              />
            </View>
            <View style={{paddingLeft: 10}}>
              <Text style={styles.head_name}>Jackson Heche</Text>
              <Text style={styles.head_job}>CEO at StarLink</Text>
            </View>
          </View>
          <View>
            <Image
              source={heart}
              style={{
                width: 40,
                objectFit: 'contain',
              }}
            />
          </View>
        </View>
        <Text style={styles.heading}>Cleaning Serving</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ProductBox;

const styles = StyleSheet.create({
  box_details: {
    // backgroundColor: 'green',
    height: 100,
    paddingHorizontal: '3%',
  },
  head_name: {
    fontSize: 12,
    fontWeight: 500,
    color: '#393939',
  },
  head_job: {
    fontSize: 12,
    fontWeight: 300,
    color: '#7d7d7d',
  },
  box_main: {
    height: 350,
    backgroundColor: '#fff',
    width: 230,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 16,
    color: '#000',
    fontWeight: 500,
  },
});
