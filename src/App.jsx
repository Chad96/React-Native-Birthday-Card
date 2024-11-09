import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CardEditorScreen from './screens/CardEditorScreen';
import CardDetailScreen from './screens/CardDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Birthday Cards' }} // Optional title for the Home screen
        />
        <Stack.Screen 
          name="CardEditor" 
          component={CardEditorScreen} 
          options={{ title: 'Create/Edit Card' }} 
        />
        <Stack.Screen 
          name="CardDetail" 
          component={CardDetailScreen} 
          options={{ title: 'Card Detail' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
