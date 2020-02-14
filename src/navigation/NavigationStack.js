import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../components/Home';
import TodoDetails from '../components/TodoDetails';
import { NativeModules } from 'react-native';

const Stack = createStackNavigator();
   function NavigationStack(){
     return(
      <NavigationContainer>
    
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Todo App',
            
            title: 'Todo Details',
          headerStyle: {
            backgroundColor: '#673bb7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
          }}
        />
        <Stack.Screen 
        name="TodoDetails" 
        component={TodoDetails} 
        options={{
          title: 'Todo Details',
          headerStyle: {
            backgroundColor: '#673bb7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
     )
     }

export default NavigationStack