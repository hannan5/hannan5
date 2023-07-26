import starImageFilled from '../assests/icons/start-filled.png';
import starImageCorner from '../assests/icons/star-unfill.png';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useState} from 'react';
import {FontFamily} from '../assests/Constants/FontFamily';
const CustomRatingBar = ({rating}) => {
  console.log(rating, 'rating');
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [defaultRating, setDefaultRating] = useState(rating);
  //   console.log(defaultRating, 'rating');

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.customRatingBarStyle}>
          {maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setDefaultRating(item)}>
                <Image
                  style={styles.starImageStyle}
                  source={item <= rating ? starImageFilled : starImageCorner}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.textStyle}>
          {/* To show the rating selected */}
          {rating}
        </Text>
      </View>
    </>
  );
};
export default CustomRatingBar;

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    // marginTop: 30,
  },
  starImageStyle: {
    width: 12,
    height: 12,
    objectFit: 'contain',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 11,
    color: '#000',
    marginLeft: 5,
    ...FontFamily.Medium,
  },
});
