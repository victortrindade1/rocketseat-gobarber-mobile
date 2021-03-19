# Load de agendamentos

Vou usar a funcionalidade do react-navigation `withNavigationFocus` q permite
saber qnd o usuário deu foco na tela.

## src/pages/Dashboard/index.js

```diff
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
+import { withNavigationFocus } from 'react-navigation';

import Appointment from '~/components/Appointment';
import Background from '~/components/Background';
import api from '~/services/api';

import { Container, Title, List } from './styles';

-const Dashboard = () => {
+const Dashboard = ({ isFocused }) => {
  const [appointments, setAppointments] = useState([]);

-  useEffect(() => {
-    async function loadAppointments() {
-      const response = await api.get('appointments');
-
-      setAppointments(response.data);
-    }
-
-    loadAppointments();
-  }, []);
+  async function loadAppointments() {
+    const response = await api.get('appointments');
+
+    setAppointments(response.data);
+  }
+
+  useEffect(() => {
+    if (isFocused) {
+      loadAppointments();
+    }
+  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
            ...appointment,
            canceled_at: response.data.canceled_at,
          }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

-export default Dashboard;
+export default withNavigationFocus(Dashboard);
```

## src/routes.js

Vou colocar o `resetOnBlur` nas options da tab bar debaixo. Isto pq após um
primeiro agendamento, o navigation não segue a rota certinha de novo
(SelectProvider > SelectDateTime > Confirm). Em vez disso, vai do SelectProvider
direto pra Confirm. Pra resolver, tem sempre q resetar.

```diff
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Dashboard from './pages/Dashboard';
import Confirm from './pages/New/Confirm';
import SelectDateTime from './pages/New/SelectDateTime';
import SelectProvider from './pages/New/SelectProvider';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            New: {
              screen: createStackNavigator(
                {
                  SelectProvider,
                  SelectDateTime,
                  Confirm,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Agendar',
                tabBarIcon: (
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    color="rgba(255,255,255,0.6)"
                  />
                ),
              },
            },
            Profile,
          },
          {
+           resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255,255,255,0.6)',
              style: {
                backgroundColor: '#8d41a8',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
```
