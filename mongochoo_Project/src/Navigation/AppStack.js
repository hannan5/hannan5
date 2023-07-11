import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/Dashboard/Home"
import ProductDetails from "../screens/Dashboard/ProductDetails"

const Homestack = createNativeStackNavigator()

const navOptionHandler = () => (
    {
        headerShown: false
    }
)

export const Homescreenstack = () => {
    return (
        <>
            <Homestack.Navigator initialRouteName='Productdetails'>
                <Homestack.Screen name="Homescreen" component={HomeScreen} options={navOptionHandler} />
                <Homestack.Screen name="Productdetails" component={ProductDetails} options={navOptionHandler} />
            </Homestack.Navigator>
        </>
    )
}