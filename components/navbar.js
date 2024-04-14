import React, { useState, useContext } from 'react';
import { Text, View, Modal, Button, TouchableOpacity } from 'react-native';
import strings from '../languages.json';
import { styles } from '../styles';
import { LanguageContext } from '../App'; // Importar el contexto desde App.js

export default function NavBar() {
    const { language, setLanguage } = useContext(LanguageContext);

    const [modalVisible, setModalVisible] = useState(false);

    // Language variables
    const lang_txt = strings.lang_txt[language];

    const handleChangeLanguage = (lang) => {
        setLanguage(lang);
        setModalVisible(false);
    };

    return (
        <View>
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