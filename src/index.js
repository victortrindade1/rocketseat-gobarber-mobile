import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

// eslint-disable-next-line import-helpers/order-imports
import App from './App';
import './config/ReactotronConfig';

import { store, persistor } from './store';

const Index = () => (
  <Provider store={store}>
    {/* PersistGate pega o estado antes de renderizar o q tem dentro */}
    <PersistGate persistor={persistor}>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <App />
    </PersistGate>
  </Provider>
);

export default Index;
