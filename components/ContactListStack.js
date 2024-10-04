import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';

const Stack = createStackNavigator();

const ContactListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={({ navigation }) => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#C0C0C0',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ContactForm')}
              style={{ marginRight: 10 }}
            >
              <Text style={{ fontSize: 24, color: '#007AFF' }}>+</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetails}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#C0C0C0',
          },
         }}
      />
      <Stack.Screen
        name="ContactForm"
        component={ContactForm}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#C0C0C0',
          },
         }}
      />
    </Stack.Navigator>
  );
};

export default ContactListStack;
