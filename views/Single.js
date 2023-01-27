import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card, Icon, ListItem} from '@rneui/themed';

const Single = ({route}) => {
  const {title, description, filename, time_added: timeAdded} = route.params;
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Image style={styles.image} source={{uri: uploadsUrl + filename}} />
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
