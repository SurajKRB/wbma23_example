import React, {useRef} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card, Icon, ListItem} from '@rneui/themed';
import {Video} from 'expo-av';

const Single = ({route}) => {
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    media_type: type,
  } = route.params;

  const video = useRef(null);

  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      {type === 'image' ? (
        <Card.Image
          style={styles.image}
          source={{uri: uploadsUrl + filename}}
          style={{width: '100%', height: '100%'}}
        />
      ) : (
        <Video ref={video} source={{uri: uploadsUrl + filename}} />
      )}

      <Card.Divider />
      <ListItem>
        <Icon name="schedule"></Icon>
        <ListItem.Title>
          {timeAdded.split('T')[0] + ', ' + timeAdded.split('T')[1].slice(0, 5)}
        </ListItem.Title>
      </ListItem>
      <Text>{description}</Text>
    </Card>
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
