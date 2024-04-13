// Imports
import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, TextInput, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import strings from './languages.json';
import pdfToText from 'react-pdftotext'

export default function App() {
  // Getters and setters
  const [inputText, setInputText] = useState('');
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [speed, setSpeed] = useState(0.5);
  const [isReading, setIsReading] = useState(false);
  const [language, setLanguage] = useState('es');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (isReading) {
      timer = setInterval(() => {
        setWordIndex((prevIndex) => prevIndex + 1);
      }, speed * 1000);
    }

    return () => clearInterval(timer);
  }, [isReading, wordIndex, speed]);

  const handleRead = () => {
    const inputWords = inputText.trim().split(/\s+/);
  
    if (inputWords.length > 0) {
      setWords(inputWords);
      setIsReading(true);
    }
  };  

  const handlePause = () => {
    setIsReading(false);
  };

  const increaseSpeed = () => {
    setSpeed((prevSpeed) => prevSpeed + 0.05);
  };

  const decreaseSpeed = () => {
    if (speed > 0.05) {
      setSpeed((prevSpeed) => prevSpeed - 0.05);
    }
  };

  const handleChangeLanguage = (lang) => {
    setLanguage(lang);
    setModalVisible(false);
  };

  function extractText(event) {
    const file = event.target.files[0]
    pdfToText(file)
        .then(text => setInputText(text))
        .catch(error => setInputText("No se pudo extraer tu PDF"))
  }

  // Language variables
    const lang_txt          = strings.lang_txt[language];
    const paste_txt         = strings.paste_txt[language];
    const speed_txt         = strings.speed_txt[language];
    const sec_per_word_txt  = strings.sec_per_word_txt[language];

  // Visual part
  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
        <TouchableOpacity style={styles.languageBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.languageText}>{lang_txt}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      {/* Modal de selección de idioma */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Esperanto" onPress={() => handleChangeLanguage('eo')} />
            <Button title="Español" onPress={() => handleChangeLanguage('es')} />
            <Button title="English" onPress={() => handleChangeLanguage('en')} />
          </View>
        </View>
      </Modal>
      <input type="file" accept="application/pdf" onChange={extractText}/>
      <TextInput
        placeholder={paste_txt}
        multiline
        style={styles.input}
        onChangeText={(text) => setInputText(text)}
        value={inputText}
        placeholderTextColor="#ccc"
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRead}>
          <Ionicons name="play" size={24} color="#1a1f1e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePause}>
          <Ionicons name="pause" size={24} color="#1a1f1e" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.speedButton]} onPress={decreaseSpeed}>
          <Ionicons name="arrow-down" size={24} color="#1a1f1e" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.speedButton]} onPress={increaseSpeed}>
          <Ionicons name="arrow-up" size={24} color="#1a1f1e" />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        {words.length > 0 && (
          <Text style={styles.word}>{words[wordIndex]}</Text>
        )}
      </View>
      <Text style={styles.speedText}>{speed_txt}{speed.toFixed(2)}{sec_per_word_txt}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
