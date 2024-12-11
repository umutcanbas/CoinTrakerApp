import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import CustomInput from '../../components/Input';
import CustomButton from '../../components/Button';

import routes from '../../navigation/routes';

import {useDispatch} from 'react-redux';

import {login} from '../../redux/slice';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      if (email === 'aa@mail.com' || password === '123123') {
        dispatch(login());
        console.log('Giriş yapıldı');

        setLoading(false);
        navigation.replace(routes.APP_NAVIGATOR);
      } else {
        Alert.alert('E-mail and password cannot be empty');
      }
    } catch (error) {
      setLoading(false);
      console.log('HATAA', error);
    }
  };

  const goSingUp = () => {
    navigation.navigate(routes.SINGUP);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <KeyboardAvoidingView behavior="padding"> */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <CustomInput value={email} onChangeText={setEmail} placeholder="E-mail" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        isSecure
      />

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
          isDisabled={email.trim() === '' || password.trim() === ''}
        />
        <CustomButton title="Register" onPress={goSingUp} />
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D4840',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 270,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
