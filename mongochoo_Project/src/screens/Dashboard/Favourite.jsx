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
import favourite_img from '../../assests/images/Office-Cleaning.png';
import favourite_icon from '../../assests/images/fashion-model-in-red.png';
import user_icon from '../../assests/icons/user-black.png';
import heart_icon from '../../assests/icons/black-heart.png';
import CustomRatingBar from '../../components/CustomRatingBar';
import calander_icon from '../../assests/icons/calendar.png';
import {FontFamily} from '../../assests/Constants/FontFamily';
import {GetFavouriteService} from '../../Api';
import {useState, useEffect} from 'react';

const FavouriteScreen = ({navigation}) => {
  const favourite_item = [
    'James Jack',
    'Anna John',
    'James Jack',
    'Anna John',
    'James Jack',
    'Anna John',
  ];
  const [data, setData] = useState([]);
  const getData = async () => {
    GetFavouriteService()
      .then(res => {
        console.log(res?.data?.data, 'data');
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
              {data?.map((i, index) => (
                <View style={styles.favourite_box} key={index}>
                  <View style={{width: '45%'}}>
                    <Image
                      source={favourite_img}
                      style={{width: '100%', objectFit: 'contain'}}
                    />
                  </View>
                  <View style={styles.favourite_details_box}>
                    <View style={styles.favourite_details_box_upper}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={favourite_icon}
                          style={{width: 30, objectFit: 'contain'}}
                        />
                        <View style={{marginLeft: 5}}>
                          <Text
                            style={{
                              color: '#393939',
                              fontSize: 12,
                              fontWeight: 500,
                              ...FontFamily.Medium,
                            }}>
                            {/* {i} */}
                            {i?.user?.first_name + ' ' + i?.user?.last_name}
                          </Text>
                          <Text
                            style={{
                              color: '#A7A7A7',
                              fontSize: 12,
                              fontWeight: 300,
                              ...FontFamily.Medium,
                            }}>
                            Cleaner
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Image
                          source={heart_icon}
                          style={{width: 30, objectFit: 'contain'}}
                        />
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: '#000',
                        ...FontFamily.Medium,
                      }}>
                      {i?.service?.name}
                    </Text>

                    <View style={styles.favourite_details_row}>
                      <Image
                        source={calander_icon}
                        style={{width: 15, objectFit: 'contain'}}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 300,
                          color: '#A7A7A7',
                          marginLeft: 10,
                          ...FontFamily.Medium,
                        }}>
                        {i?.service?.experience}
                      </Text>
                    </View>

                    <View style={styles.favourite_details_row}>
                      <Image
                        source={user_icon}
                        style={{width: 15, objectFit: 'contain'}}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 300,
                          color: '#A7A7A7',
                          marginLeft: 10,
                          ...FontFamily.Medium,
                        }}>
                        {i?.service?.service_type}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <CustomRatingBar rating={i?.service?.rating} />

                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 500,
                          color: '#399CDE',
                          ...FontFamily.SemiBold,
                        }}>
                        {i?.service?.service_price + 'Tzs'}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
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
