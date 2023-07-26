import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontFamily } from "../assests/Constants/FontFamily";
import { Categoryscreenstack, Favouritescreenstack, Homescreenstack } from "./AppStack";
import HomeIcon from '../assests/icons/home.png'
import Homeactive from '../assests/icons/homeIcon.png'
import noteIcon from '../assests/icons/notes.png'
import noteactive from '../assests/icons/notes-active.png'
import categoryIcon from '../assests/icons/category.png'
import categoryactive from '../assests/icons/category-active.png'

import heartIcon from '../assests/icons/heart.png'
import heartactive from '../assests/icons/heart-active.png'

import settingIcon from '../assests/icons/setting.png'
import settingactive from '../assests/icons/setting-active.png'



import { Image } from 'react-native'

const Tab = createBottomTabNavigator();
const navOptionHandler = () => (
    {
        headerShown: false,
    }
)
export default function TabNavigation() {
    return (

        <Tab.Navigator initialRouteName='Home'

            screenOptions={({ route }) => ({

                unmountOnBlur: true,
                tabBarStyle: {
                    borderTopWidth: 0,
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    elevation: 0,
                },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? Homeactive
                            : HomeIcon
                    }
                    else if (route.name === 'Notes') {
                        iconName = focused ?
                            noteactive
                            : noteIcon
                    } else if (route.name === 'Category') {
                        iconName = focused ?
                            categoryactive
                            : categoryIcon
                    }
                    else if (route.name === 'Heart') {
                        iconName = focused ?
                            heartactive
                            : heartIcon
                    }
                    else if (route.name === 'Setting') {
                        iconName = focused ?
                            settingactive
                            : settingIcon
                    }
                    return <Image source={iconName} style={{ width: 20, height: 20 }}
                        resizeMode='contain' />;
                },
                tabBarActiveBackgroundColor: "#f5f5f5",
                tabBarInactiveBackgroundColor: "#fff",
                tabBarActiveTintColor: "gray",
                tabBarInactiveTintColor: "gray",
                tabBarLabelStyle: FontFamily.SemiBold,
                borderTopWidth: 0,
                borderTopColor: "#fff",

            })}>
            <Tab.Screen name="Home" component={Homescreenstack} options={navOptionHandler} />
            <Tab.Screen name="Notes" component={Homescreenstack} options={navOptionHandler} />
            <Tab.Screen name="Category" component={Categoryscreenstack} options={navOptionHandler} />
            <Tab.Screen name="Heart" component={Favouritescreenstack} options={navOptionHandler} />
            <Tab.Screen name="Setting" component={Homescreenstack} options={navOptionHandler} />
        </Tab.Navigator>
    );
}