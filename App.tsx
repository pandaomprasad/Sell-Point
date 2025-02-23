import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import HomeScreen from './Screens/HomeScreen';
import StackNavigation from './Navigation/navigation';

const App = () => {
    return (
      <Provider store={store}>
      <StackNavigation />
  </Provider>
    );
};

export default App;