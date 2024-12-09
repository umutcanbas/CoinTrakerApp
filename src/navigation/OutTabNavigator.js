import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CoinDetail from '../screens/App/CoinDetail';

import routes from './routes';

const Stack = createNativeStackNavigator();

const OutTabNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.COINDETAIL} component={CoinDetail} />
    </Stack.Navigator>
  );
};

export default OutTabNavigator;
