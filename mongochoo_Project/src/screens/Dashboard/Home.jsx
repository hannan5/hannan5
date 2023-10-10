import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notify from '../../assests/icons/notification.png';
import photo from '../../assests/icons/photo.png';
import locations from '../../assests/icons/location.png';
import gps from '../../assests/icons/gps.png';
import Categories from '../../components/CategoriesSilder';
import ProductBox from '../../components/ProductBox';
import SearchInput from '../../components/Input/SearchInput';
import {useEffect, useState} from 'react';
import {FontFamily} from '../../assests/Constants/FontFamily';
import {GetService, PostFavouriteService, SearchService} from '../../Api';
import Loader from '../../components/Loader/loader';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('Recommended');
  const [neardata, setNeardata] = useState([]);
  const [loader, setLoader] = useState(true);
  const [location, setLocation] = useState({city: '', country: ''});
  const category = ['Recommended', 'Trending', 'MostViewed', 'Trending'];


  const getData = async () => {
    setLocation({
      city: await AsyncStorage.getItem('city'),
      country: await AsyncStorage.getItem('country'),
    });
    setName(await AsyncStorage.getItem('name'));
    GetService(filter)
      .then(res => {
        setData(res?.data?.data);
      })
      .catch(e => console.log(e));
    setLoader(false);
  };

  const getDatawithlocation = async () => {
    const city = await AsyncStorage.getItem('city');
    GetService(city ?? 'Kasulu')
      .then(res => {
        setNeardata(res?.data?.data);
      })
      .catch(e => console.log(e));
  };
  useEffect(() => {
    getData();
    getDatawithlocation();
  }, [filter]);

  const getAddressFromCoordinates = (latitude, longitude) => {
    const apiKey = 'AIzaSyCBcOKzXQmhX02c_71QkGjG3zXbmU3-n-A';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    axios
      .get(apiUrl)
      .then(async response => {
        const addressComponents = response.data.results[0].address_components;
        let city, country;

        for (let component of addressComponents) {
          if (component.types.includes('locality')) {
            city = component.long_name;
            // console.log(city);
          } else if (component.types.includes('country')) {
            country = component.long_name;
          }
        }
        await AsyncStorage.setItem('city', city);
        await AsyncStorage.setItem('country', country);
      })
      .catch(error => {
        console.log('Error fetching address:', error.message);
      });
  };

  const showLocationPermissionDeniedAlert = () => {
    Alert.alert(
      'Location Permission Denied',
      'Please enable location permission in your device settings to use this feature.',
      [
        {
          text: 'Open Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
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
                paddingHorizontal: '2%',
              }}>
              <View style={styles.head_screen}>
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
                          height: 50,
                          width: 50,
                          //   objectFit: 'contain',
                        }}
                      />
                    </View>
                    <View style={{paddingLeft: 10}}>
                      <Text style={styles.head_name}>
                        {name}
                      </Text>
                      <Text style={styles.head_job}>C.E.O at StarLink</Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      source={notify}
                      style={{
                        width: 30,
                        objectFit: 'contain',
                      }}
                    />
                  </View>
                </View>
                <View>
                  <Text style={{...styles.head_job}}>Location</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      // margin: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Image
                          source={locations}
                          style={{
                            height: 25,
                            width: 25,
                            //   objectFit: 'contain',
                          }}
                        />
                      </View>
                      {location.city ? (
                        <Text
                          style={{
                            ...styles.head_name,
                            ...FontFamily.Medium,
                            fontSize: 17,
                            marginLeft: 5,
                          }}>
                          {location?.city}, {location?.country}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            ...styles.head_name,
                            ...FontFamily.Medium,
                            fontSize: 17,
                            marginLeft: 5,
                          }}>
                          Choose your location
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        PermissionsAndroid.request(
                          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        )
                          .then(granted => {
                            if (
                              granted === PermissionsAndroid.RESULTS.GRANTED
                            ) {
                              // Permission granted, call getCurrentPosition()
                              Geolocation.getCurrentPosition(
                                position => {
                                  const {latitude, longitude} = position.coords;
                                  getAddressFromCoordinates(
                                    latitude,
                                    longitude,
                                  );
                                },
                                error => {
                                  console.log('Error:', error.message);
                                },
                                {
                                  enableHighAccuracy: true,
                                  timeout: 15000,
                                  maximumAge: 10000,
                                },
                              );
                            } else if (
                              granted === PermissionsAndroid.RESULTS.DENIED
                            ) {
                              // Permission denied
                              console.log('Location permission denied');
                              showLocationPermissionDeniedAlert();
                            } else if (
                              granted ===
                              PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
                            ) {
                              // Permission denied with never ask again
                              console.log(
                                'Location permission denied with never ask again',
                              );
                              showLocationPermissionDeniedAlert();
                            }
                          })
                          .catch(error => {
                            console.log(
                              'Error requesting location permission:',
                              error,
                            );
                          });
                      }}>
                      <Image
                        source={gps}
                        style={{
                          width: 30,
                          objectFit: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <SearchInput setFilter={setFilter} />
              </View>

              {/* <View style={{marginTop: 5}}> */}
              <Categories setFilter={setFilter} category={category}/>
              {/* </View> */}

              <View style={styles.head_screen}>
                <ScrollView horizontal={true}>
                  {data?.map((i, index) => (
                    <ProductBox navigation={navigation} key={index} data={i} />
                  ))}
                </ScrollView>
              </View>
              {neardata.length != 0 ? (
                <View style={{...styles.head_screen, marginTop: 30}}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                      paddingHorizontal: '6%',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 20,
                        ...FontFamily.SemiBold,
                      }}>
                      Near you
                    </Text>
                    <Text
                      style={{
                        color: '#C4C4C4',
                        fontSize: 17,
                        ...FontFamily.Medium,
                      }}>
                      View all
                    </Text>
                  </View>
                  <ScrollView horizontal={true}>
                    {neardata?.map((i, index) => (
                      <View
                        style={{marginHorizontal: 10, height: 210}}
                        key={index}>
                        <Image
                          source={{
                            uri: `http://admin.mchongoo.com/storage/${
                              JSON.parse(i?.services_images[0]?.images)[0]
                            }`,
                          }}
                          style={{
                            width: 200,
                            height: 200,
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            objectFit: 'contain',
                          }}
                        />
                      </View>
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <></>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  head_screen: {
    width: '95%',
  },
  head_name: {
    fontSize: 20,
    fontWeight: 500,
    color: '#000',
    ...FontFamily.SemiBold,
  },
  head_job: {
    fontSize: 15,
    fontWeight: 400,
    color: '#7d7d7d',
    ...FontFamily.Medium,
  },
});
