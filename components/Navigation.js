import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNovigator';

const Navigation = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
