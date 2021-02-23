# Configurando root import

`yarn add babel-plugin-root-import eslint-import-resolver-babel-plugin-root-import -D`

## .eslintrc.js

```javascript
settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
```

## jsconfig.json

```javascript
{
  "compilerOptions": {
    "target": "es6",
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "src/*"
      ]
    }
  },
  "exclude": [
    "node_modules"
  ]
}
```
