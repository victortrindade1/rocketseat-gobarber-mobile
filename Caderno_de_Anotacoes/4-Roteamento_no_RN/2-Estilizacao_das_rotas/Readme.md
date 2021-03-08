# Estilização das rotas

## src/pages/Dashboard/index.js

```javascript
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
// import { Container } from './styles';

const Dashboard = () => <Background />;

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default Dashboard;
```

## src/pages/Profile/index.js

```javascript
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Container } from './styles';

import Background from '~/components/Background';

const Profile = () => <Background />;

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};

export default Profile;
```


## src/routes.js

```diff
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Dashboard from './pages/Dashboard';
+import Profile from './pages/Profile';
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
        App: createBottomTabNavigator({
          Dashboard,
+         Profile,
+       },
+         {
+           tabBarOptions: {
+             keyboardHidesTabBar: true,
+             activeTintColor: '#fff',
+             inactiveTintColor: 'rgba(255,255,255,0.6)',
+             style: {
+               backgroundColor: '#8d41a8',
+             },
+           },
+         }
+       ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
```
