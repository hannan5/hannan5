import {
  Image,
  Linking,
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
import {useEffect, useState} from 'react';
import {DeleteCart, getCart, getPayment} from '../../Api';
// import {apigwClient} from 'selcom-apigw-client';

const Cart = ({navigation}) => {
  const [data, setData] = useState([]);
  const apikey = 'MCHONG-LK5743TH0FB20';
  const apiSecret = 'KLB23B-7633EC-AB2E98-PU2BBA-983D18-431CBF';
  const baseUrl = 'https://apigw.selcommobile.com';
  var orderPath = '/v1/checkout/create-order';
  // const client = new apigwClient(baseUrl, apikey, apiSecret);
  // console.log(client, 'client');
  const processPayment = () => {
    // const orderJson = {};
    // var orderRespose = client.postFunc(orderPath, orderJson);
    // console.log(orderRespose);
  };
  //c
  const getData = () => {
    getCart()
      .then(res => {
        const valuesArray = Object.values(res?.data?.data);
        setData(valuesArray);
         console.log(valuesArray, valuesArray?.length);
      })
      .catch(e => console.log(e));
  };

  const DeleteHandler = id => {
    DeleteCart(id)
      .then(res => {
        // console.log(res);
        getData();
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const process = () =>{
    const random = Math.random().toString(36).slice(2)
    const body={
      order_id:random,
      buyer_email:data[0]?.serviceDetails?.user_email,
      buyer_name:data[0]?.serviceDetails?.user_first_name + data[0]?.serviceDetails?.user_last_name,
      buyer_phone:data[0]?.serviceDetails?.user_phone_no,
      amount:data[data.length-1],
      billing_phone:data[0]?.serviceDetails?.user_phone_no,
      billing_firstname:data[0]?.serviceDetails?.user_first_name,
      billing_lastname:data[0]?.serviceDetails?.user_last_name,
      billing_address_1:data[0]?.serviceDetails?.address,
      billing_city:data[0]?.serviceDetails?.city,
      no_of_items:data?.length,
    }
    console.log(body)
    // console.log(data[data.length-1])
    // getPayment(body)
    // .then((res)=>{
    //   console.log(res?.data?.data[0]?.payment_gateway_url)
    //   Linking.openURL('https://stackoverflow.com/questions/43804032/open-url-in-default-web-browser').catch(err => console.error("Couldn't load page", err));
    // })
    // .catch((e)=>console.log(e?.response?.data))

  }
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
                    ({data?.length - 1}) Orders
                  </Text>
                </View>
              </View>
            </View>
            <View style={{minHeight: 350}}>
              {data?.map((item, index) =>
                item?.serviceDetails ? (
                  <View style={styles.upper_row} key={index}>
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
                        <Text style={styles.upper_head1}>
                          {item?.serviceDetails?.name}
                        </Text>
                        <Text style={{...styles.upper_head1, color: '#399CDE'}}>
                          {item?.serviceDetails?.service_price}Tzs
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
                          {item?.serviceDetails?.user}
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
                              {item?.serviceDetails?.address},{' '}
                              {item?.serviceDetails?.city}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => DeleteHandler(item?.id)}>
                          <Image
                            source={dustbin}
                            style={{
                              height: 21,
                              width: 21,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) : (
                  <>{/* <Text>Hello</Text> */}</>
                ),
              )}
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
                  {data[data?.length - 1]} TZS
                </Text>
              </View>
            </View>

            <View style={{...styles.bar_view, width: '90%'}}>
              <SimpleButton
                name="Proceed Payment"
                //   onClick={() => navigation.navigate('OtpVerification')}
                onClick={() => process()}
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
