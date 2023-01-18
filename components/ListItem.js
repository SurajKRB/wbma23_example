import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity style={itemStyles.container}>
      <Image
        style={itemStyles.image}
        source={{uri: item.thumbnails.w160}}
        resizeMode="contain"
        borderBottomLeftRadius={50}
      ></Image>
      <View style={itemStyles.info}>
        <Text style={itemStyles.title}>{item.title}</Text>
        <Text style={itemStyles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const itemStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 175,
    width: 'auto',
    flexDirection: 'row',
    backgroundColor: '#282a31',
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 100,
    marginLeft: 10,
    borderRadius: 10,
  },
  info: {
    flexDirection: 'column',
    height: 'auto',
    padding: 10,
  },
  title: {
    color: '#dcdee0',
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    color: '#9d9ea0',
    fontSize: 15,
    height: 100,
    width: 200,
  },
});

export {ListItem};
