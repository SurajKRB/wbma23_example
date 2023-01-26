import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const Profile = () => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');
  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('Avatar_' + user.user_id);
      setAvatar(avatarArray.pop().filename);
      console.log('user avatar: ', avatarArray.pop());
    } catch (error) {
      console.error('user avatar fetch failed: ', error.message);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Image style={styles.image} source={{uri: uploadsUrl + avatar}} />
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Fullname: {user.full_name}</Text>

      <Button
        title="Logout"
        onPress={async () => {
          console.log('Loggin Out!!');
          setUser({});
          setIsLoggedIn(false);
          try {
            await AsyncStorage.clear();
          } catch (error) {
            console.log('clearing async storage failed');
          }
        }}
      ></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Profile;
