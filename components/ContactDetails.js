import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useContacts } from './ContactContext';

const ContactDetails = ({ route, navigation }) => {
  const { contact } = route.params;
  const { updateContact, deleteContact, contacts } = useContacts();

  const [currentContact, setCurrentContact] = useState(contact);

  useEffect(() => {
    const updatedContact = contacts.find(c => c.id === contact.id);
    if (updatedContact) {
      setCurrentContact(updatedContact);
    }
  }, [contacts]);

  const handleDelete = () => {
    Alert.alert(
      "Подтверждение удаления",
      "Вы уверены, что хотите удалить этот контакт?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          onPress: () => {
            deleteContact(currentContact.id);
            navigation.goBack();
          },
          style: "destructive"
        }
      ]
    );
  };

    const handleCall = () => {
      const updatedContact = { ...currentContact, lastCalled: new Date().toISOString() };
      updateContact(updatedContact);
      Alert.alert('Звонок', `"Позвонили" на номер ${currentContact.phone}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Информация о контакте</Text>
      <Text style={styles.label}>Имя: {currentContact.name}</Text>
      <Text style={styles.label}>Телефон: {currentContact.phone}</Text>
      <Text style={styles.label}>Email: {currentContact.email}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ContactForm', { contact: currentContact })}
      >
        <Text style={styles.buttonText}>Редактировать</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.callButton}
        onPress={handleCall}
      >
        <Text style={styles.buttonText}>Вызов</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>Удалить</Text>
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
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  callButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ContactDetails;



