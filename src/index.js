import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

// eslint-disable-next-line import-helpers/order-imports
import App from './App';
import './config/ReactotronConfig';

import { store, persistor } from './store';

class Index extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('82b2df0e-4cd1-43a9-9d15-4ebd742a37c6');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (data) => {};

  onOpened = (notification) => {};

  onIds = (id) => {};

  render() {
    return (
      <Provider store={store}>
        {/* PersistGate pega o estado antes de renderizar o q tem dentro */}
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
