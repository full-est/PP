import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FavoriteContacts from './FavoriteContacts';
import ContactListStack from './ContactListStack';  // Импорт стека для "Контактов"
import RecentCalls from './RecentCalls';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Избранные"
        component={FavoriteContacts}
        options={{
          headerStyle: {
            backgroundColor: '#C0C0C0',
          },
          tabBarLabel: 'Избранные',
          tabBarIcon: ({ color }) => (
            <Icon name="star-outline" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Контакты"
        component={ContactListStack}
        options={{
          headerStyle: {
            backgroundColor: '#C0C0C0',
          },
          tabBarLabel: 'Контакты',
          tabBarIcon: ({ color }) => (
            <Icon name="people-outline" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Недавние"
        component={RecentCalls}
        options={{
          headerStyle: {
            backgroundColor: '#C0C0C0',
          },
          tabBarLabel: 'Недавние',
          tabBarIcon: ({ color }) => (
            <Icon name="time-outline" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
