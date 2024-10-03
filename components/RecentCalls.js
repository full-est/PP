import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useContacts } from './ContactContext';
import ContactCard from './ContactCard';

const RecentCalls = ({ navigation }) => {
  const { contacts } = useContacts();

  const recentCalls = contacts
    .filter(contact => contact.lastCalled)
    .sort((a, b) => new Date(b.lastCalled) - new Date(a.lastCalled));

  return (
    <View style={styles.container}>
      {recentCalls.length ? (
        <FlatList
          data={recentCalls}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              onPress={() => navigation.navigate('ContactDetails', { contact: item })}
            />
          )}
        />
      ) : (
        <Text style={styles.noCallsText}>Нет недавних вызовов</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noCallsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RecentCalls;
