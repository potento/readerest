import React, { useState, useContext } from 'react';
import { Text, View, Modal, Button, TouchableOpacity } from 'react-native';
import strings from '../languages.json';
import { styles } from '../styles';
import { LanguageContext } from '../App'; // Importar el contexto desde App.js

export default function NavBar() {
    const { language, setLanguage } = useContext(LanguageContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo oscuro

    // Language variables
    const lang_txt = strings.lang_txt[language];

    const handleChangeLanguage = (lang) => {
        setLanguage(lang);
        setModalVisible(false);
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <View style={styles.topnav}>
            <View style={[isDarkMode ? styles.darkMode : styles.lightMode]}> {/* Aplicar estilos según el modo oscuro */}
                <TouchableOpacity style={styles.languageBtn} onPress={() => setModalVisible(true)}>
                <Text style={styles.languageText}>{lang_txt}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.darkModeButton, isDarkMode ? styles.darkModeButtonActive : null]} onPress={toggleDarkMode}> {/* Botón para cambiar el modo oscuro */}
                    <Text style={[styles.darkModeButtonText, isDarkMode ? styles.darkModeButtonTextActive : null]}>Dark Mode</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            {/* Modal de selección de idioma */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Button title="Esperanto" onPress={() => handleChangeLanguage('eo')} />
                        <Button title="Español" onPress={() => handleChangeLanguage('es')} />
                        <Button title="English" onPress={() => handleChangeLanguage('en')} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}
