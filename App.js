import React from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import  HomeScreen  from './Componentes/HomeScreen';
import  SplashScreen  from './Componentes/SplashScreen';
import TemperaturaScreen from './Componentes/TemperaturaScreen';
import * as firebase from 'firebase';
import HumedadScreen from './Componentes/HumedadScreen';


class App extends React.Component{

  componentWillMount(){ 
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCbWTZJzUYbyeom5VVFDWm4fVJalA1gihY",
      authDomain: "wachter-c9d24.firebaseapp.com",
      databaseURL: "https://wachter-c9d24.firebaseio.com",
      projectId: "wachter-c9d24",
      storageBucket: "wachter-c9d24.appspot.com",
      messagingSenderId: "303707008192"
    };
   firebase.initializeApp(config);
  }

  render() {
    return <RootStack />;
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Temperatura: {
      screen: TemperaturaScreen,
    },
    Humedad: {
      screen: HumedadScreen,
    },
    Splash: {
      screen: SplashScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default App;