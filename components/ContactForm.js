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
          placeholderTextColor="#AAB0B6"
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
          placeholderTextColor="#AAB0B6"
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
          placeholderTextColor="#AAB0B6"
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
    padding: 20,
    backgroundColor: '#dcdcdc',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    paddingLeft: 20,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E5E5EA',
  },
  clearText: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ContactForm;
