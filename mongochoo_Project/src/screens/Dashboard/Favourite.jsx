import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import notify from '../../assests/icons/notification.png';
import arrow from '../../assests/icons/arrow-left.png';
import {FontFamily} from '../../assests/Constants/FontFamily';
import {GetFavouriteService} from '../../Api';
import {useState, useEffect} from 'react';
import Favourite_box from '../../components/favouriteServicebox';

const FavouriteScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState('');
  const [favourite, setFavourite] = useState(false);

  const getData = async () => {
    GetFavouriteService()
      .then(res => {
        setData(res?.data?.data);
      })
      .catch(e => console.log(e));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          padding: '3%',
          paddingHorizontal: '4%',
          alignItems: 'center',
        }}>
        <ScrollView
          style={{
            width: '100%',
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <View style={styles.head_screen}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingVertical: '2%',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={arrow}
                    style={{
                      width: 30,
                      objectFit: 'contain',
                    }}
                  />
                </TouchableOpacity>
                <View>
                  <Image
                    source={notify}
                    style={{
                      width: 25,
                      objectFit: 'contain',
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{width: '98%'}}>
              <Text style={styles.heading}>Favourite</Text>
            </View>
            <View style={{width: '98%'}}>
              {data?.map((i, index) => {
                let a = JSON.parse(i?.service?.services_images[0]?.images);
                return <Favourite_box data={i} images={a} key={index} />;
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  head_screen: {
    width: '95%',
  },
  heading: {
    fontSize: 44,
    color: '#000',
    ...FontFamily.SemiBold,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  favourite_box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 180,
    backgroundColor: '#fff',
    paddingHorizontal: '3%',
    borderRadius: 20,
    justifyContent: 'center',
    marginVertical: '2%',
  },
  favourite_details_box: {
    width: '55%',
    paddingHorizontal: '2%',
    // paddingBottom: 20,
    // height: 300,
  },
  favourite_details_box_upper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  favourite_details_row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
});
