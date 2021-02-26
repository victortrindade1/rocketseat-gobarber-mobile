import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';
import Routes from './routes';
import { store, persistor } from './store';

const App = () => (
  <Provider store={store}>
    {/* PersistGate pega o estado antes de renderizar o q tem dentro */}
    <PersistGate persistor={persistor}>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </PersistGate>
  </Provider>
);

export default App;
