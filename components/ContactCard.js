import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ContactCard = ({ contact, onPress }) => {

  const displayName = contact.name || contact.email || '';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(contact)}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ContactCard;
