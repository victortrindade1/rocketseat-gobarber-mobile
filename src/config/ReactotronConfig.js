import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure().useReactNative().connect();
  // const tron = Reactotron.configure({ host: '192.168.1.5' })
  //   .useReactNative()
  //   .connect();

  console.tron = tron;

  // tron.clear(); // Opcional. Limpa a tela do Reactotron a cada refresh
}
