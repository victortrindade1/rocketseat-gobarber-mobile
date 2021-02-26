# Conectando Redux
<!-- TOC -->

- [Conectando Redux](#conectando-redux)
  - [src/pages/SignIn/index.js](#srcpagessigninindexjs)
  - [src/pages/SignUp/index.js](#srcpagessignupindexjs)

<!-- /TOC -->
## src/pages/SignIn/index.js

```diff
-import React, { useRef } from 'react';
+import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
+import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';
+import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

const SignIn = ({ navigation }) => {
+ const dispatch = useDispatch();
  const passwordRef = useRef();

+ const [email, setEmail] = useState('');
+ const [password, setPassword] = useState('');

+   const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
+   dispatch(signInRequest(email, password));
  }

  return (
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
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
+           value={email}
+           onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
+           value={password}
+           onChangeText={setPassword}
          />

-         <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
+         <SubmitButton loading={loading} onPress={handleSubmit}>
+           Acessar
+         </SubmitButton>

        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
};
export default SignIn;
```

## src/pages/SignUp/index.js

```diff
-import React, { useRef } from 'react';
+import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
+import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';
+import { signUpRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

const SignUp = ({ navigation }) => {
+ const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

+ const [name, setName] = useState('');
+ const [email, setEmail] = useState('');
+ const [password, setPassword] = useState('');

+ const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
+   dispatch(signUpRequest(name, email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
+           value={name}
+           onChangeText={setName}
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
+           value={email}
+           onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
+           value={password}
+           onChangeText={setPassword}
          />

-         <SubmitButton onPress={handleSubmit}>Criar conta</SubmitButton>
+         <SubmitButton loading={loading} onPress={handleSubmit}>
+           Criar conta
+         </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
};

export default SignUp;
```
