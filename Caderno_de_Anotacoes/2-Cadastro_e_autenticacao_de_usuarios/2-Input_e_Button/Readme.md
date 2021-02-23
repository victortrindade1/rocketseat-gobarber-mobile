# Input e Button

Libs instaladas:
`yarn add prop-types`
`yarn add react-native-vector-icons`

## react-native-vector-icons

Esta lib precisa instalar umas coisas a mais, q vc vai precisar ver na doc.

### p/ iOS

#### ios/gobarber_mobile/Info.plist

```diff
	</array>
	<key>UIViewControllerBasedStatusBarAppearance</key>
	<false/>
+ <key>UIAppFonts</key>
+ <array>
+   <string>MaterialIcons.ttf</string>
+ </array>
</dict>
```

>>> cd/ios pod install

### p/ Android

#### android/app/build.gradle

```diff
task copyDownloadableDepsToLibs(type: Copy) {
    from configurations.compile
    into 'libs'
}

+project.ext.vectoricons = [
+    iconFontNames: [ 'MaterialIcons.ttf' ] // Name of the font files you want to copy
+]
+
+apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
```

## src/components/Button/index.js

```javascript
import React from 'react';
import { ActivityIndicator } from 'react-native';

import PropTypes from 'prop-types';

import { Container, Text } from './styles';

const Button = ({ children, loading, ...rest }) => (
  <Container {...rest}>
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
        <Text>{children}</Text>
      )}
  </Container>
)

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};

export default Button;
```

## src/components/Button/styles.js

```javascript
import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  height: 46px;
  background: #3b9eff;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
```

## src/components/Input/index.js

P/ passar a referência do Input, vc vai precisar usar o `forwardRef` do react.

```javascript
import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

const Input = ({ style, icon, ...rest }, ref) => (
  <Container style={style}>
    {icon && <Icon name={icon} size={20} color="rgba(255,255,255, 0.6)" />}
    <TInput {...rest} ref={ref} />
  </Container>
);

export default forwardRef(Input);

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  icon: null,
  style: {},
};
```

## src/components/Input/styles.js

```javascript
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.8)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #ffffff;
`;
```

## src/pages/SignIn/index.js

```diff
import React from 'react';
import { Text } from 'react-native';

import Background from '~/components/Background';

+import Button from '~/components/Button';
+import Input from '~/components/Input';

// import { Container } from './styles';

const SignIn = () => (
  <Background>
    <Text>SingIn</Text>

+    <Input
+      style={{ marginTop: 30 }}
+      icon="call"
+      placeholder="Digite seu nome"
+    />
+
+    <Button>Entrar</Button>
  </Background>
);

export default SignIn;
```

