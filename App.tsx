import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './src/screens/Home';
import Pokemon from './src/screens/Pokemon';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'PokéDex' }}
        />
        <Stack.Screen
          name="Pokemon"
          component={Pokemon}
          options={{ title: 'PokéDex' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
