import React from 'react';
import { ContactProvider } from './components/ContactContext';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <ContactProvider>
      <Navigation />
    </ContactProvider>
  );
};

export default App;
