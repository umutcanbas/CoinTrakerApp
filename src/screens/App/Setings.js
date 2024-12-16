import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

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

  const goCurrencySettings = () => {
    navigation.navigate(routes.OUTTAB_NAVIGATOR, {
      screen: routes.CURRENCY_SETTINGS,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Settings"
        onPressLeft={() => navigation.goBack()}
        onPressRight={logOut}
        rightIcon="Logout"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => goCurrencySettings()}>
        <Text style={styles.buttonText}>Currency Settings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Setings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D4840',
  },
  button: {
    backgroundColor: '#F2F2F2',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blackF',
  },
});
