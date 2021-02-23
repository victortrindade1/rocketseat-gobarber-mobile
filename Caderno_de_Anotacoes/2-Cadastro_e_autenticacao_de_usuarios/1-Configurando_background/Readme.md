# Configurando background

P/ colocar fundo degradê:
`yarn add react-native-linear-gradient`

Muitas libs são linkadas automático com o RN, mas esta não está. Então temos q
linkar:

`react-native link react-native-linear-gradient`

> No Mac, tem q entrar na pasta ios e executar o comando `pod install`.

Intale o styled-components: `yarn add styled-components`

> O styled-components do RN precisa de ser importado assim:
> `import styled from 'styled-components/native'`

## src/components/Background/index.js

```javascript
import LinearGradient from 'react-native-linear-gradient';

import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
  colors: ['#7159c1', '#ab59c1'],
})`
  flex: 1;
`;
```

## src/pages/SignIn/index.js

```diff
import React from 'react';
import { Text } from 'react-native';
+import Background from '~/components/Background';
// import { Container } from './styles';

-const SignIn = () => <Text>SingIn</Text>;
+const SignIn = () => (
+  <Background>
+    <Text>SingIn</Text>
+  </Background>
+);

export default SignIn;
```

## src/pages/SignUp/index.js

```diff
import React from 'react';
import { Text } from 'react-native';
+import Background from '~/components/Background';
// import { Container } from './styles';

-const SignUp = () => <Text>SingUp</Text>;
+const SignUp = () => (
+  <Background>
+    <Text>SingUp</Text>
+  </Background>
+);

export default SignUp;
```
