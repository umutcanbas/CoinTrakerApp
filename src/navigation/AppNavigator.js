import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from './routes';

import Home from '../screens/App/Home';
import Favorites from '../screens/App/Favorites';

import HomeLine from '../assets/icons/home.svg';
import HomeFill from '../assets/icons/home-fill.svg';
import Profile from '../assets/icons/user.svg';
import ProfileFill from '../assets/icons/user-fill.svg';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
 

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0.4,
          backgroundColor: '#2D4840',
        },
        tabBarIcon: ({focused}) => {
          let IconComponent;
          if (route.name === routes.HOME) {
            IconComponent = focused ? HomeFill : HomeLine;
          } if (route.name === routes.FAVORITES) {
            IconComponent = focused ? ProfileFill : Profile;
          }

          return <IconComponent width={33} height={33} style={{marginTop:20}} />;
        },
      })}>
      <Tab.Screen name={routes.HOME} component={Home} />
      <Tab.Screen name={routes.FAVORITES} component={Favorites} />
    </Tab.Navigator>
  );
};

export default AppNavigator;