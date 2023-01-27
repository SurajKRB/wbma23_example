import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, ListItem as RneuiListItem} from '@rneui/themed';

const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  return (
    <RneuiListItem bottomDivider>
      <Avatar rounded source={{uri: uploadsUrl + item.thumbnails?.w160}} />
      <RneuiListItem.Content style={styles.title_box}>
        <RneuiListItem.Title>{item.title}</RneuiListItem.Title>
        <RneuiListItem.Subtitle style={styles.sub_title}>
          {item.description}
        </RneuiListItem.Subtitle>
      </RneuiListItem.Content>
      <RneuiListItem.Content>
        <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate('Single', item);
          }}
        >
          View
        </Button>
      </RneuiListItem.Content>
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
