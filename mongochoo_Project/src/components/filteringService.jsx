import {Image, View, Text, StyleSheet} from 'react-native';
import favourite_img from '../assests/images/Office-Cleaning.png';
import favourite_icon from '../assests/images/fashion-model-in-red.png';
import user_icon from '../assests/icons/user-black.png';
import heart_icon from '../assests/icons/green_heart.png';
import CustomRatingBar from '../components/CustomRatingBar';
import calander_icon from '../assests/icons/calendar.png';
import {FontFamily} from '../assests/Constants/FontFamily';
import {useState} from 'react';

const FilterServiceBox = ({data, images}) => {
  return (
    <>
      <View style={styles.favourite_box}>
        <View style={{width: '45%'}}>
          {images?
          <Image
            source={{
              uri: `http://admin.mchongoo.com/storage/${images[0]}`,
            }}
            style={{width: '100%', objectFit: 'contain', height: 200}}
          />
          :
          <></>
}
        </View>
        <View style={styles.favourite_details_box}>
          <View style={styles.favourite_details_box_upper}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={favourite_icon}
                style={{width: 30, objectFit: 'contain'}}
              />
              <View style={{marginLeft: 5}}>
                <Text
                  style={{
                    color: '#393939',
                    fontSize: 12,
                    fontWeight: 500,
                    ...FontFamily.Medium,
                  }}>
                  {data?.user?.first_name + ' ' + data?.user?.last_name}
                </Text>
                <Text
                  style={{
                    color: '#A7A7A7',
                    fontSize: 12,
                    fontWeight: 300,
                    ...FontFamily.Medium,
                  }}>
                  Cleaner
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={heart_icon}
                style={{width: 20, objectFit: 'contain'}}
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: '#000',
              ...FontFamily.Medium,
            }}>
            {data?.name}
          </Text>

          <View style={styles.favourite_details_row}>
            <Image
              source={calander_icon}
              style={{width: 15, objectFit: 'contain'}}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 300,
                color: '#A7A7A7',
                marginLeft: 10,
                ...FontFamily.Medium,
              }}>
              {data?.experience}
            </Text>
          </View>

          <View style={styles.favourite_details_row}>
            <Image
              source={user_icon}
              style={{width: 15, objectFit: 'contain'}}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 300,
                color: '#A7A7A7',
                marginLeft: 10,
                ...FontFamily.Medium,
              }}>
              {data?.service_type}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <CustomRatingBar rating={data?.rating} />

            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: '#5FB945',
                ...FontFamily.SemiBold,
              }}>
              {data?.service_price + 'Tzs'}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};
export default FilterServiceBox;

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
  favourite_box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 180,
    backgroundColor: '#fff',
    paddingHorizontal: '3%',
    borderRadius: 20,
    justifyContent: 'center',
    marginVertical: '2%',
  },
  favourite_details_box: {
    width: '55%',
    paddingHorizontal: '2%',
    // paddingBottom: 20,
    // height: 300,
  },
  favourite_details_box_upper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  favourite_details_row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
});
