import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [speed, setSpeed] = useState(0.5);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedIndex, setPausedIndex] = useState(0);

  useEffect(() => {
    let timer;

    if (isReading && !isPaused) {
      timer = setInterval(() => {
        setWordIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex >= words.length) {
            setIsReading(false); // Se ha llegado al final del texto
            setWordIndex(0); // Reiniciar el índice de palabra
          }
          return newIndex;
        });
      }, speed * 1000);
    }

    return () => clearInterval(timer);
  }, [isReading, isPaused, wordIndex, speed, words]);

  const handleRead = () => {
    const inputWords = inputText.trim().split(/\s+/);
  
    if (inputWords.length > 0) {
      setWords(inputWords);
      setIsReading(true);
      setIsPaused(false); // Reiniciar el estado de pausa
    }
  };  

  const handlePause = () => {
    setIsPaused(true);
    setPausedIndex(wordIndex); // Almacenar el índice de palabra actual al pausar
  };

  const increaseSpeed = () => {
    setSpeed((prevSpeed) => prevSpeed + 0.05);
  };

  const decreaseSpeed = () => {
    if (speed > 0.05) {
      setSpeed((prevSpeed) => prevSpeed - 0.05);
    }
  };

  return (
    <View style={styles.container}>
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
        {words.length > 0 && isReading && ( // Condición añadida
          <Text style={styles.word}>{words[isPaused ? pausedIndex : wordIndex]}</Text>
        )}
      </View>
      <Text style={styles.speedText}>Velocidad: {speed.toFixed(2)} segundos por palabra </Text>
      <StatusBar style="auto" />
    </View>
  );
}
