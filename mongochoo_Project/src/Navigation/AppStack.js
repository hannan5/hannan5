import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/Dashboard/Home"
import ProductDetails from "../screens/Dashboard/ProductDetails"
import Category from "../screens/Dashboard/Category"
import FavouriteScreen from "../screens/Dashboard/Favourite"
import OrderScreen from "../screens/Dashboard/Order"
import Cart from "../screens/Dashboard/Cart"
import PaymentScreen from "../screens/Dashboard/Payment"

const Homestack = createNativeStackNavigator()
const CategoryStack = createNativeStackNavigator()
const FavouriteStack = createNativeStackNavigator()

const navOptionHandler = () => (
    {
        headerShown: false
    }
)

export const Homescreenstack = () => {
    return (
        <>
            <Homestack.Navigator initialRouteName='Order'>
                <Homestack.Screen name="Homescreen" component={HomeScreen} options={navOptionHandler} />
                <Homestack.Screen name="Productdetails" component={ProductDetails} options={navOptionHandler} />
                <Homestack.Screen name="Order" component={OrderScreen} options={navOptionHandler} />
                <Homestack.Screen name="Cart" component={Cart} options={navOptionHandler} />
                <Homestack.Screen name="Pay" component={PaymentScreen} options={navOptionHandler} />
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

export const Favouritescreenstack = () => {
    return (
        <>
            <FavouriteStack.Navigator initialRouteName='favouriteScreen'>
                <FavouriteStack.Screen name="favouriteScreen" component={FavouriteScreen} options={navOptionHandler} />
            </FavouriteStack.Navigator>
        </>
    )
}