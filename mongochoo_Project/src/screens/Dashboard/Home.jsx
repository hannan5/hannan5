import {Text, View, ScrollView, StyleSheet, Image} from 'react-native';
import SimpleButton from '../../components/Button/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notify from '../../assests/icons/notification.png';
import photo from '../../assests/icons/photo.png';
import location from '../../assests/icons/location.png';
import gps from '../../assests/icons/gps.png';
import Categories from '../../components/CategoriesSilder';
import ProductBox from '../../components/ProductBox';
import img from '../../assests/icons/cleaning.png';
import SearchInput from '../../components/Input/SearchInput';
import {useEffect, useState} from 'react';
import {FontFamily} from '../../assests/Constants/FontFamily';
import {GetService, PostFavouriteService} from '../../Api';
import {useGetServiceFilterQuery} from '../../Store/ApiSlice';
import {useSelector} from 'react-redux';

const HomeScreen = ({navigation}) => {
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('Recommended');
  const [neardata, setNeardata] = useState([]);

  const logout = async () => {
    await AsyncStorage.setItem('login', 'false');
    navigation.navigate('Signin');
  };
  const getData = async () => {
    setName(await AsyncStorage.getItem('name'));
    GetService(filter)
      .then(res => {
        setData(res?.data?.data);
      })
      .catch(e => console.log(e));
  };
  const getDatawithlocation = async () => {
    GetService('Kasulu')
      .then(res => {
        setNeardata(res?.data?.data);
      })
      .catch(e => console.log(e));
  };
  useEffect(() => {
    getData();
    getDatawithlocation();
  }, [filter]);

 
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
                    <Text style={styles.head_name} onPress={logout}>
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
                        source={location}
                        style={{
                          height: 25,
                          width: 25,
                          //   objectFit: 'contain',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        ...styles.head_name,
                        ...FontFamily.Medium,
                        fontSize: 17,
                        marginLeft: 5,
                      }}>
                      Dar es salaam, Tanzania
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={gps}
                      style={{
                        width: 30,
                        objectFit: 'contain',
                      }}
                    />
                  </View>
                </View>
              </View>
              <SearchInput />
            </View>

            {/* <View style={{marginTop: 5}}> */}
            <Categories setFilter={setFilter} />
            {/* </View> */}

            <View style={styles.head_screen}>
              <ScrollView horizontal={true}>
                {data?.map((i, index) => (
                  <ProductBox navigation={navigation} key={index} data={i} />
                ))}
              </ScrollView>
            </View>

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
                  style={{color: '#000', fontSize: 20, ...FontFamily.SemiBold}}>
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
                {neardata?.map(i => (
                  <View style={{marginHorizontal: 10, height: 210}} key={i}>
                    <Image
                      source={img}
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
          </View>
        </ScrollView>
      </SafeAreaView>
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
