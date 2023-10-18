import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/Dashboard/Home"
import ProductDetails from "../screens/Dashboard/ProductDetails"
import Category from "../screens/Dashboard/Category"
import FavouriteScreen from "../screens/Dashboard/Favourite"
import OrderScreen from "../screens/Dashboard/Order"
import Cart from "../screens/Dashboard/Cart"
import PaymentScreen from "../screens/Dashboard/Payment"
import FilterService from "../screens/Dashboard/filterService"
import Setting from "../screens/Dashboard/Setting"
import Profile from "../screens/Dashboard/Profile"
import AddService from "../screens/Dashboard/AddService"

const Homestack = createNativeStackNavigator()
const CategoryStack = createNativeStackNavigator()
const FavouriteStack = createNativeStackNavigator()
const FilterServiceStack = createNativeStackNavigator()
const SettingStack = createNativeStackNavigator()


const navOptionHandler = () => (
    {
        headerShown: false
    }
)

export const Homescreenstack = () => {
    return (
        <>
            <Homestack.Navigator initialRouteName='AddService'>
                <Homestack.Screen name="Homescreen" component={HomeScreen} options={navOptionHandler} />
                <Homestack.Screen name="Productdetails" component={ProductDetails} options={navOptionHandler} />
                <Homestack.Screen name="Order" component={OrderScreen} options={navOptionHandler} />
                <Homestack.Screen name="Cart" component={Cart} options={navOptionHandler} />
                <Homestack.Screen name="Pay" component={PaymentScreen} options={navOptionHandler} />
                <Homestack.Screen name="AddService" component={AddService} options={navOptionHandler} />
            </Homestack.Navigator>
        </>
    )
}

export const Categoryscreenstack = () => {
    return (
        <>
            <CategoryStack.Navigator initialRouteName='categoryScreen'>
                <CategoryStack.Screen name="categoryScreen" component={Category} options={navOptionHandler} />
            </CategoryStack.Navigator>
        </>
    )
}

export const Filterscreenstack = () => {
    return (
        <>
            <FilterServiceStack.Navigator initialRouteName='filterScreen'>
                <FilterServiceStack.Screen name="filterScreen" component={FilterService} options={navOptionHandler} />
            </FilterServiceStack.Navigator>
        </>
    )
}

export const Favouritescreenstack = () => {
    return (
        <>
            <FavouriteStack.Navigator initialRouteName='favouriteScreen'>
                <FavouriteStack.Screen name="favouriteScreen" component={FavouriteScreen} options={navOptionHandler} />
            </FavouriteStack.Navigator>
        </>
    )
}

export const Settingscreenstack = () => {
    return (
        <>
            <SettingStack.Navigator initialRouteName='SettingScreen'>
            <SettingStack.Screen name="Profile" component={Profile} options={navOptionHandler} />
                <SettingStack.Screen name="SettingScreen" component={Setting} options={navOptionHandler} />
            </SettingStack.Navigator>
        </>
    )
}