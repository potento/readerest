import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import pdfToText from 'react-pdftotext'

export default function App() {
  const [inputText, setInputText] = useState('');
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [speed, setSpeed] = useState(0.5);
  const [isReading, setIsReading] = useState(false);

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

  function extractText(event) {
      const file = event.target.files[0]
      pdfToText(file)
          .then(text => setInputText(text))
          .catch(error => setInputText("No se pudo extraer tu PDF"))
  }

  return (
    <View style={styles.container}>
      <input type="file" accept="application/pdf" onChange={extractText}/>
      <TextInput
        placeholder="Pega un texto largo aquí"
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
      <Text style={styles.speedText}>Velocidad: {speed.toFixed(2)} segundos por palabra </Text>
      <StatusBar style="auto" />
    </View>
  );
}
