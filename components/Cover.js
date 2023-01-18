import {Image, StyleSheet, View} from 'react-native';
import {Menu, Settings} from 'react-native-feather';

const Cover = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={require('../assets/funnyCat.jpg')}
        resizeMode="contain"
        borderTopRightRadius={150}
      ></Image>
      <Menu
        stroke="white"
        strokeWidth="1.5"
        fill="#fff"
        width={32}
        height={32}
        style={styles.menu}
      ></Menu>
      <Settings
        stroke="white"
        strokeWidth="1.5"
        width={32}
        height={32}
        style={styles.settings}
      ></Settings>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 380,
    height: 250,
  },
  menu: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
  settings: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
});

export default Cover;
