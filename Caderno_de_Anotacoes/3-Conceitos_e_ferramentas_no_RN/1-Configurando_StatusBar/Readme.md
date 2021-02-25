# Configurando StatusBar

## src/index.js

```diff
import 'react-native-gesture-handler';
import React from 'react';
+import { StatusBar } from 'react-native';
import Routes from './routes';

import './config/ReactotronConfig';

-const App = () => <Routes />;
+const App = () => (
+  <>
+    <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
+    <Routes />
+  </>
+);

export default App;
```
