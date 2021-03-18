# Selecionando horário

## src/pages/New/SelectDateTime/index.js

```diff
-import React, { useState } from 'react';
+import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
+import api from '~/services/api';

-import { Container } from './styles';
+import { Container, HourList, Hour, Title } from './styles';

-export default function SelectDateTime() {
+export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
+ const [hours, setHours] = useState([]);

+ const provider = navigation.getParam('provider');

+  useEffect(() => {
+    async function loadAvailable() {
+      const response = await api.get(`providers/${provider.id}/available`, {
+        params: {
+          date: date.getTime(),
+        },
+      });
+
+      setHours(response.data);
+    }
+
+    loadAvailable();
+  }, [date, provider.id]);
+
+  function handleSelectHour(time) {
+    navigation.navigate('Confirm', {
+      provider,
+      time,
+    });
+  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

+        <HourList
+          data={hours}
+          keyExtractor={(item) => item.time}
+          renderItem={({ item }) => (
+            <Hour
+              onPress={() => handleSelectHour(item.value)}
+              enabled={item.available}
+            >
+              <Title>{item.time}</Title>
+            </Hour>
+          )}
+        />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
```

## src/pages/New/SelectDateTime/styles.js

```javascript
import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HourList = styled.FlatList.attrs({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px;
`;

export const Hour = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  flex: 1;
  opacity: ${(props) => (props.enabled ? 1 : 0.6)};

  align-items: center;
  margin: 0 10px 20px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
```
