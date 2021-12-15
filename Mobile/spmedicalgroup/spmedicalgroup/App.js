import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import main from '../Roman/screens/main'
import login from './screens/login'
import Projetos from './screens/listaProj';

const AuthStack = createStackNavigator(); 

export default function Stack() {
  return(
    <NavigationContainer>
      <StatusBar
      hidden={true}
      />

      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Login" component={login} />
        <AuthStack.Screen name="Main" component={main} /> 
        <AuthStack.Screen name="Projeto" component={Projetos} /> 
        {/* <AuthStack.Screen name="Camera" component={CameraPerfil} /> */}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}