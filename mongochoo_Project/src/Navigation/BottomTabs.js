import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontFamily } from "../assests/Constants/FontFamily";
import { Categoryscreenstack, Homescreenstack } from "./AppStack";
import HomeIcon from '../assests/icons/homeIcon.png'
import noteIcon from '../assests/icons/notes.png'
import categoryIcon from '../assests/icons/category.png'
import heartIcon from '../assests/icons/heart.png'
import settingIcon from '../assests/icons/setting.png'


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
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? HomeIcon
                            : HomeIcon
                    }
                    else if (route.name === 'Notes') {
                        iconName = focused ?
                            noteIcon
                            : noteIcon
                    } else if (route.name === 'Category') {
                        iconName = focused ?
                            categoryIcon
                            : categoryIcon
                    }
                    else if (route.name === 'Heart') {
                        iconName = focused ?
                            heartIcon
                            : heartIcon
                    }
                    else if (route.name === 'Setting') {
                        iconName = focused ?
                            settingIcon
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
            <Tab.Screen name="Heart" component={Homescreenstack} options={navOptionHandler} />
            <Tab.Screen name="Setting" component={Homescreenstack} options={navOptionHandler} />
        </Tab.Navigator>
    );
}