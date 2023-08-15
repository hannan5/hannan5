import {
  Image,
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
import photo from '../../assests/icons/photo.png';
import dustbin from '../../assests/icons/trash.png';
import location from '../../assests/icons/location.png';
import calander from '../../assests/icons/calander.png';
import SimpleButton from '../../components/Button/Button';

const Cart = ({navigation}) => {
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
              <View style={styles.bar_view}>
                <View>
                  <Text style={styles.main_heading}>My Cart</Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.main_heading,
                      fontSize: 18,
                      color: '#A5A5A5',
                    }}>
                    (01) Orders
                  </Text>
                </View>
              </View>
            </View>
            <View style={{height: 350}}>
              <View style={styles.upper_row}>
                <View style={{width: '15%'}}>
                  <Image
                    source={photo}
                    style={{
                      height: 60,
                      width: 60,
                      //   objectFit: 'contain',
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '80%',
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.upper_head1}>Cleaning service</Text>
                    <Text style={{...styles.upper_head1, color: '#399CDE'}}>
                      15,000Tzs
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        ...styles.upper_head1,
                        color: '#A4A4A4',
                        fontSize: 13,
                      }}>
                      James Amos
                    </Text>
                  </View>

                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={calander}
                          style={{
                            height: 15,
                            width: 15,
                          }}
                        />
                        <Text
                          style={{
                            ...styles.upper_head1,
                            fontSize: 11,
                            color: '#A7A7A7',
                          }}>
                          3 Days
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: 5,
                        }}>
                        <Image
                          source={location}
                          style={{
                            height: 15,
                            width: 15,
                          }}
                        />
                        <Text
                          style={{
                            ...styles.upper_head1,
                            fontSize: 11,
                            color: '#A7A7A7',
                          }}>
                          Kindononi, DSM
                        </Text>
                      </View>
                    </View>
                    <Image
                      source={dustbin}
                      style={{
                        height: 21,
                        width: 21,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{...styles.bar_view, width: '90%'}}>
              <View>
                <Text
                  style={{
                    ...styles.main_heading,
                    fontSize: 20,
                    color: '#B4B4B4',
                  }}>
                  Sub total:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    ...styles.main_heading,
                    fontSize: 26,
                    color: '#1C1C1C',
                  }}>
                  15,000 TZS
                </Text>
              </View>
            </View>

            <View style={{...styles.bar_view, width: '90%'}}>
              <SimpleButton
                name="Proceed Payment"
                //   onClick={() => navigation.navigate('OtpVerification')}
                onClick={() => navigation.navigate('Pay')}
                // disabled={!toggleCheckBox ? true : false}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default Cart;

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
    ...FontFamily.Medium,
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
    color: '#161616',
    fontSize: 17,
    fontWeight: 'normal',
  },
});
