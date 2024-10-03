import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ContactCard from './ContactCard';
import { useContacts } from './ContactContext';

const FavoriteContacts = ({ navigation }) => {
  const { contacts } = useContacts();
  
  const favoriteContacts = contacts.filter(contact => contact.isFavorite);

  return (
    <View style={styles.container}>
      {favoriteContacts.length === 0 ? (
        <Text style={styles.emptyText}>Нет избранных контактов</Text>
      ) : (
        <FlatList
          data={favoriteContacts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              onPress={() => navigation.navigate('ContactDetails', { contact: item })}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoriteContacts;
