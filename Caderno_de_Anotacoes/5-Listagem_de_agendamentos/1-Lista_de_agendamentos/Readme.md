# Lista de agendamentos

## src/pages/Dashboard/index.js

```diff
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

+import Appointment from '~/components/Appointment';
import Background from '~/components/Background';

+import { Container, Title, List } from './styles';

+// Temporário
+const data = [1, 2, 3, 4, 5];

-const Dashboard = () => <Background />;
+const Dashboard = () => (
+  <Background>
+    <Container>
+      <Title>Agendamentos</Title>
+
+      <List
+        data={data}
+        keyExtractor={(item) => String(item)}
+        renderItem={({ item }) => <Appointment data={item} />}
+      />
+    </Container>
+  </Background>
+);

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default Dashboard;
```

## src/pages/Dashboard/styles.js

```javascript
import styled from 'styled-components/native';
// SafeAreaView é a parte da View abaixo do statusbar do celular
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

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
```

## src/components/Appointment/index.js

```javascript
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

const Appointment = () => (
  <Container>
    <Left>
      <Avatar source={{ uri: 'https://robohash.org/gay.png?set=set2' }} />

      <Info>
        <Name>Diego Fernandes</Name>
        <Time>em 3 horas</Time>
      </Info>
    </Left>

    <TouchableOpacity onPress={() => { }}>
      <Icon name="event-busy" size={20} color="#f64c75" />
    </TouchableOpacity>
  </Container>
);

export default Appointment;
```

## src/components/Appointment/styles.js

```javascript
import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
`;
```
