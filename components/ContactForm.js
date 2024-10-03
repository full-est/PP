import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useContacts } from './ContactContext';

const ContactForm = ({ route, navigation }) => {
  const { contact } = route.params || {};
  const { addContact, updateContact } = useContacts();
  const [name, setName] = useState(contact ? contact.name : '');
  const [phone, setPhone] = useState(contact ? contact.phone : '');
  const [email, setEmail] = useState(contact ? contact.email : '');

  const handleSave = () => {
    if (!name && !phone && !email) {
      Alert.alert('Ошибка', 'Имя, телефон или email должны быть заполнены.');
      return;
    }

    const newContact = { 
      id: contact ? contact.id : Date.now().toString(), 
      name: name || '',
      phone: phone || '',
      email
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Имя"
          value={name}
          onChangeText={setName}
        />
        {name.length > 0 && (
          <TouchableOpacity onPress={() => setName('')} style={styles.clearButton}>
            <Text style={styles.clearText}>✖</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Телефон"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        {phone.length > 0 && (
          <TouchableOpacity onPress={() => setPhone('')} style={styles.clearButton}>
            <Text style={styles.clearText}>✖</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        {email.length > 0 && (
          <TouchableOpacity onPress={() => setEmail('')} style={styles.clearButton}>
            <Text style={styles.clearText}>✖</Text>
          </TouchableOpacity>
        )}
      </View>

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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  clearButton: {
    marginLeft: 10,
  },
  clearText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ContactForm;
