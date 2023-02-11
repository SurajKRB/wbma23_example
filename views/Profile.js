import React, {useContext, useEffect, useState} from 'react';
import {Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Card, Icon, ListItem} from '@rneui/themed';
import PropTypes from 'prop-types';

const Profile = ({navigation}) => {
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
    <Card>
      <Card.Title>{user.username}</Card.Title>
      <Card.Image source={{uri: uploadsUrl + avatar}} />
      <ListItem>
        <Icon name="email"></Icon>
        <ListItem.Title>{user.email}</ListItem.Title>
      </ListItem>
      <ListItem>
        <Icon name="badge"></Icon>
        <ListItem.Title>{user.full_name}</ListItem.Title>
      </ListItem>

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
      />
      <Button
        title="My Files"
        onPress={() => {
          navigation.navigate('MyFiles');
        }}
      />
    </Card>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
