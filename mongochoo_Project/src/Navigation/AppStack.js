import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/Dashboard/Home"
import ProductDetails from "../screens/Dashboard/ProductDetails"
import Category from "../screens/Dashboard/Category"

const Homestack = createNativeStackNavigator()
const CategoryStack = createNativeStackNavigator()
const navOptionHandler = () => (
    {
        headerShown: false
    }
)

export const Homescreenstack = () => {
    return (
        <>
            <Homestack.Navigator initialRouteName='Homescreen'>
                <Homestack.Screen name="Homescreen" component={HomeScreen} options={navOptionHandler} />
                <Homestack.Screen name="Productdetails" component={ProductDetails} options={navOptionHandler} />
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