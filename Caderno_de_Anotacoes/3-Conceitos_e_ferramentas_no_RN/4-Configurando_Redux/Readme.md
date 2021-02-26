# Configurando Redux

<!-- TOC -->

- [Configurando Redux](#configurando-redux)
  - [src/store/index.js](#srcstoreindexjs)
  - [src/store/persistReducers.js](#srcstorepersistreducersjs)
  - [src/config/ReactotronConfig.js](#srcconfigreactotronconfigjs)
  - [src/store/createStore.js](#srcstorecreatestorejs)
  - [src/services/api.js](#srcservicesapijs)
  - [src/store/modules/auth/sagas.js](#srcstoremodulesauthsagasjs)
  - [src/store/modules/user/sagas.js](#srcstoremodulesusersagasjs)
  - [src/index.js](#srcindexjs)

<!-- /TOC -->

Aqui copiou toda a pasta store do GoBarberWeb, pois o q tem de módulos são
apenas user e auth, q é o q a gnt quer.

Aqui a única diferença na pasta store é q `process.env.NODE_ENV` agora é
`__DEV__`.

Tem q instalar um monte de lib, mas foi instalada na aula passada. Intale tb:
`yarn add redux-persist immer`
`yarn add @react-native-community/async-storage`

## src/store/index.js

```diff
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import persistReducers from './persistReducers';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

-const sagaMonitor =
-  process.env.NODE_ENV === 'development'
-    ? console.tron.createSagaMonitor()
-    : null;
+const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
```

## src/store/persistReducers.js

```diff
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
+import AsyncStorage from '@react-native-community/async-storage';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
-     storage,
+     storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
```

## src/config/ReactotronConfig.js

```diff
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
+import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  // const tron = Reactotron.configure({ host: '192.168.1.5' })
- const tron = Reactotron.configure()
+ const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
+   .configure()
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  console.tron = tron;

  // tron.clear(); // Opcional. Limpa a tela do Reactotron a cada refresh
}
```

## src/store/createStore.js

```diff
import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhancer =
-   process.env.NODE_ENV === 'development'
+   __DEV__
      ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
```

## src/services/api.js

`yarn add axios`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.6:3333', // IP do localhost backend
});

export default api;
```

## src/store/modules/auth/sagas.js

```diff
+import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
-import { toast } from 'react-toastify';

-import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

-    if (!user.provider) {
+    // Dessa vez é o contrário. Prestadores não podem logar no app
+    if (user.provider) {
-      toast.error('Usuário não é prestador');
+      Alert.alert(
+        'Erro no login',
+        'O usuário não pode ser prestador de serviço'
+      );
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

-    history.push('/dashboard');
+    // history.push('/dashboard');
  } catch (err) {
-    toast.error('Falha na autenticação, verifique seus dados');
+    Alert.alert(
+      'Falha na autenticação',
+      'Houve um erro no login. Verifique seus dados'
+    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
-      provider: true,
    });

-    history.push('/');
+    // history.push('/');
  } catch (err) {
-    toast.error('Falha no cadastro, verifique seus dados');
+    Alert.alert(
+      'Falha no cadastro',
+      'Houve um erro no cadastro. Verifique seus dados'
+    );
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // Magicamente somente com o history push pra raiz já desloga automaticamente
-  history.push('/');
+  // history.push('/');
}

// A action persist/REHYDRATE vem pronta da lib redux-persist
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
```

## src/store/modules/user/sagas.js

```diff
+import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
-import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

-    toast.success('Perfil atualizado com sucesso!');
+    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
-    toast.error('Erro ao atualizar perfil, confira seus dados!');
+    Alert.alert(
+      'Falha na autenticação',
+      'Erro ao atualizar perfil, confira seus dados!'
+    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
```

## src/index.js

```diff
import React from 'react';
import { StatusBar } from 'react-native';
+import { Provider } from 'react-redux';

+import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';

import Routes from './routes';
+import { store, persistor } from './store';

const App = () => (
-  <>
+  <Provider store={store}>
+    {/* PersistGate pega o estado antes de renderizar o q tem dentro */}
+    <PersistGate persistor={persistor}>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
+    </PersistGate>
-  </>
+  </Provider>
);

export default App;
```
