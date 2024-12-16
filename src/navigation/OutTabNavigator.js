import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CoinDetail from '../screens/App/CoinDetail';

import routes from './routes';
import Setings from '../screens/App/Setings';
import CurrencySettings from '../screens/App/CurrencySettings';

const Stack = createNativeStackNavigator();

const OutTabNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.COINDETAIL} component={CoinDetail} />
      <Stack.Screen name={routes.SETTINGS} component={Setings} />
      <Stack.Screen name={routes.CURRENCY_SETTINGS} component={CurrencySettings} />

    </Stack.Navigator>
  );
};

export default OutTabNavigator;
