# Listagem de prestadores

## src/pages/New/SelectProvider/index.js

Aqui foram passados os dados do prestador de serviço da página SelectProvider
pra SelectDateTime. Os dados foram passados como segundo parâmetro de
`navigation.navigate`.

```diff
-import React from 'react';
+import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
+import api from '~/services/api';

-// import { Container } from './styles';
+import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

-export default function SelectProvider() {
-  return <Background />;
-}
+export default function SelectProvider({ navigation }) {
+  const [providers, setProviders] = useState([]);
+
+  useEffect(() => {
+    async function loadProviders() {
+      const response = await api.get('providers');
+
+      setProviders(response.data);
+    }
+
+    loadProviders();
+  }, []);
+
+  return (
+    <Background>
+      <Container>
+        <ProvidersList
+          data={providers}
+          keyExtractor={(provider) => String(provider.id)}
+          renderItem={({ item: provider }) => (
+            <Provider
+              onPress={() =>
+                navigation.navigate('SelectDateTime', { provider })
+              }
+            >
+              <Avatar
+                source={{
+                  uri: provider.avatar
+                    ? provider.avatar.url
+                    : `https://robohash.org/${provider.name}.png?set=set2`,
+                }}
+              />
+              <Name>{provider.name}</Name>
+            </Provider>
+          )}
+        />
+      </Container>
+    </Background>
+  );
+}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
```

## src/pages/New/SelectProvider/styles.js

```javascript
import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ProvidersList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 60px;
  padding: 0 20px;
`;

export const Provider = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  flex: 1;

  align-items: center;
  margin: 0 10px 20px;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Name = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;
```

## src/pages/New/SelectDateTime/index.js

```javascript
import React from 'react';

import Background from '~/components/Background';
// import { Container } from './styles';

export default function SelectDateTime() {
  return <Background />;
}

SelectDateTime.navigationOptions = {
  title: 'Selecione o horário',
};
```
