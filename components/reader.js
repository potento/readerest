import React, { useState, useEffect, useContext } from 'react';
import strings from '../languages.json';
import pdfToText from 'react-pdftotext'
import { styles } from '../styles';
import { StatusBar, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LanguageContext } from '../App';

export default function reader() {
    // Getters and setters
    const [inputText, setInputText] = useState('');
    const [words, setWords] = useState([]);
    const [wordIndex, setWordIndex] = useState(0);
    const [speed, setSpeed] = useState(0.5);
    const [isReading, setIsReading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [pausedIndex, setPausedIndex] = useState(0);
    const { language } = useContext(LanguageContext);

    // Language variables
    const paste_txt         = strings.paste_txt[language];
    const speed_txt         = strings.speed_txt[language];
    const sec_per_word_txt  = strings.sec_per_word_txt[language];


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
        setIsReading(false);
        setPausedIndex(wordIndex); // Almacenar el índice de palabra actual al pausar
    };
    
    const handleRefresh = () => {
        setIsReading(false);
        setIsPaused(false);
        setWords([]);
        setWordIndex(0);
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
        <View>
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
            <TouchableOpacity style={styles.button} onPress={handleRefresh}>
                <Ionicons name="refresh" size={24} color="#1a1f1e" />
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.button, styles.speedButton]} onPress={decreaseSpeed}>
                <Ionicons name="arrow-down" size={24} color="#1a1f1e" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.speedButton]} onPress={increaseSpeed}>
                <Ionicons name="arrow-up" size={24} color="#1a1f1e" />
            </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
            {words.length > 0 && isReading && (
                <Text style={styles.word}>{words[isPaused ? pausedIndex : wordIndex]}</Text>
            )}
            </View>
            <Text style={styles.speedText}>{speed_txt}{speed.toFixed(2)}{sec_per_word_txt}</Text>
            <StatusBar style="auto" />
        </View>



    )
}