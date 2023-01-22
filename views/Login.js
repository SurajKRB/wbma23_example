import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication, useUser} from '../hooks/ApiHooks';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();

  const logIn = async () => {
    console.log('Button pressed');
    // setIsLoggedIn(true);
    const data = {username: 'Suraj', password: 'hahahaha'};
    try {
      const loginResult = await postLogin(data);
      // console.log('loginResult.token: ', loginResult.token);

      await AsyncStorage.setItem('userToken', loginResult.token);
    } catch (error) {
      console.error('logIn: ', error);
    }
  };

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await getUserByToken(userToken);
      // console.log('checkToken: ', userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('no valid token available');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
