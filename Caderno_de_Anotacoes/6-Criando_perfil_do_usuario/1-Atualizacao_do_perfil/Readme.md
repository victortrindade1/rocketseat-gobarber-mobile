# Atualização do perfil

## src/store/modules/user/sagas.js

Vou tirar o avatar_id do payload pq o usuário nem tem avatar.

```diff
import { Alert } from 'react-native';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
-    const { name, email, avatar_id, ...rest } = payload.data;
+    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
-     avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Erro ao atualizar perfil, confira seus dados!'
    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
```

## src/pages/Profile/index.js

```diff
-import React from 'react';
+import React, { useRef, useState, useEffect } from 'react';
-import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
+import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';
+import { updateProfileRequest } from '~/store/modules/user/actions';

+import {
+  Container,
+  Title,
+  Separator,
+  Form,
+  FormInput,
+  SubmitButton,
+} from './styles';

-const Profile = () => <Background />;
+const Profile = () => {
+  const dispatch = useDispatch();
+
+  const profile = useSelector((state) => state.user.profile);
+
+  const emailRef = useRef();
+  const oldPasswordRef = useRef();
+  const passwordRef = useRef();
+  const confirmPasswordRef = useRef();
+
+  const [name, setName] = useState(profile.name);
+  const [email, setEmail] = useState(profile.email);
+  const [oldPassword, setOldPassword] = useState('');
+  const [password, setPassword] = useState('');
+  const [confirmPassword, setConfirmPassword] = useState('');
+
+  useEffect(() => {
+    setOldPassword('');
+    setPassword('');
+    setConfirmPassword('');
+  }, [profile]);
+
+  const handleSubmit = () => {
+    dispatch(
+      updateProfileRequest({
+        name,
+        email,
+        oldPassword,
+        password,
+        confirmPassword,
+      })
+    );
+  };
+
+  return (
+    <Background>
+      <Container>
+        <Title>Meu perfil</Title>
+
+        <Form>
+          <FormInput
+            icon="person-outline"
+            autoCorrect={false}
+            autoCapitalize="none"
+            placeholder="Nome completo"
+            returnKeyType="next"
+            onSubmitEditing={() => emailRef.current.focus()}
+            value={name}
+            onChangeText={setName}
+          />
+          <FormInput
+            icon="mail-outline"
+            keyboardType="email-address"
+            autoCorrect={false}
+            autoCapitalize="none"
+            placeholder="Digite seu e-mail"
+            ref={emailRef}
+            returnKeyType="next"
+            onSubmitEditing={() => oldPasswordRef.current.focus()}
+            value={email}
+            onChangeText={setEmail}
+          />
+
+          <Separator />
+
+          <FormInput
+            icon="lock-outline"
+            secureTextEntry
+            placeholder="Sua senha atual"
+            ref={oldPasswordRef}
+            returnKeyType="next"
+            onSubmitEditing={() => passwordRef.current.focus()}
+            value={oldPassword}
+            onChangeText={setOldPassword}
+          />
+
+          <FormInput
+            icon="lock-outline"
+            secureTextEntry
+            placeholder="Sua nova senha"
+            ref={passwordRef}
+            returnKeyType="next"
+            onSubmitEditing={() => confirmPasswordRef.current.focus()}
+            value={password}
+            onChangeText={setPassword}
+          />
+
+          <FormInput
+            icon="lock-outline"
+            secureTextEntry
+            placeholder="Confirmação de senha"
+            ref={confirmPasswordRef}
+            returnKeyType="send"
+            onSubmitEditing={handleSubmit}
+            value={confirmPassword}
+            onChangeText={setConfirmPassword}
+          />
+
+          <SubmitButton onPress={handleSubmit}>Atualizar perfil</SubmitButton>
+        </Form>
+      </Container>
+    </Background>
+  );
+};

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};

export default Profile;
```

## src/pages/Profile/styles.js

```javascript
import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 30 },
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
```
