import React, { useState } from 'react';
import { View, SectionList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ContactCard from './ContactCard';
import SearchBar from './SearchBar';
import { useContacts } from './ContactContext';

const ContactList = ({ navigation }) => {
  const { contacts } = useContacts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    (contact.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedContacts = filteredContacts
  .sort((a, b) => {
    if (!a.name) return 1;
    if (!b.name) return -1;
    return a.name.localeCompare(b.name);
  })
  .reduce((acc, contact) => {
    const firstLetter = contact.name ? contact.name[0].toUpperCase() : '#';
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

const sections = Object.keys(sortedContacts).sort((a, b) => {
  if (a === '#') return 1;
  if (b === '#') return -1;
  return a.localeCompare(b);
  })
  .map(letter => ({
  title: letter,
  data: sortedContacts[letter],
}));

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactCard
            contact={item}
            onPress={() => navigation.navigate('ContactDetails', { contact: item })}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
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
  sectionHeader: {
    backgroundColor: '#f7f7f7',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactList;
