import React, { createContext, useState, useContext } from 'react';

const ContactContext = createContext();

export const useContacts = () => {
  return useContext(ContactContext);
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const updateContact = (updatedContact) => {
    setContacts(contacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    ));
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};
