/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from "./components/home";
import Stations from "./components/stations";
import Login from "./components/login";
class App extends Component {
  constructor(props){
    super();
    this.stack =  createStackNavigator();
  }
  render(){
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
      <this.stack.Navigator>
        <this.stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <this.stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <this.stack.Screen name="Stations" component={Stations} options={{ headerShown: false }}/>
      </this.stack.Navigator>
    </NavigationContainer>
    </>
  );
};
}

export default App;
