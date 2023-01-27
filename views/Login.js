import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button, Text} from '@rneui/themed';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setuser} = useContext(MainContext);

  const {getUserByToken} = useUser();

  const [toggleFrom, setToggleFrom] = useState(true);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await getUserByToken(userToken);
      console.log('checkToken: ', userData);
      setuser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('no valid token available');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1}}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {toggleFrom ? <LoginForm /> : <RegisterForm />}
        <Text>
          {toggleFrom
            ? 'No account yet, Register?'
            : 'Already have an account, Login'}
        </Text>
        <Button
          type="outline"
          title={toggleFrom ? 'Go to Register' : 'Go to Login'}
          onPress={() => {
            setToggleFrom(!toggleFrom);
          }}
        />
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
