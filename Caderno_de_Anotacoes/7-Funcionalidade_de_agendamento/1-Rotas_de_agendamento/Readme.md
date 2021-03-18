# Rotas de agendamento

## src/pages/New/SelectProvider/index.js

O `navigationOptions` daqui é um pouco diferente. Em vez dele ser um objeto como
nos outros, ele é uma função q retorna objeto. Assim posso acessar a prop
navigation.

```javascript
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
// import { Container } from './styles';

export default function SelectProvider() {
  return <Background />;
}

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

## src/pages/New/SelectDateTime/index.js

```javascript
import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

const SelectDateTime = () => <View />;

export default SelectDateTime;
```

## src/pages/New/Confirm/index.js

```javascript
import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

const Confirm = () => <View />;

export default Confirm;
```

## src/routes.js

  - O `createStackNavigator` permite voltar. Pra usar stack navigator, precisa iinstalar 2 libs separadas. Tem q ver na documentação pois sempre muda.
  - A página `New` não chega a existir, então não tem como configurar o botão no
  navegador com `navigationOptions`, como foi feito com Dashboard e Profile. Pra
  contornar isto e colocar o ícone, vou ter q fazer por dentro das rotas.
  - Eu não quero q a Tab Bar fique aparecendo qnd estiver na tela de agendamento.
  Por isso, não posso usar a cor do ícone como `tintColor`, como fiz com os outros.

```diff
+import React from 'react';
+import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
+import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Dashboard from './pages/Dashboard';
+import Confirm from './pages/New/Confirm';
+import SelectDateTime from './pages/New/SelectDateTime';
+import SelectProvider from './pages/New/SelectProvider';
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
+           New: {
+             screen: createStackNavigator(
+               {
+                 SelectProvider,
+                 SelectDateTime,
+                 Confirm,
+               },
+               {
+                 defaultNavigationOptions: {
+                   headerTransparent: true,
+                   headerTintColor: '#FFF',
+                   headerLeftContainerStyle: {
+                     marginLeft: 20,
+                   },
+                 },
+               }
+             ),
+             navigationOptions: {
+               tabBarVisible: false,
+               tabBarLabel: 'Agendar',
+               tabBarIcon: (
+                 <Icon
+                   name="add-circle-outline"
+                   size={20}
+                   color="rgba(255,255,255,0.6)"
+                 />
+               ),
+             },
+           },
            Profile,
          },
          {
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
