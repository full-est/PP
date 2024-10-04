import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';
import { useContacts } from './ContactContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

const ContactDetails = ({ route, navigation }) => {
  const { contact } = route.params;
  const { updateContact, deleteContact, contacts } = useContacts();

  const [currentContact, setCurrentContact] = useState(contact);
  const [notes, setNotes] = useState(contact.notes || '');

  useEffect(() => {
    const updatedContact = contacts.find(c => c.id === contact.id);
    if (updatedContact) {
      setCurrentContact(updatedContact);
      setNotes(updatedContact.notes || '');
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
      if (!currentContact.phone) return;
      const updatedContact = { ...currentContact, lastCalled: new Date().toISOString() };
      updateContact(updatedContact);
      Alert.alert('Звонок', `"Позвонили" на номер ${currentContact.phone}`);
  };
    const handleFavorite = () => {
      const updatedContact = { ...currentContact, isFavorite: !currentContact.isFavorite };
      updateContact(updatedContact);
  };

  const handleNotesChange = (text) => {
    setNotes(text);
    const updatedContact = { ...currentContact, notes: text };
    updateContact(updatedContact);
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}
    showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.center}>
        <Text style={styles.contactName}>{currentContact.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ContactForm', { contact: currentContact })}>
          <Text style={styles.editButton}>Править</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Сообщение')}>
          <Icon name="chatbubble-outline" size={24} color="#black" />
          <Text style={styles.actionText}>Написать</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
          <Icon name="call-outline" size={24} color="#black" />
          <Text style={styles.actionText}>Сотовый</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Видео')}>
          <Icon name="videocam-outline" size={24} color="#black" />
          <Text style={styles.actionText}>Видео</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Почта')}>
          <Icon name="mail-outline" size={24} color="#black" />
          <Text style={styles.actionText}>Почта</Text>
        </TouchableOpacity>
      </View>

        <View style={styles.contactInfo}>
        <Text style={styles.infoLabel}>Телефон</Text>
        <Text style={styles.infoText}>{currentContact.phone}</Text>
      </View>

      {currentContact.email && (
        <View style={styles.contactInfo}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoText}>{currentContact.email}</Text>
        </View>
      )}

      <View>
        <TextInput  style={styles.notesInput}
          multiline={true}
          value={notes}
          onChangeText={handleNotesChange}
          placeholder="Заметки...."
          placeholderTextColor="black"/>
      </View>

      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
        <Text style={styles.buttonText}>
          {currentContact.isFavorite ? 'Удалить из избранного' : 'Добавить в избранные'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Удалить</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    paddingHorizontal: 10,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  center: {
    alignItems: 'center',
    marginBottom: 20,
  },
  contactName: {
    fontSize: 28,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  editButton: {
    color: '#007AFF',
    fontSize: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: '#808080',
    marginTop: 5,
    fontSize: 12,
  },
  contactInfo: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: -10,
    marginTop: 20,
  },
  infoLabel: {
    color: '#8E8E93',
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    color: '#007AFF',
    fontSize: 18,
  },
  favoriteButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText:{
    fontSize: 18,
    fontWeight: '500',
    color: 'red',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007AFF',
  },
  notesInput: {
    backgroundColor: '#ffffff',
    color: 'black',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    minHeight: 70,
    marginTop: 20,
  },
});

export default ContactDetails;



