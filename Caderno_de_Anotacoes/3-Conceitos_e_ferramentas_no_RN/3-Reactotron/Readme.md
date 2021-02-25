# Reactotron

Aqui já vou instalar as libs de integração do Reactotron com o Redux.

`yarn add reactotron-react-native reactotron-redux reactotron-redux-saga`

> Por conta de dar erro, o prof já instalou agora tb as libs do Redux:

`yarn add redux redux-saga react-redux`

## src/config/ReactotronConfig.js

```diff
import Reactotron from 'reactotron-react-native';
+import { reactotronRedux } from 'reactotron-redux';
+import reactotronSaga from 'reactotron-redux-saga';

if (__DEV__) {
-  const tron = Reactotron.configure().useReactNative().connect();
+const tron = Reactotron.configure()
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
