import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import notify from '../../assests/icons/notification.png';
import arrow from '../../assests/icons/arrow-left.png';
import truck from '../../assests/icons/truck.png';
import ITicon from '../../assests/icons/IT-icon.png';
  import retailicon from '../../assests/icons/retail-icon.png';
  import marketingicon from '../../assests/icons/marketing-icon.png';
  import constructionicon from '../../assests/icons/construction-icon.png';
  import facilityicon from '../../assests/icons/facility-icon.png';
import {useEffect, useState} from 'react';
import {FontFamily} from '../../assests/Constants/FontFamily';
import { getCategory } from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Category = ({navigation}) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [data,setData] = useState([])
  const getData = async () => {
    getCategory()
      .then(res => {
        console.log(res?.data?.data.length)
        setData(res?.data?.data)
      })
      .catch(e => console.log(e));
      };

      useEffect(()=>{
        getData()
      },[])
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
        }}
        showsVerticalScrollIndicator={false}>
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
                paddingVertical: '2%',
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
                    width: 25,
                    objectFit: 'contain',
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{width: '98%'}}>
            <Text style={styles.heading}>Category</Text>
          </View>
          <View style={{width: '98%'}}>
            <View style={styles.category_row}>
              {data?.map((item,index)=>(
                 <TouchableOpacity style={styles.category_View} key={index} onPress={()=>{
                   navigation.navigate('Notes');
                   AsyncStorage.setItem('ServiceId',JSON.stringify(item?.id))
                   }} >
                 <View style={styles.category_icon_view}>
                   <Image
                     source={truck}
                     style={{
                       width: '80%',
                       objectFit: 'contain',
                     }}
                   />
                 </View>
                 <Text
                   style={{
                     color: '#000',
                     fontSize: 18,
                     textAlign: 'center',
                     ...FontFamily.Medium,
                   }}>
                   {item?.name}
                 </Text>
               </TouchableOpacity>
              ))}
              {/* <View style={styles.category_View}>
                <View style={styles.category_icon_view}>
                  <Image
                    source={truck}
                    style={{
                      width: '80%',
                      objectFit: 'contain',
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                    textAlign: 'center',
                    ...FontFamily.Medium,
                  }}>
                  Logistic{' '}
                </Text>
              </View>
              <View style={styles.category_View}>
                <View style={styles.category_icon_view}>
                  <Image
                    source={retailicon}
                    style={{
                      width: '80%',
                      objectFit: 'contain',
                    }}
                  />
                </View>
                <Text
                  style={{color: '#000', fontSize: 18, textAlign: 'center'}}>
                  Retail service{' '}
                </Text>
              </View>
            </View>
            <View style={styles.category_row}>
              <View style={styles.category_View}>
                <View style={styles.category_icon_view}>
                  <Image
                    source={ITicon}
                    style={{
                      width: '80%',
                      objectFit: 'contain',
                    }}
                  />
                </View>
                <Text
                  style={{color: '#000', fontSize: 18, textAlign: 'center'}}>
                  IT Service{' '}
                </Text>
              </View>
              <View style={styles.category_View}>
                <View style={styles.category_icon_view}>
                  <Image
                    source={marketingicon}
                    style={{
                      width: '80%',
                      objectFit: 'contain',
                    }}
                  />
                </View>
                <Text
                  style={{color: '#000', fontSize: 18, textAlign: 'center'}}>
                  Marketing{' '}
                </Text>
              </View>
            </View>
            <View style={styles.category_row}>
              <View style={styles.category_View}>
                <View style={styles.category_icon_view}>
                  <Image
                    source={constructionicon}
                    style={{
                      width: '80%',
                      objectFit: 'contain',
                    }}
                  />
                </View>
                <Text
                  style={{color: '#000', fontSize: 18, textAlign: 'center'}}>
                  Construction{' '}
                </Text>
              </View>
              <View style={styles.category_View}>
                <View style={styles.category_icon_view}>
                  <Image
                    source={facilityicon}
                    style={{
                      width: '80%',
                      objectFit: 'contain',
                    }}
                  />
                </View>
                <Text
                  style={{color: '#000', fontSize: 18, textAlign: 'center'}}>
                  Facility Service{' '}
                </Text>
              </View> */}
            </View>
          </View>
          <View
            style={{
              width: '20%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={{
                ...styles.dot,
                backgroundColor: currentScreen == 0 ? '#000' : '#fff',
              }}
              onPress={() => setCurrentScreen(0)}></TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.dot,
                backgroundColor: currentScreen == 1 ? '#000' : '#fff',
              }}
              onPress={() => setCurrentScreen(1)}></TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.dot,
                backgroundColor: currentScreen == 2 ? '#000' : '#fff',
              }}
              onPress={() => setCurrentScreen(2)}></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Category;

const styles = StyleSheet.create({
  head_screen: {
    width: '95%',
  },
  heading: {
    fontSize: 44,
    color: '#000',
    ...FontFamily.SemiBold,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  category_row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    flexWrap:'wrap'
  },
  category_View: {
    alignItems: 'center',
    width: '48%',
    marginBottom:10
  },
  category_icon_view: {
    width: '100%',
    backgroundColor: '#E3FFD9',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 35,
    height: 140,
    marginBottom: 10,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 20,
    border: '2px solid #000',
    borderWidth: 1,
  },
});
