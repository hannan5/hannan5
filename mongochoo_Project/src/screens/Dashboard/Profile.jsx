import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { FontFamily } from '../../assests/Constants/FontFamily';
import arrow from '../../assests/icons/arrow-left.png';
import notify from '../../assests/icons/notification.png';
import img from '../../assests/images/profile-img.png'
import starfill from '../../assests/icons/start-filled.png'
import profiles from '../../assests/icons/identifyicon.png'
import right_arrow from '../../assests/icons/right-arrow.png'
import post_icon from '../../assests/icons/post_icon.png'
import wallet_icon from '../../assests/icons/wallet_icon.png'
import buyer_icon from '../../assests/icons/buyer_icon.png'
import order_icon from '../../assests/icons/order_icon.png'


const Profile = ({navigation}) =>{
    const Setting_List = [{
        img:profiles,
        name:'Personal info',
    },
    {
        img:post_icon,
        name:'Post a request ',
    },
    {
        img:wallet_icon,
        name:'Wallet',
    },
    {
        img:buyer_icon,
        name:'Buyer requests',
    },
    {
        img:order_icon,
        name:'Manage orders',
    },
]
    return(
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

<View>
    <Image source={img} style={{objectFit:'contain'}}/>
    <Text style={styles.main_heading}>Omary Hassan</Text>
    <Text style={styles.small_heading}>omaryhassan20</Text>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:5}}>
    <Image source={starfill} style={{width:15,objectFit:'contain'}}/>
    <Image source={starfill} style={{width:15,objectFit:'contain'}}/>
    <Image source={starfill} style={{width:15,objectFit:'contain'}}/>
    <Image source={starfill} style={{width:15,objectFit:'contain'}}/>
    <Image source={starfill} style={{width:15,objectFit:'contain'}}/>
    <Text style={{...styles.small_heading,fontSize:14,marginLeft:5}}>3.5</Text>
    </View>

    <Text style={{...styles.small_heading,fontSize:15,marginTop:5}}>Personal Balance</Text>
    <Text style={{...styles.small_heading,fontSize:24}}>350,000 TZS</Text>
</View>
<View style={{marginTop:10, display:'flex',flexDirection:'row',justifyContent:'space-between',width:'85%',marginTop:20}}>
    <View>
    <Text style={{...styles.small_heading,fontSize:10}}>Following</Text>
    <Text style={{...styles.small_heading,fontSize:20,marginTop:5,color:'#5FB945'}}>342</Text>
    </View>
    <View>
    <Text style={{...styles.small_heading,fontSize:10}}>Posts</Text>
    <Text style={{...styles.small_heading,fontSize:20,marginTop:5,color:'#5FB945'}}>42</Text>
    </View>
    <View>
    <Text style={{...styles.small_heading,fontSize:10}}>Offers</Text>
    <Text style={{...styles.small_heading,fontSize:20,marginTop:5,color:'#5FB945'}}>54</Text>
    </View>
    <View>
    <Text style={{...styles.small_heading,fontSize:10}}>Followers</Text>
    <Text style={{...styles.small_heading,fontSize:20,marginTop:5,color:'#5FB945'}}>34k</Text>
    </View>
</View>
<View style={{width:'95%',marginTop:20}}>
{Setting_List.map((i,index)=>(
                            <View style={styles.row} key={index}>
                            <View style={styles.row}>
                            <Image source={i?.img} style={styles.img1} />
                            <Text style={styles.text}>{i?.name}</Text>
                            </View>
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
export default Profile;


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
        fontWeight:500,
        ...FontFamily.SemiBold,
    },
    small_heading:{
        fontSize: 18,
        color: '#000000',
        fontWeight:'normal',
        ...FontFamily.Medium,
        textAlign:'center'
    },
    img1: { width: 50, objectFit: 'contain' },
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