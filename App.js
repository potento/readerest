// Imports
import React, { createContext, useState } from 'react';
import { styles } from './styles';
import { View } from 'react-native';
import NavBar from './components/navbar';
import Reader from './components/reader';

export const LanguageContext = createContext();

export default function App() {
  const [language, setLanguage] = useState('es');

  // Visual part
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <View style={styles.container}>

        <NavBar/>

        <Reader/>

      </View>
    </LanguageContext.Provider>
  );
}
