# Dicas de acessibilidade

A dica é mudar o enter do teclado mobile pra next nos inputs, onde a gnt controla o focus pra onde deve ir o cursor. E pro último input, um enter escrito send.

## src/pages/SignIn/index.js

```diff
-import React from 'react';
+import React, { useRef } from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

-const SignIn = ({ navigation }) => (
+const SignIn = ({ navigation }) => {
+  const passwordRef = useRef();
+
+  function handleSubmit() { }
+
+  return (
  <Background>
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
+         returnKeyType="next"
+         onSubmitEditing={() => passwordRef.current.focus()}
        />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Sua senha secreta"
+          ref={passwordRef}
+          returnKeyType="send"
+          onSubmitEditing={handleSubmit}
        />

-        <SubmitButton onPress={() => { }}>Acessar</SubmitButton>
+        <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>

      </Form>

      <SignLink onPress={() => navigation.navigate('SignUp')}>
        <SignLinkText>Criar conta gratuita</SignLinkText>
      </SignLink>
    </Container>
  </Background>
);

export default SignIn;
```

## src/pages/SignUp/index.js

```diff
-import React from 'react';
+import React, { useRef } from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

-const SignUp = ({ navigation }) => (
+const SignUp = ({ navigation }) => {
+  const emailRef = useRef();
+  const passwordRef = useRef();
+
+  function handleSubmit() { }
+
+  return (
  <Background>
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          icon="person-outline"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome completo"
+          returnKeyType="next"
+          onSubmitEditing={() => emailRef.current.focus()}
        />
        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
+          ref={emailRef}
+          returnKeyType="next"
+          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Sua senha secreta"
+          ref={passwordRef}
+          returnKeyType="send"
+          onSubmitEditing={handleSubmit}
        />

-        <SubmitButton onPress={() => { }}>Acessar</SubmitButton>
+        <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>

      </Form>

-      <SignLink onPress={() => navigation.navigate('SignUp')}>
-        <SignLinkText>Criar conta gratuita</SignLinkText>
-      </SignLink>
+      <SignLink onPress={() => navigation.navigate('SignIn')}>
+        <SignLinkText>Já tenho conta</SignLinkText>
+      </SignLink>
    </Container>
  </Background>
);

export default SignUp;
```
