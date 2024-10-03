import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ContactCard from './ContactCard';
import SearchBar from './SearchBar';
import { useContacts } from './ContactContext';

const ContactList = ({ navigation }) => {
  const { contacts } = useContacts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filteredContacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactCard
            contact={item}
            onPress={() => navigation.navigate('ContactDetails', { contact: item })}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ContactForm')}
      >
        <Text style={styles.addButtonText}>Добавить контакт</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ContactList;
