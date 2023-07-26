import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import notify from '../../assests/icons/notification.png';
import location from '../../assests/icons/location-white.png';
import heart from '../../assests/icons/heart-white.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import arrow from '../../assests/icons/arrow-left.png';
import img from '../../assests/icons/cleaning.png';
import photo from '../../assests/icons/photo.png';
import user from '../../assests/icons/user.png';
import ignoreIcon from '../../assests/icons/ignore-icon.png';
import messageIcon from '../../assests/icons/message-icon.png';
import offerIcon from '../../assests/icons/offer-icon.png';
import {FontFamily} from '../../assests/Constants/FontFamily';
import CustomRatingBar from '../../components/CustomRatingBar';
import {GetSingleService} from '../../Api';
import {useState, useEffect} from 'react';
const ProductDetails = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const {id} = route.params;
  const product_details = [
    {
      name: data?.gender,
      icon: user,
    },
    {
      name: data?.experience,
      icon: user,
    },
    {
      name: data?.service_type,
      icon: user,
    },
    {
      name: '30 Meters',
      icon: location,
    },
  ];

  const product_amount = [
    {
      amount: 5000,
      time: '4 Hours/Day',
    },
    {
      amount: 5000,
      time: '4 Hours/Day',
    },
    {
      amount: 5000,
      time: '4 Hours/Day',
    },
  ];
  const getData = async () => {
    GetSingleService(id)
      .then(res => {
        console.log(res?.data?.data?.plans_and_packages);
        setData(res?.data?.data);
      })
      .catch(e => console.log(e));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: '3%',
        // paddingHorizontal: '5%',
        alignItems: 'center',
      }}>
      <ScrollView
        style={{
          width: '100%',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 20,
            paddingHorizontal: '3%',
          }}>
          <View style={styles.head_screen}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingVertical: '5%',
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
                    width: 30,
                    objectFit: 'contain',
                  }}
                />
              </View>
            </View>
          </View>
          <View>
            <Image
              source={img}
              style={{
                height: 370,
                objectFit: 'contain',
                positon: 'absolute',
              }}
            />
            <View style={styles.overlayView}>
              <View style={styles.imageOverlay_left}>
                <Image
                  source={location}
                  style={{
                    width: 20,
                    objectFit: 'contain',
                    marginRight: 5,
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      ...FontFamily.SemiBold,
                    }}>
                    {data?.address}, {data?.city}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 15,
                      ...FontFamily.SemiBold,
                    }}>
                    2 hours ago
                  </Text>
                </View>
              </View>
              <View>
                <Image
                  source={heart}
                  style={{
                    width: 60,
                    objectFit: 'contain',
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.product_seller_view}>
            <View>
              <View style={styles.imageOverlay_left}>
                <Image
                  source={photo}
                  style={{
                    width: 50,
                    objectFit: 'contain',
                    marginRight: 5,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 19,
                      color: '#393939',
                      ...FontFamily.SemiBold,
                      fontWeight: 500,
                    }}>
                    {data?.user?.first_name + ' ' + data?.user?.last_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 19,
                      color: '#A7A7A7',
                      ...FontFamily.Medium,
                      fontWeight: 300,
                    }}>
                    Cleaner
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: '#399CDE',
                  fontSize: 18,
                  ...FontFamily.SemiBold,
                }}>
                {`${data?.service_price}Tzs`}
              </Text>
              <CustomRatingBar />
            </View>
          </View>
          <View style={styles.product_description}>
            <Text
              style={{
                color: '#000',
                fontSize: 25,
                fontWeight: 'normal',
                ...FontFamily.SemiBold,
              }}>
              {data?.name}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              {product_details.map((item, index) => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  key={index}>
                  <Image
                    source={item.icon}
                    style={{
                      width: 15,
                      objectFit: 'contain',
                      marginRight: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#A7A7A7',
                      fontWeight: 300,
                      ...FontFamily.Medium,
                    }}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              {data?.plans_and_packages?.map((item, index) => (
                <View
                  style={{
                    backgroundColor: '#000',
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    borderRadius: 20,
                  }}
                  key={index}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#fff',
                      textAlign: 'center',
                      ...FontFamily.Medium,
                    }}>
                    {item.plan_amount}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#A7A7A7',
                      ...FontFamily.Medium,
                    }}>
                    {item.plan_duration}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.description_button}>
            <View style={{alignItems: 'center'}}>
              <View style={{...styles.icon_view, backgroundColor: '#ABABAB'}}>
                <Image
                  source={ignoreIcon}
                  style={{
                    width: 40,
                    objectFit: 'contain',
                  }}
                />
              </View>
              <Text
                style={{
                  color: '#6B6B6B',
                  fontSize: 13,
                  fontWeight: 300,
                  ...FontFamily.Medium,
                }}>
                Ignore
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={styles.icon_view}>
                <Image
                  source={offerIcon}
                  style={{
                    width: 30,
                    objectFit: 'contain',
                  }}
                />
              </View>
              <Text
                style={{
                  color: '#6B6B6B',
                  fontSize: 13,
                  fontWeight: 300,
                  ...FontFamily.Medium,
                }}>
                Offer
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={styles.icon_view}>
                <Image
                  source={messageIcon}
                  style={{
                    width: 30,
                    objectFit: 'contain',
                  }}
                />
              </View>
              <Text
                style={{
                  color: '#6B6B6B',
                  fontSize: 13,
                  fontWeight: 300,
                  ...FontFamily.Medium,
                }}>
                Message
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProductDetails;

const styles = StyleSheet.create({
  head_screen: {
    width: '95%',
  },
  head_name: {
    fontSize: 20,
    fontWeight: 500,
    color: '#000',
  },
  head_job: {
    fontSize: 15,
    fontWeight: 300,
    color: '#7d7d7d',
  },
  overlayView: {
    position: 'absolute',
    bottom: 1,
    alignSelf: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // paddingVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  imageOverlay_left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageOverlay_text: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#fff',
  },
  product_seller_view: {
    width: '90%',
    // backgroundColor: 'red',
    // height: 300,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  product_description: {
    width: '90%',
    // height: 300,
  },
  description_button: {
    width: '85%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  icon_view: {
    backgroundColor: '#000',
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
