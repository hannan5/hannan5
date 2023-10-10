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
import profile from '../../assests/icons/vuesax_broken_user.png'
import right_arrow from '../../assests/icons/right-arrow.png'
import notification_setting from '../../assests/icons/notification_setting.png';
import share from '../../assests/icons/share.png';
import unlock from '../../assests/icons/unlock.png';
import globe from '../../assests/icons/global.png';
import term from '../../assests/icons/accountIcon.png';
import add from '../../assests/icons/add.png';
import star from '../../assests/icons/star.png';
import logout from '../../assests/icons/logout.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Setting = ({navigation}) => {
    const logouthandler = async () => {
        await AsyncStorage.setItem('login', 'false');
        navigation.navigate('Signin');
      };
      const profile_nav = ()=>{
        navigation.navigate('Profile');
      }
    const Setting_List = [{
        img:profile,
        name:'Profile',
        onclick:profile_nav
    },
    {
        img:notification_setting,
        name:'Notifications ',
        // onclick:
    },
    {
        img:unlock,
        name:'Change Password',
    },
    {
        img:globe,
        name:'Language',
    },
    {
        img:term,
        name:'Terms & Condition',
    },
    {
        img:add,
        name:'Join Affiliate',
    },
    {
        img:star,
        name:'Rate Mchongoo',
    },
    {
        img:star,
        name:'Share Mchongoo link to win points',
    },
    {
        img:logout,
        name:'Logout',
        onclick:logouthandler
    },]

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


                        <View style={{ width: '98%' }}>
                            <Text style={styles.main_heading}>Setting</Text>
{Setting_List.map((i,index)=>(
                            <View style={styles.row} key={index}>
                            <TouchableOpacity style={styles.row} onPress={()=>{i?.onclick?i.onclick():console.log('hello')}}>
                            <Image source={i?.img} style={styles.img1} />
                            <Text style={styles.text}>{i?.name}</Text>
                            </TouchableOpacity>
                            <Image source={right_arrow} style={styles.img2} />
                        </View>

))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
export default Setting;


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
    img1: { width: 30, objectFit: 'contain' },
    img2: { width: 20, objectFit: 'contain' },
    text: {
        fontSize: 18, 
        fontWeight: 'normal',
        ...FontFamily.Medium, 
        color: '#000',
        marginLeft:10
    },
    row:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:60
    }

})