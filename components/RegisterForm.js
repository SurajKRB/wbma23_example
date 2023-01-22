import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
// import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';
import {Controller, useForm} from 'react-hook-form';

const RegisterForm = (props) => {
  // const {setIsLoggedIn} = useContext(MainContext);
  // const {postLogin} = useAuthentication();
  const {postUser} = useUser();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
  });

  const register = async (registerData) => {
    console.log('Registering: ', registerData);

    try {
      const registerResult = await postUser(registerData);
      console.log('register result: ', registerResult);
    } catch (error) {
      console.error('logIn: ', error);
      // TODO: Notify user about failed login attemps
    }
  };

  return (
    <View>
      <Text>Register Form</Text>
      <Controller
        control={control}
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="User Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text>is required</Text>}
      {errors.username?.type === 'minLength' && (
        <Text>min length is 3 character</Text>
      )}

      <Controller
        control={control}
        rules={{required: true, minLength: 5}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Pasword"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text>password (min. 5 chars) is required</Text>}

      <Controller
        control={control}
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' && <Text>is required</Text>}

      <Controller
        control={control}
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="full_name"
      />
      {errors.username?.type === 'required' && <Text>is required</Text>}
      {errors.username?.type === 'minLength' && (
        <Text>min length is 3 character</Text>
      )}

      <Button title="Register!" onPress={handleSubmit(register)} />
    </View>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
