import {
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import arrow from '../../assests/icons/arrow-left.png';
import notify from '../../assests/icons/notification.png';
import { FontFamily } from '../../assests/Constants/FontFamily';
import { useEffect, useState } from 'react';
import SearchInput from '../../components/Input/SearchInput';
import Categories from '../../components/CategoriesSilder';
import { GetFavouriteService, getServiceByCategory } from '../../Api';
import Favourite_box from '../../components/favouriteServicebox';
import calander_icon from '../../assests/icons/calendar.png';
import arrow_down from '../../assests/icons/arrow-down.png';
import dollar from '../../assests/icons/dollar.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterServiceBox from '../../components/filteringService';

const FilterService = ({ navigation }) => {
  const [filter, setFilter] = useState('Recommended');
  const [data, setData] = useState([]);
  const category = ['Near you', 'Available', 'Shuffle', 'Trending'];

  const getData = async () => {
   const id  = await AsyncStorage.getItem('ServiceId')
    console.log(id)
      getServiceByCategory(id)
      .then(res => {
        console.log(res?.data?.data[0],"id");
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
            </View>

            <SearchInput setFilter={setFilter} />

            <View style={{ width: '98%' }}>
              <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>

                <View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',height:16 }}>
                    <Image source={calander_icon}
                      style={{ width: 22, objectFit: 'contain' }}
                    />
                    <Text style={{ fontSize: 13, color: "#343434",marginLeft:2 }}>Date</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, color: "#343434" }}>Mon 23th Oct 2023</Text>
                    <Image source={arrow_down}
                      style={{ width: 18, objectFit: 'contain',marginLeft:2  }}
                    />
                  </View>
                </View>
             
                <View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',height:16 }}>
                    <Image source={dollar}
                      style={{ width: 22, objectFit: 'contain' }}
                    />
                    <Text style={{ fontSize: 13, color: "#343434",marginLeft:2 }}>Budget</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, color: "#343434" }}>1 Hour - 5000 Tzs</Text>
                    <Image source={arrow_down}
                      style={{ width: 18, objectFit: 'contain',marginLeft:2  }}
                    />
                  </View>
                </View>
             
              </View>

              <Categories setFilter={setFilter} category={category}/>
              
            </View>
            <View style={{ width: '98%' }}>
              {data?.map((i, index) => {
                let a = JSON.parse(i?.services_images[0]?.images);
                return <FilterServiceBox data={i} images={a}  key={index} />;
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
export default FilterService

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
})