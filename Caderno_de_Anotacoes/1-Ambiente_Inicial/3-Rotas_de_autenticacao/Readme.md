# Rotas de autenticação

Vá na documentação pegar as libs de instalação. O professor vai usar a v4, mas
existe a v5. Vou usar v4 aqui.

`yarn add react-navigation react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

## P/ MacOS

Entra na pasta ios e digite `pod install`

## P/ Android

Encontre o arquivo MainActivity.java em android.

### android/app/src/main/java/com/gobarber_mobile/MainActivity.java

```diff
package com.gobarber_mobile;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "gobarber_mobile";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+        return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```

### src/index.js

```diff
+import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';

import './config/ReactotronConfig';

const App = () => (
  <View>
    <Text>Hello World</Text>
  </View>
);

export default App;
```

## src/routes.js

Minhas primeiras rotas são pra SignIn e SignUp. Estas rotas não é pra ficar no
histórico de rotas, pq após login, não quero q o usuário consiga voltar pra tela
de SignIn. Para não ter este histórico, uso o `createSwitchNavigator`.

```javascript
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
  })
);
```

## src/pages/SignIn/index.js

```javascript
import React from 'react';
import { Text } from 'react-native';

// import { Container } from './styles';

const SignIn = () => <Text>SingIn</Text>;

export default SignIn;
```

## src/pages/SignUp/index.js

```javascript
import React from 'react';
import { Text } from 'react-native';

// import { Container } from './styles';

const SignUp = () => <Text>SingUp</Text>;

export default SignUp;
```

## src/index.js

```diff
import 'react-native-gesture-handler';
import React from 'react';
-import { View, Text } from 'react-native';
+import Routes from './routes';

import './config/ReactotronConfig';

-const App = () => (
-  <View>
-    <Text>Hello World</Text>
-  </View>
-);
+const App = () => <Routes />;

export default App;
```
