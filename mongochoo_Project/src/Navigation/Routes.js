import { AuthRoutes } from './AuthStack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { AppRoutes } from './BottomTabs';

const Routes = () => {
  const MainStackNavigator = createNativeStackNavigator();
  const navOptionHandler = () => ({
    headerShown: false,
  });
  return (
    <>
      <MainStackNavigator.Navigator initialRouteName={'AuthNavigation'}>
        <MainStackNavigator.Screen
          name="AuthNavigation"
          component={AuthRoutes}
          options={navOptionHandler}
        />
        {/* <MainStackNavigator.Screen
          name="HomeNavigation"
          component={AppRoutes}
          options={navOptionHandler}
        /> */}
      </MainStackNavigator.Navigator>
    </>
  );
};
export default Routes;
