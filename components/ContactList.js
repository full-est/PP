import React, { useState } from 'react';
import { View, SectionList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import ContactCard from './ContactCard';
import SearchBar from './SearchBar';
import { useContacts } from './ContactContext';

const ContactList = ({ navigation }) => {
  const { contacts } = useContacts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    (contact.name || contact.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedContacts = filteredContacts
  .sort((a, b) => {
    const aName = a.name || a.email || a.phone || '';  
      const bName = b.name || b.email || b.phone || '';
    return aName.localeCompare(bName);
  })
  .reduce((acc, contact) => {
    const firstLetter = (contact.name || contact.email || contact.phone || '')[0]?.toUpperCase() || '#';

    const isNumber = !isNaN(firstLetter);
      const sectionKey = isNumber ? '#' : firstLetter;

    if (!acc[sectionKey]) {
      acc[sectionKey] = [];
    }
    acc[sectionKey].push(contact);
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
        showsVerticalScrollIndicator={false}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
