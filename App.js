import {StatusBar} from 'expo-status-bar';
import Home from './views/Home';

const App = () => {
  return (
    <>
      <Home />
      <StatusBar style="auto" />
    </>
  );
};

export {App};
