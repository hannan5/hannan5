import { SafeAreaView, StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { FontFamily } from '../../assests/Constants/FontFamily';
import addphoto from '../../assests/icons/Add_photo.png'
import Dropdown from "../../components/Input/Dropdown";
import green_down_arrow from '../../assests/icons/green_down_arrow.png'
import { useState } from "react";
const AddService = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
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
                                    {/* <Image
                    source={arrow}
                    style={{
                      width: 30,
                      objectFit: 'contain',
                    }}
                  /> */}
                                </TouchableOpacity>
                                <View>
                                    {/* <Image
                    source={notify}
                    style={{
                      width: 30,
                      objectFit: 'contain',
                    }}
                  /> */}
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '98%' }}>
                            <Text style={styles.main_heading}>Add Service</Text>

                            <Text style={styles.label_input}>Photo</Text>
                            <View style={styles.input_img}>
                                <Image
                                    source={addphoto}
                                    style={{
                                        width: 40,
                                        objectFit: 'contain',
                                    }}
                                />
                                <Text style={{ ...styles.label_input, marginTop: 0, color: '#5FB945' }}>Click to here Upload photo</Text>
                            </View>
                            <Text style={styles.label_input}>Service Name</Text>
                            <TextInput style={styles.input_field} />

                            <Text style={styles.label_input}>Service Catrgory</Text>
                            {/* <TextInput style={styles.input_field}/> */}
                            <View
                                style={{
                                    // alignItems: 'center',
                                    width: '100%',
                                    marginTop: 10,
                                    borderColor: '#BCF3A9',
                                    borderRadius: 17,
                                    borderWidth: 1,
                                    // height:45
                                }}>
                                <TouchableOpacity
                                    style={{
                                        ...styles.inputcontainer,
                                        borderColor: '#DFDFDF',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'flex-start',
                                        paddingHorizontal:10
                                    }}
                                onPress={() => toggleDropdown()}
                                >
                                    <TextInput
                                        style={{ ...styles.inputStyle }}
                                        placeholder={"Select"}
                                        placeholderTextColor="#B5B5B5"
                                          value={selectedOption}
                                        editable={false}
                                        name={"name"}
                                    />
                                        <Image
                                        source={green_down_arrow}
                                        style={{ width: 20, objectFit: 'contain' }}
                                    />
                                </TouchableOpacity>
                                {isDropdownOpen && (
                                    <View style={styles.dropdownContainer}>
                                        <View style={styles.dropdownOptionsContainer}>
                                            <TouchableOpacity style={styles.optionsContainer}>
                                             
                                                <Text
                                                    style={{ ...styles.inputStyle, color: '#ababab' }}
                                                    onPress={() => {
                                                        setSelectedOption('Plan');
                                                        setIsDropdownOpen(false)
                                                    }}>
                                                    Plan
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>


                            <Text style={styles.label_input}>Price Plan</Text>
                            <View
                                style={{
                                    // alignItems: 'center',
                                    width: '100%',
                                    marginTop: 10,
                                    borderColor: '#BCF3A9',
                                    borderRadius: 17,
                                    borderWidth: 1,
                                    // height:45
                                }}>
                                <TouchableOpacity
                                    style={{
                                        ...styles.inputcontainer,
                                        borderColor: '#DFDFDF',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'flex-start',
                                        paddingHorizontal:10
                                    }}
                                onPress={() => toggleDropdown()}
                                >
                                    <TextInput
                                        style={{ ...styles.inputStyle }}
                                        placeholder={"Select"}
                                        placeholderTextColor="#B5B5B5"
                                          value={selectedOption}
                                        editable={false}
                                        name={"name"}
                                    />
                                        <Image
                                        source={green_down_arrow}
                                        style={{ width: 20, objectFit: 'contain' }}
                                    />
                                </TouchableOpacity>
                                {isDropdownOpen && (
                                    <View style={styles.dropdownContainer}>
                                        <View style={styles.dropdownOptionsContainer}>
                                            <TouchableOpacity style={styles.optionsContainer}>
                                             
                                                <Text
                                                    style={{ ...styles.inputStyle, color: '#ababab' }}
                                                    onPress={() => {
                                                        setSelectedOption('Plan');
                                                        setIsDropdownOpen(false)
                                                    }}>
                                                    Plan
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                        
                            <Text style={styles.label_input}>Amount</Text>
                            <TextInput style={styles.input_field} />

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        </>
    )
}
export default AddService;


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
        fontSize: 29,
        color: '#000000',
        fontWeight: 'normal',
        ...FontFamily.Medium,
        marginBottom: 20
    },
    label_input: {
        fontSize: 13,
        color: '#090909',
        fontWeight: 'normal',
        ...FontFamily.Medium,
        marginTop: 20
    },
    input_img: {
        backgroundColor: '#E3FFD9',
        height: 180,
        marginTop: 10,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input_field: {
        height: 44,
        marginTop: 10,
        borderRadius: 13,
        borderColor: '#bcf3a9',
        borderWidth: 1,
        marginTop: 10,
        color: "#000",
        paddingHorizontal: 10
        // padding:'1px 0px'
    },
    dropdownContainer: {
        // position: 'absolute',
        // top: 50,
        width: '100%',
        // backgroundColor: 'red',
        height: 50,
        borderBottomEndRadius: 17,
        borderBottomLeftRadius: 17,
        borderWidth: 2,
        borderColor: '#ececec',
      },
      dropdownOptionsContainer: {
        // height: 100,
        // backgroundColor: '#000',
        paddingTop:5
      },
      optionsContainer: {
        flexDirection: 'row',
        // height: 45,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
      },
      inputStyle: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#000',
        fontSize: 17,
      },
    
})  