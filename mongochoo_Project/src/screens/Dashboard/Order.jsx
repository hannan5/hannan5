import {
  Dimensions,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import arrow from '../../assests/icons/arrow-left.png';
import notify from '../../assests/icons/notification.png';
import {FontFamily} from '../../assests/Constants/FontFamily';
import ToggleButton from '../../components/Button/ToggleButton';
import CheckBox from '@react-native-community/checkbox';
import SimpleButton from '../../components/Button/Button';
import CalendarPicker from 'react-native-calendar-picker';
import {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import locationicon from '../../assests/icons/locationIcon.png';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const OrderScreen = ({navigation}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';
  const mapRef = useRef(null);
  const apiKey = 'AIzaSyCBcOKzXQmhX02c_71QkGjG3zXbmU3-n-A';
  const defaultCoordinates = [24.82599676, 67.16484243];
  const [location, setLocation] = useState(defaultCoordinates);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [toggle, setToggle] = useState('');

  const moveTo = async position => {
    const camera = await mapRef.current.getCamera();

    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, {duration: 1000});
    }
  };
  // console.log(toggle);
  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = args => {
    if (args) {
      // args.distance
      // args.duration

      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding});
    }
  };

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
  const getLocation = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission granted, call getCurrentPosition()
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              getAddressFromCoordinates(latitude, longitude);
              setLocation([latitude, longitude]);
              console.log(longitude, latitude);
            },
            error => {
              console.log('Error:', error.message);
            },
            {enableHighAccuracy: true, timeout: 2000},
          );
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          // Permission denied
          console.log('Location permission denied');
          showLocationPermissionDeniedAlert();
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          // Permission denied with never ask again
          console.log('Location permission denied with never ask again');
          showLocationPermissionDeniedAlert();
        }
      })
      .catch(error => {
        console.log('Error requesting location permission:', error);
      });
  };
  useEffect(() => {
    getLocation();
  }, []);
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  return (
    <>
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
          <View style={styles.main_view}>
            <View style={styles.head_screen}>
              <View style={styles.bar_view}>
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
                      width: 30,
                      objectFit: 'contain',
                    }}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.main_heading}>Order</Text>
              </View>
            </View>

            <View style={styles.upper_row}>
              <View>
                <Text style={styles.upper_head1}>Pay</Text>
                <Text style={styles.upper_head2}>Cleaner</Text>
              </View>
              <View>
                <Text style={styles.upper_head1}>Order number:</Text>
                <Text style={styles.upper_head2}>123-463-67-488</Text>
              </View>
            </View>

            <View style={{width: '90%', marginTop: 10}}>
              <ToggleButton
                name={['Personal', 'Work']}
                onchange={e => console.log(e)}
              />
            </View>

            <View style={styles.upper_row}>
              <View>
                <Text style={styles.upper_head1}>Start Time</Text>
                {/* <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime" // You can set this to 'time' for time-only selection
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                /> */}
                <Text style={styles.upper_head2}>09:30 AM</Text>
              </View>
              <View>
                <Text style={styles.upper_head1}>End Time</Text>
                <Text style={styles.upper_head2}>09:30 AM</Text>
              </View>
            </View>

            <View style={{width: '90%', marginTop: 10}}>
              <ToggleButton
                name={['3 Days', 'Location']}
                onchange={e => setToggle(e)}
              />
            </View>

            <View style={styles.upper_row}>
              <View style={styles.checkbox_view}>
                <CheckBox
                  tintColors={{true: '#fff', false: '#3B3B3B'}}
                  style={styles.checkbox}
                />
                <Text
                  style={{
                    ...styles.upper_head2,
                    fontSize: 19,
                    color: '#1C1C1C',
                  }}>
                  Available
                </Text>
              </View>
              <View style={styles.checkbox_view}>
                <CheckBox
                  value={false}
                  tintColors={{true: '#000', false: '#3B3B3B'}}
                  style={styles.checkbox}
                  // onChange ={e => console.log(e)}
                />
                <Text
                  style={{
                    ...styles.upper_head2,
                    fontSize: 19,
                    color: '#1C1C1C',
                  }}>
                  Booking
                </Text>
              </View>
            </View>
            {toggle == '3 Days' ? (
              <>
                <View
                  style={{
                    width: '90%',
                    marginTop: 10,
                  }}>
                  <Text style={styles.schedule_head}>Schedule Order</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 15,
                    borderRadius: 25,
                  }}>
                  <CalendarPicker
                    onDateChange={setSelectedStartDate}
                    selectedDayStyle={{backgroundColor: '#000', color: '#fff'}}
                    selectedDayTextStyle={{color: '#fff', fontSize: 14}}
                    monthYearHeaderWrapperStyle={{textAlign: 'left'}}
                    dayLabelsWrapper={{color: 'red', ...FontFamily.Medium}}
                    monthTitleStyle={{
                      color: '#1C1C1C',
                      fontSize: 19,
                    }}
                    yearTitleStyle={{
                      color: '#1C1C1C',
                      fontSize: 19,
                    }}
                  />
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    display: 'flex',
                    // justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '90%',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={locationicon}
                    style={{
                      width: 25,
                      objectFit: 'contain',
                    }}
                  />
                  <Text
                    style={{color: '#000', fontSize: 17, ...FontFamily.Medium}}>
                    Karachi,Pakistan
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 240,
                    display: 'flex',
                    alignItems: 'center',
                    // marginTop: 10,
                    borderRadius: 25,
                  }}>
                  {/* <CalendarPicker
                onDateChange={setSelectedStartDate}
                selectedDayStyle={{backgroundColor: '#000', color: '#fff'}}
                selectedDayTextStyle={{color: '#fff', fontSize: 14}}
                monthYearHeaderWrapperStyle={{textAlign: 'left'}}
                dayLabelsWrapper={{color: 'red', ...FontFamily.Medium}}
                monthTitleStyle={{
                  color: '#1C1C1C',
                  fontSize: 19,
                }}
                yearTitleStyle={{
                  color: '#1C1C1C',
                  fontSize: 19,
                }}
              /> */}
                  <MapView
                    style={{width: '90%', height: '100%', borderRadius: 15}}
                    initialRegion={{
                      latitude: location[0],
                      longitude: location[1],
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}>
                    {origin && <Marker coordinate={origin} />}
                    {destination && <Marker coordinate={destination} />}

                    <MapViewDirections
                      origin={origin}
                      destination={destination}
                      apikey={apiKey}
                      strokeColor="#6644ff"
                      strokeWidth={4}
                      onReady={traceRouteOnReady}
                    />
                  </MapView>
                </View>
              </>
            )}
            <View style={styles.upper_row}>
              <View>
                <Text
                  style={{
                    ...styles.upper_head1,
                    fontSize: 13,
                    color: '#949494',
                  }}>
                  Total Price:
                </Text>
                <Text
                  style={{
                    ...styles.upper_head2,
                    fontSize: 26,
                    fontWeight: 500,
                  }}>
                  15,000 TZS
                </Text>
              </View>
              <View style={{width: '50%'}}>
                <SimpleButton
                  name={'Order Now'}
                  onClick={() => navigation.navigate('Cart')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default OrderScreen;

const styles = StyleSheet.create({
  main_view: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: '3%',
  },
  head_screen: {
    width: '95%',
  },
  bar_view: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: '5%',
    alignItems: 'center',
    width: '100%',
  },
  main_heading: {
    fontSize: 44,
    color: '#000000',
    fontWeight: 'normal',
  },
  upper_row: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  upper_head1: {
    ...FontFamily.Medium,
    color: '#949494',
    fontSize: 13,
    fontWeight: 'normal',
  },
  upper_head2: {
    ...FontFamily.Medium,
    color: '#000',
    fontSize: 23,
    fontWeight: 'normal',
  },
  checkbox: {
    width: 25,
    borderColor: '#000',
    borderWidth: 2,
    color: '#0000',
    marginRight: 10,
  },
  checkbox_view: {
    display: 'flex',
    flexDirection: 'row',
  },
  schedule_head: {
    fontSize: 26,
    color: '#1C1C1C',
    fontWeight: 500,
  },
  calendar_row: {
    marginTop: 10,
    // height: 1000,
  },
});
