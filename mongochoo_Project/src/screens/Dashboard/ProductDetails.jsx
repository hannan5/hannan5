import {Image, ScrollView, StyleSheet, View, Text} from 'react-native';
import notify from '../../assests/icons/notification.png';
import location from '../../assests/icons/location-white.png';
import heart from '../../assests/icons/heart-white.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import arrow from '../../assests/icons/arrow-left.png';
import img from '../../assests/icons/cleaning.png';
import photo from '../../assests/icons/photo.png';
import user from '../../assests/icons/user.png';

const ProductDetails = () => {
  const product_details = [
    {
      name: 'Man',
      icon: user,
    },
    {
      name: '4 Years',
      icon: user,
    },
    {
      name: 'Individual',
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: '3%',
        paddingHorizontal: '5%',
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
              <View>
                <Image
                  source={arrow}
                  style={{
                    width: 40,
                    objectFit: 'contain',
                  }}
                />
              </View>
              <View>
                <Image
                  source={notify}
                  style={{
                    width: 40,
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
                height: 380,
                objectFit: 'contain',
                positon: 'absolute',
              }}
            />
            <View style={styles.overlayView}>
              <View style={styles.imageOverlay_left}>
                <Image
                  source={location}
                  style={{
                    width: 30,
                    objectFit: 'contain',
                    marginRight: 5,
                  }}
                />
                <View>
                  <Text>Dar es salaam, Tanzania</Text>
                  <Text>2 hours ago</Text>
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
                  <Text style={{fontSize: 18, color: '#393939'}}>
                    James Amos
                  </Text>
                  <Text style={{fontSize: 18, color: '#A7A7A7'}}>Cleaner</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{color: '#399CDE', fontSize: 18}}>5.0000Tzs</Text>
            </View>
          </View>
          <View style={styles.product_description}>
            <Text style={{color: '#000', fontSize: 25}}>Cleaning Service</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
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
                      width: 20,
                      objectFit: 'contain',
                      marginRight: 5,
                    }}
                  />
                  <Text style={{fontSize: 14, color: '#A7A7A7'}}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              {product_amount.map((item, index) => (
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
                      color: '#A7A7A7',
                      textAlign: 'center',
                    }}>
                    {item.amount}
                  </Text>
                  <Text style={{fontSize: 13, color: '#A7A7A7'}}>
                    {item.time}
                  </Text>
                </View>
              ))}
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
    bottom: 20,
    alignSelf: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
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
    width: '85%',
    // backgroundColor: 'red',
    // height: 300,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  product_description: {
    width: '85%',
    height: 300,
  },
});
