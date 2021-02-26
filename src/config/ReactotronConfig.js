import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  // const tron = Reactotron.configure({ host: '192.168.1.5' })
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure()
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  console.tron = tron;

  // tron.clear(); // Opcional. Limpa a tela do Reactotron a cada refresh
}
