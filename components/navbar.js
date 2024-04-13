import React from 'react';
import { Text, View, Modal, Button } from 'react-native';
import strings from './languages.json';
import { styles } from './styles';

export default function NavBar() {
    const [language, setLanguage] = useState('es');
    const [modalVisible, setModalVisible] = useState(false);

    // Language variables
    const lang_txt          = strings.lang_txt[language];
    const paste_txt         = strings.paste_txt[language];
    const speed_txt         = strings.speed_txt[language];
    const sec_per_word_txt  = strings.sec_per_word_txt[language];

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