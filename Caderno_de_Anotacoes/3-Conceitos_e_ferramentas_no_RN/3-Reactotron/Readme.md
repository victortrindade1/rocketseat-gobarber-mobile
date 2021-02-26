# Reactotron

Aqui já vou instalar as libs de integração do Reactotron com o Redux.

`yarn add reactotron-react-native reactotron-redux reactotron-redux-saga`

> Por conta de dar erro, o prof já instalou agora tb as libs do Redux:

`yarn add redux redux-saga react-redux`

Se vc precisar (e vai) de usar o async storage do celular do usuário, tem q
configurar no Reactotron. Já vou configurar agora pensando q vc vai usar async
storage (vc precisa pelo menos pra persistir login do usuário, então cala essa
boca!).

## src/config/ReactotronConfig.js

```diff
import Reactotron from 'reactotron-react-native';
+import { reactotronRedux } from 'reactotron-redux';
+import reactotronSaga from 'reactotron-redux-saga';
+import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
- const tron = Reactotron.configure().useReactNative().connect();
+ const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
+   .configure()
+    .useReactNative()
+    .use(reactotronRedux())
+    .use(reactotronSaga())
+    .connect();

  console.tron = tron;

  // tron.clear(); // Opcional. Limpa a tela do Reactotron a cada refresh
}
```

## src/index.js

```diff
import React from 'react';
import { StatusBar } from 'react-native';

+import './config/ReactotronConfig';

import Routes from './routes';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
    <Routes />
  </>
);

export default App;
```
