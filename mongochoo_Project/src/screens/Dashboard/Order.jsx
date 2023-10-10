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
import {CreateOrder} from '../../Api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const OrderScreen = ({navigation, route}) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const apiKey = 'AIzaSyCBcOKzXQmhX02c_71QkGjG3zXbmU3-n-A';
  const defaultCoordinates = [24.82599676, 67.16484243];
  const [location, setLocation] = useState(defaultCoordinates);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [toggle, setToggle] = useState({
    order_type: 'personal',
    order_location: 'Location',
  });
  const [city, setCity] = useState([]);
  const [checkbox, setCheckbox] = useState({available: false, booking: false});
  const [dateArray, setDateArray] = useState([]);
  const [month, setMonth] = useState({});
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerVisible2, setDatePickerVisible2] = useState(false);
  const [timing, setTiming] = useState({});
  const traceRouteOnReady = args => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = time => {
    const times = new Date(time);
    // console.log(times.ge );
    let temp = `${times.getHours()}:${times.getMinutes()}`;
    setTiming({...timing, Start: temp});
    hideDatePicker();
  };
  const handleConfirm2 = time => {
    const times = new Date(time);
    // console.log(times.ge );
    let temp = `${times.getHours()}:${times.getMinutes()}`;
    setTiming({...timing, End: temp});
    hideDatePicker2();
  };
  const showDatePicker2 = () => {
    setDatePickerVisible2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisible2(false);
  };

  const handleDateChange = date => {
    const formattedDate = formatDate(date);
    setSelectedDates([
      ...selectedDates,
      {
        date: formattedDate,
        style: {backgroundColor: 'black', color: '#fff'},
        textStyle: {fontWeight: 'bold', color: '#fff'},
      },
    ]);
  };
  function formatDate(dateString) {
    const date = new Date(dateString); // Parse the input date string
    const year = date.getFullYear();
    const months = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zeros
    const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zeros
    let temp = [...dateArray, parseInt(day)];
    setDateArray(temp);
    setMonth({Month: months, Year: year});
    const formattedDate = `${year}-${months}-${day}`;
    return formattedDate;
  }

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
          } else if (component.types.includes('country')) {
            country = component.long_name;
          }
          setCity([city, country]);
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
  const {id, price} = route.params;
  const SubmitOrder = () => {
    let body = {
      service_id: id,
      order_type: toggle?.order_type,
      start_time: timing?.Start,
      end_time: timing?.End,
      available: checkbox?.available,
      booking: checkbox?.booking,
      lat: JSON.stringify(location[0]),
      lng: JSON.stringify(location[1]),
      month: month?.Month,
      days: dateArray,
      year: month?.Year,
    };
    CreateOrder(body)
      .then(res => {
        navigation.navigate('Cart');
        console.log(res?.data, 'res');
      })
      .catch(e => console.log(e, 'error'));
  };
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
              {/* <View>
                <Text style={styles.upper_head1}>Order number:</Text>
                <Text style={styles.upper_head2}>123-463-67-488</Text>
              </View> */}
            </View>

            <View style={{width: '90%', marginTop: 10}}>
              <ToggleButton
                name={['Personal', 'Work']}
                onchange={e => setToggle({...toggle, order_type: e})}
              />
            </View>

            <View style={styles.upper_row}>
              <TouchableOpacity onPress={showDatePicker}>
                <Text style={styles.upper_head1}>Start Time</Text>
                <DateTimePickerModal
                  isVisible={datePickerVisible}
                  mode="time" // You can set this to 'time' for time-only selection
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <Text style={styles.upper_head2}>
                  {timing?.Start ?? '00:00'} AM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={showDatePicker2}>
                <Text style={styles.upper_head1}>End Time</Text>
                <DateTimePickerModal
                  isVisible={datePickerVisible2}
                  mode="time" // You can set this to 'time' for time-only selection
                  onConfirm={handleConfirm2}
                  onCancel={hideDatePicker2}
                />
                <Text style={styles.upper_head2}>
                  {timing?.End ?? '00:00'} AM
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{width: '90%', marginTop: 10}}>
              <ToggleButton
                name={['3 Days', 'Location']}
                onchange={e => setToggle({...toggle, order_location: e})}
              />
            </View>

            <View style={styles.upper_row}>
              <View style={styles.checkbox_view}>
                <CheckBox
                  tintColors={{true: '#5FB945', false: '#3B3B3B'}}
                  style={styles.checkbox}
                  value={checkbox?.available}
                  onChange={() =>
                    setCheckbox({...checkbox, available: !checkbox.available})
                  }
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
                  tintColors={{true: '#5FB945', false: '#3B3B3B'}}
                  style={styles.checkbox}
                  value={checkbox?.booking}
                  onChange={() =>
                    setCheckbox({...checkbox, booking: !checkbox.booking})
                  }
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
            {toggle?.order_location == '3 Days' ? (
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
                    onDateChange={handleDateChange}
                    minDate={Date.now()}
                    customDatesStyles={selectedDates}
                    selectedDayStyle={{backgroundColor: '#5FB945', color: '#fff'}}
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
                    {city[0]},{city[1]}
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
                  {price} TZS
                </Text>
              </View>
              <View style={{width: '50%'}}>
                <SimpleButton
                  name={'Order Now'}
                  onClick={() => {
                    SubmitOrder();
                  }}
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
