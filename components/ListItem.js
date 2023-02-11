import {Alert, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, ListItem as RneuiListItem} from '@rneui/themed';
import {ButtonGroup} from '@rneui/base';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';

const ListItem = ({singleMedia, navigation}) => {
  const {user, update, setUpdate} = useContext(MainContext);
  const {deleteMedia} = useMedia();
  const item = singleMedia;

  const doDelete = () => {
    try {
      Alert.alert('Delete', 'this file permanently', [
        {text: 'Cancel'},
        {
          text: 'OK',
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(item.file_id, token);
            response && setUpdate(!update);
          },
        },
      ]);
    } catch (error) {
      throw new Error('doDelete: ', error.message);
    }
  };

  return (
    <RneuiListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
      <Avatar
        size="large"
        rounded
        source={{uri: uploadsUrl + item.thumbnails?.w160}}
      />
      <RneuiListItem.Content style={styles.title_box}>
        <RneuiListItem.Title>{item.title}</RneuiListItem.Title>
        <RneuiListItem.Subtitle style={styles.sub_title}>
          {item.description}
        </RneuiListItem.Subtitle>
        {item.user_id === user.user_id && (
          <ButtonGroup
            buttons={['Modify', 'Delete']}
            rounded
            onPress={(index) => {
              if (index === 0) {
                navigation.navigate('Modify', {file: item});
              } else {
                doDelete();
              }
            }}
          />
        )}
      </RneuiListItem.Content>
      <RneuiListItem.Content></RneuiListItem.Content>
    </RneuiListItem>
  );
};

const styles = StyleSheet.create({
  button: {},
  title_box: {
    width: 250,
  },
  sub_title: {
    width: 150,
    height: 20,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
