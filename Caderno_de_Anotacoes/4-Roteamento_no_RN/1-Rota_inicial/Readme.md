# Rota Inicial

Eu vou ter q recriar o App.js. Eu quero usar informações do state do redux pra
fazer useSelector, useDispatch. O problema é q o Redux só funciona dentro do
`<Provider>`. Daí, `<App>` tem de estar dentro de `<Provider>`.

Como vou criar rotas pra navegar por tabs, vou instalar a  lib
`yarn add react-navigation-tabs`

## src/routes.js

```diff
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
+import { createBottomTabNavigator } from 'react-navigation-tabs';

+import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

-export default createAppContainer(
-  createSwitchNavigator({
-    SignIn,
-    SignUp,
-  })
-);
+export default (signedIn = false) =>
+  createAppContainer(
+    createSwitchNavigator(
+      {
+        Sign: createSwitchNavigator({
+          SignIn,
+          SignUp,
+        }),
+        App: createBottomTabNavigator({
+          Dashboard,
+        }),
+      },
+      {
+        initialRouteName: signedIn ? 'App' : 'Sign',
+      }
+    )
+  );
```

## src/pages/Dashboard/index.js

```javascript
import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

const Dashboard = () => <View />;

export default Dashboard;
```

## src/App.js

```javascript
import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

const App = () => {
  const signed = useSelector((state) => state.auth.signed);

  const Routes = createRouter(signed);

  return <Routes />;
};

export default App;
```

## src/index.js

```diff
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

+import App from './App';
import './config/ReactotronConfig';
import Routes from './routes';
import { store, persistor } from './store';

-const App = () => (
+const Index = () => (
  <Provider store={store}>
    {/* PersistGate pega o estado antes de renderizar o q tem dentro */}
    <PersistGate persistor={persistor}>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
-     <Routes />
+     <App />
    </PersistGate>
  </Provider>
);

-export default App;
+export default Index;
```
