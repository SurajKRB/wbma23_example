import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card, Icon, ListItem} from '@rneui/themed';
import {Video} from 'expo-av';
import {useFavourite, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route}) => {
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    media_type: type,
    user_id: userId,
    screenshot,
    file_id: id,
  } = route.params;

  const video = useRef(null);
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([]);
  const [userLikesIt, setUserLikesIt] = useState(true);
  const {getUserById} = useUser();
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();

  const getOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const owner = await getUserById(userId, token);
      setOwner(owner);
    } catch (error) {
      console.log(error);
    }
  };

  const getLikes = async () => {
    try {
      const likes = await getFavouritesByFileId(id);
      setLikes(likes);

      // TODO:
    } catch (error) {
      throw new Error('getLikes: ', error.message);
    }
  };

  const likeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavourite(id, token);
      getLikes();
      setUserLikesIt(true);
    } catch (error) {
      throw new Error('likeFile: ', error.message);
    }
  };

  const disLikeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(id, token);
      getLikes();
      setUserLikesIt(false);
    } catch (error) {
      throw new Error('disLikeFile: ', error.message);
    }
  };

  useEffect(() => {
    getOwner();
    getLikes();
  }, []);

  return (
    <ScrollView>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        {type === 'image' ? (
          <Card.Image
            style={styles.image}
            source={{uri: uploadsUrl + filename}}
          />
        ) : (
          <Video
            ref={video}
            source={{uri: uploadsUrl + filename}}
            style={{width: '100%', height: 300}}
            useNativeControls
            resizeMode="cover"
            onError={(error) => {
              console.log(error);
            }}
            isLooping
            usePoster
            posterSource={{uri: uploadsUrl + screenshot}}
          />
        )}

        <Card.Divider />
        {description && (
          <ListItem>
            <Text>{description}</Text>
          </ListItem>
        )}

        <ListItem>
          <Icon name="schedule"></Icon>
          <Text>{new Date(timeAdded).toLocaleString('fi-FI')}</Text>
        </ListItem>

        <ListItem>
          <Icon name="person"></Icon>
          <Text>
            {owner.username} ({owner.full_name})
          </Text>
        </ListItem>
        <ListItem>
          {userLikesIt ? (
            <Icon name="favorite" color="red" onPress={disLikeFile} />
          ) : (
            <Icon name="favorite-border" onPress={likeFile} />
          )}

          <Text>Likes: {likes.length}</Text>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
