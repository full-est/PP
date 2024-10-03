import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useContacts } from './ContactContext';

const ContactForm = ({ route, navigation }) => {
  const { contact } = route.params || {};
  const { addContact, updateContact } = useContacts();
  const [name, setName] = useState(contact ? contact.name : '');
  const [phone, setPhone] = useState(contact ? contact.phone : '');

  const handleSave = () => {
    if (!name && !phone) {
      Alert.alert('Ошибка', 'Имя или телефон должны быть заполнены.');
      return;
    }

    const newContact = { 
      id: contact ? contact.id : Date.now().toString(), 
      name: name || '',
      phone 
    };
    
    if (contact) {
      updateContact(newContact);
    } else {
      addContact(newContact);
    }
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{contact ? 'Редактировать контакт' : 'Добавить контакт'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Телефон"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{contact ? 'Сохранить' : 'Добавить'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ContactForm;
