import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
import RecentCalls from './RecentCalls';
import FavoriteContacts from './FavoriteContacts'

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="ContactList">
        <Stack.Screen 
        name="ContactList" 
        component={ContactList} 
        options={{ title: 'Контакты' }} />
        <Stack.Screen 
        name="ContactDetails" 
        component={ContactDetails} 
        options={{ title: '' }} />
        <Stack.Screen 
        name="ContactForm"
        component={ContactForm} 
        options={{ title: 'Добавить / Редактировать контакт' }} />
        <Stack.Screen 
        name="RecentCalls" 
        component={RecentCalls} 
        options={{ title: 'Недавние' }} />
        <Stack.Screen 
        name="FavoriteContacts" 
        component={FavoriteContacts} 
        options={{ title: 'Избранные' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
