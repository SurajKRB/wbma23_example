import {StatusBar} from 'react-native';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import Cover from './components/Cover';
import {List} from './components/List';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#121418'} barStyle={'light-content'} />
        <Cover />
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121418',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
});
export default App;
