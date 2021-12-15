import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const bottomTab = createBottomTabNavigator();


import Cadastro from './cadastro';
import listaProj from './listaProj';

export default class Main extends Component {
  
  render() {
    return (
      <View style={styles.main}>
        <StatusBar 
          hidden={false}
          // backgroundColor={'black'}
        />

          <bottomTab.Navigator
            initialRouteName='Projeto'

            screenOptions={ ({ route }) => ({
              tabBarIcon: () => {

                if (route.name === 'Projeto') {

                    return (
                        <Image
                            source={require('../assets/img/livro.png')
                            }
    
                        />
                    )
    
                }

                if (route.name === 'Cadastro') {
                  return(
                    <Image 
                    source={require('../assets/img/cadastrar_navigation.png')}
                     
                    />
                  )
                }


            
              },

              // React Navigation 6.x
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveBackgroundColor: 'rgba(39,198,250,0.77)',
              tabBarInactiveBackgroundColor: 'rgba(39,198,250,0.41)',
              // tabBarActiveTintColor: 'red',
              // tabBarInactiveTintColor: 'blue',
              tabBarStyle: { height: 50 }
            }) }
          >

            <bottomTab.Screen name="Projeto" component={listaProj} />
            <bottomTab.Screen name="Cadastro" component={Cadastro} />
           
          

          </bottomTab.Navigator>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1
 
  }
});