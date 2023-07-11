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

const HomeScreen = ({navigation}) => {
  const [name, setName] = useState();

  const logout = async () => {
    await AsyncStorage.setItem('login', 'false');
    navigation.navigate('Signin');
    // await asyncs
  };
  const getData = async () => {
    setName(await AsyncStorage.getItem('name'));
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
                        height: 40,
                        width: 40,
                        //   objectFit: 'contain',
                      }}
                    />
                  </View>
                  <View style={{paddingLeft: 10}}>
                    <Text style={styles.head_name} onPress={logout}>
                      {name}
                    </Text>
                    <Text style={styles.head_job}>CEO at StarLink</Text>
                  </View>
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
              <View>
                <Text style={{...styles.head_job, paddingLeft: 15}}>
                  Location
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 5,
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
                          height: 30,
                          width: 30,
                          //   objectFit: 'contain',
                        }}
                      />
                    </View>
                    <Text style={styles.head_name}>
                      Dar es salaam, Tanzania
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={gps}
                      style={{
                        width: 40,
                        objectFit: 'contain',
                      }}
                    />
                  </View>
                </View>
              </View>
              <SearchInput />
            </View>

            <View style={{height: 100, marginTop: 5}}>
              <Categories />
            </View>

            <View style={styles.head_screen}>
              <ScrollView style={{flex: 1}} horizontal={true}>
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
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
                <Text style={{color: '#000', fontSize: 16}}>Near you</Text>
                <Text style={{color: '#C4C4C4', fontSize: 16}}>View all</Text>
              </View>
              <ScrollView style={{flex: 1}} horizontal={true}>
                <View style={{marginHorizontal: 10}}>
                  <Image
                    source={img}
                    style={{
                      width: 200,
                      // objectFit: 'covwe ',
                      height: 200,
                      borderTopLeftRadius: 50,
                      borderTopRightRadius: 50,
                    }}
                  />
                </View>
                <View style={{marginHorizontal: 10}}>
                  <Image
                    source={img}
                    style={{
                      width: 200,
                      // objectFit: 'covwe ',
                      height: 200,
                      borderTopLeftRadius: 50,
                      borderTopRightRadius: 50,
                    }}
                  />
                </View>
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
  },
  head_job: {
    fontSize: 15,
    fontWeight: 300,
    color: '#7d7d7d',
  },
});
