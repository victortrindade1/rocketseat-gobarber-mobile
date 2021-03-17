# Agendamentos da API

## src/pages/Dashboard/index.js

```diff
-import React from 'react';
+import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Appointment from '~/components/Appointment';
import Background from '~/components/Background';
+import api from '~/services/api';

import { Container, Title, List } from './styles';

-// Temporário
-const data = [1, 2, 3, 4, 5];

const Dashboard = () => {
+    const [appointments, setAppointments] = useState([]);
+
+  useEffect(() => {
+    async function loadAppointments() {
+      const response = await api.get('appointments');
+
+      setAppointments(response.data);
+    }
+
+    loadAppointments();
+  }, []);
+
+  async function handleCancel(id) {
+    const response = await api.delete(`appointments/${id}`);
+
+    setAppointments(
+      appointments.map((appointment) =>
+        appointment.id === id
+          ? {
+              ...appointment,
+              canceled_at: response.data.canceled_at,
+            }
+          : appointment
+      )
+    );
+  }
+
+  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
-          data={data}
+          data={appointments}
-          keyExtractor={(item) => String(item)}
+          keyExtractor={(item) => String(item.id)}
-          renderItem={({ item }) => <Appointment data={item} />}
+          renderItem={({ item }) => (
+            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
+          )}
        />
      </Container>
  </Background>
+  );
+}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default Dashboard;
```

## src/components/Appointment/index.js

```diff
-import React from 'react';
+import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

+import { parseISO, formatRelative } from 'date-fns';
+import pt from 'date-fns/locale/pt';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

-const Appointment = () => (
+const Appointment = ({ data, onCancel }) => {
+  const dateParsed = useMemo(
+    () =>
+      formatRelative(parseISO(data.date), new Date(), {
+        locale: pt,
+        addSuffix: true,
+      }),
+    [data.date]
+  );
+
+  return (
-    <Container>
+    <Container past={data.past}>
      <Left>
-        <Avatar source={{ uri: 'https://robohash.org/gay.png?set=set2' }} />
+        <Avatar
+          source={{
+            uri: data.provider.avatar
+              ? data.provider.avatar.url
+              : `https://robohash.org/${data.provider.name}.png?set=set2`,
+          }}
+        />
        <Info>
-          <Name>Diego Fernandes</Name>
+          <Name>{data.provider.name}</Name>
-          <Time>em 3 horas</Time>
+          <Time>{dateParsed}</Time>
        </Info>
      </Left>

+      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={() => { }}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
+      )}
    </Container>
  );
+}

export default Appointment;
```

## src/components/Appointment/styles.js

```diff
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

+  opacity: ${(props) => (props.past ? 0.6 : 1)};
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
