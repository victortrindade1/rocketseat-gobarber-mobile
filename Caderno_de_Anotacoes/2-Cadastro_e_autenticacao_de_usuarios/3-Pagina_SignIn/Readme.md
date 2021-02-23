# Página SignIn

## src/pages/SignIn/index.js

```diff
import React from 'react';
-import { Text } from 'react-native';
+import { Image } from 'react-native';

+import logo from '~/assets/logo.png';
import Background from '~/components/Background';
-import Button from '~/components/Button';
-import Input from '~/components/Input';

-// import { Container } from './styles';

+import {
+  Container,
+  Form,
+  FormInput,
+  SubmitButton,
+  SignLink,
+  SignLinkText,
+} from './styles';

const SignIn = () => (
  <Background>
-    <Text>SingIn</Text>
-    <Input
-      style={{ marginTop: 30 }}
-      icon="call"
-      placeholder="Digite seu nome"
-    />
-    <Button>Entrar</Button>
+    <Container>
+      <Image source={logo} />
+
+      <Form>
+        <FormInput
+          icon="mail-outline"
+          keyboardType="email-address"
+          autoCorrect={false}
+          autoCapitalize="none"
+          placeholder="Digite seu e-mail"
+        />
+
+        <FormInput
+          icon="lock-outline"
+          secureTextEntry
+          placeholder="Sua senha secreta"
+        />
+
+        <SubmitButton onPress={() => { }}>Acessar</SubmitButton>
+      </Form>
+
+      <SignLink onPress={() => { }}>
+        <SignLinkText>Criar conta gratuita</SignLinkText>
+      </SignLink>
+    </Container>
  </Background>
);

export default SignIn;
```

## src/pages/SignIn/styles.js

No iOS tem um bug. Qnd o usuário clica no input, o teclado sobe porém fica em
cima do form. Este bug não acontece no android, q sobe o form qnd o teclado é
acionado. Pra consertar, vamos usar a propriedade `KeyboardAvoidingView`
habilitada apenas pra iOS.

```javascript
import { Platform } from 'react-native';

import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
```
