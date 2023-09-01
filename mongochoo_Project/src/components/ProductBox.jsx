import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import heart from '../assests/icons/heart.png';
import photo from '../assests/icons/photo.png';
import CustomRatingBar from './CustomRatingBar';
import {FontFamily} from '../assests/Constants/FontFamily';
import {PostFavouriteService} from '../Api';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import heart_black from '../assests/icons/black-heart.png';

const ProductBox = ({navigation, data, userId}) => {
  const [images, setImages] = useState(
    JSON.parse(data?.services_images[0]?.images),
  );
  const [favourite, setFavourite] = useState(false);

  const getFavourite = async () => {
    const userId = await AsyncStorage.getItem('id');
    setFavourite(
      data?.favourite_services?.filter(i => i?.user_id == userId)[0]
        ?.is_favorite,
    );
  };
  const AddFavourite = (service_id, is_favorite) => {
    PostFavouriteService({
      service_id: service_id,
      is_favorite: is_favorite,
    })
      .then(res => console.log())
      .catch(e => console.log(e));
  };
  useEffect(() => {
    getFavourite();
  }, []);

  return (
    <TouchableOpacity
      style={styles.box_main}
      onPress={() => {
        navigation.navigate('Productdetails', {
          id: data?.id,
        });
      }}>
      <View>
        <Image
          source={{
            uri: `http://admin.mchongoo.com/storage/${images[0]}`,
          }}
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
              <Text style={styles.head_name}>
                {data?.user?.first_name + ' ' + data?.user?.last_name}
              </Text>
              <Text style={styles.head_job}>{data?.experience}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              favourite
                ? AddFavourite(data?.services_images[0]?.service_id, 0)
                : AddFavourite(data?.services_images[0]?.service_id, 1);
            }}>
            <Image
              source={favourite ? heart_black : heart}
              style={{
                width: 25,
                objectFit: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>{data?.name}</Text>
        <CustomRatingBar rating={data?.rating} />
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
    ...FontFamily.SemiBold,
  },
  head_job: {
    fontSize: 12,
    fontWeight: 300,
    color: '#7d7d7d',
    ...FontFamily.Medium,
  },
  box_main: {
    height: 350,
    backgroundColor: '#fff',
    width: 230,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    marginHorizontal: 5,
  },
  heading: {
    fontSize: 16,
    color: '#000',
    fontWeight: 500,
    marginBottom: 5,
    ...FontFamily.SemiBold,
  },
});
