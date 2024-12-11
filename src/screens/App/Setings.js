import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import TopMenu from '../../components/TopMenu';

import {useDispatch} from 'react-redux';

import {logout} from '../../redux/slice';
import routes from '../../navigation/routes';

const Setings = ({navigation}) => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
    navigation.replace(routes.AUTH_NAVIGATOR);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Settings"
        onPressLeft={() => navigation.goBack()}
        onPressRight={logOut}
        rightIcon="Logout"
      />
    </SafeAreaView>
  );
};

export default Setings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D4840',
  },
});
