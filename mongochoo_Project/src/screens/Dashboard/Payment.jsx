import {
  Image,
  Modal,
  Pressable,
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
import airtel from '../../assests/images/Airtel_logo.png';
import vodmon from '../../assests/images/vodmon.png';
import visa from '../../assests/images/Visa_Logo.png';
import tick from '../../assests/icons/tick.png';
import React, {useState} from 'react';
import CardInput from '../../components/Input/CardInput';
import CheckBox from '@react-native-community/checkbox';
import SimpleButton from '../../components/Button/Button';
const PaymentScreen = ({navigation}) => {
  let card = [airtel, vodmon, visa];
  const [selectCard, setSelectCard] = useState(3);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
                  <Text style={styles.main_heading}>Payment</Text>
                </View>
              </View>
            </View>

            <View style={styles.carditem_row}>
              {card?.map((item, index) => (
                <TouchableOpacity
                  style={{
                    ...styles.cardbtn,
                    borderColor: selectCard == index ? '#000' : '#D1D1D1',
                  }}
                  key={index}
                  onPress={() => setSelectCard(index)}>
                  {selectCard == index ? (
                    <View style={styles.tick_View}>
                      <Image
                        source={tick}
                        style={{
                          width: 14,
                          objectFit: 'contain',
                        }}
                      />
                    </View>
                  ) : (
                    <></>
                  )}

                  <Image
                    source={item}
                    style={{
                      width: 60,
                      objectFit: 'contain',
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={{width: '90%'}}>
              <CardInput label="Card Number" />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '48%'}}>
                  <CardInput label="Expire time" />
                </View>
                <View style={{width: '48%'}}>
                  <CardInput label="" />
                </View>
              </View>
              <CardInput label="Card Holder" />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{width: '48%'}}>
                  <CardInput label="CVV" />
                </View>
                <View style={{width: '48%'}}>
                  <Text style={styles.InputLabel}>
                    The last 3 digits on the back of the card.
                  </Text>
                </View>
              </View>
            </View>

            <View style={{width: '90%'}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <CheckBox
                  tintColors={{true: '#000', false: '#000'}}
                  style={styles.checkbox}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <Text style={{...styles.InputLabel, marginLeft: 10}}>
                  Save information for future payment
                </Text>
              </View>
              <SimpleButton
                name="Proceed Payment"
                //   onClick={() => navigation.navigate('OtpVerification')}
                onClick={() => setModalVisible(!modalVisible)}
                // disabled={!toggleCheckBox ? true : false}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
          navigation.navigate('Home');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: '#000',
                borderRadius: 50,
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}>
              <Image
                source={tick}
                style={{
                  width: 25,
                  objectFit: 'contain',
                }}
              />
            </View>

            <Text style={styles.modalText}>Payment Success!</Text>
            <View style={styles.modalRow}>
              <Text style={styles.modal_head1}>Reference Number</Text>
              <Text style={styles.modal_head2}>00A24536647</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modal_head1}>Date</Text>
              <Text style={styles.modal_head2}>23-03-2023</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modal_head1}>Time</Text>
              <Text style={styles.modal_head2}>09:46am</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modal_head1}>Payment Method</Text>
              <Text style={styles.modal_head2}>Credit Card</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modal_head1}>Total Amount</Text>
              <Text style={styles.modal_head2}>15,000TZS</Text>
            </View>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
    </>
  );
};
export default PaymentScreen;

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
  carditem_row: {
    display: 'flex',
    height: 100,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardbtn: {
    height: 50,
    paddingVertical: 15,
    width: 100,
    // backgroundColor: 'red',
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    position: 'relative',
  },
  tick_View: {
    backgroundColor: '#000',
    width: 21,
    height: 21,
    right: -10,
    position: 'absolute',
    top: -10,
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputLabel: {
    color: '#A7A7A7',
    fontSize: 14,
    fontWeight: 'normal',
    ...FontFamily.Medium,
  },
  checkbox: {
    width: 25,
    borderWidth: 2,
    color: '#0000',
    borderRadius: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#000',
  },
  modalView: {
    // margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#232323',
    fontSize: 23,
    fontWeight: 'normal',
    marginTop: 10,
    ...FontFamily.Medium,
  },
  modalRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10,
  },
  modal_head1: {
    color: '#232323',
    fontSize: 16,
    ...FontFamily.Medium,
  },
  modal_head2: {
    color: '#000',
    fontSize: 16,
    ...FontFamily.Medium,
  },
});
