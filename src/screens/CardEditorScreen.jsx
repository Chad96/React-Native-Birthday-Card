import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export default function CardEditorScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const cardId = route.params?.cardId;

  useEffect(() => {
    if (cardId) {
      loadCard(cardId);
      setIsEdit(true);
    }
  }, [cardId]);

  const loadCard = async (id) => {
    const storedCards = JSON.parse(await AsyncStorage.getItem('birthdayCards'));
    const card = storedCards.find((c) => c.id === id);
    setName(card.name);
    setMessage(card.message);
  };

  const saveCard = async () => {
    const newCard = { id: isEdit ? cardId : uuid.v4(), name, message };
    const storedCards = JSON.parse(await AsyncStorage.getItem('birthdayCards')) || [];
    const updatedCards = isEdit
      ? storedCards.map((card) => (card.id === cardId ? newCard : card))
      : [...storedCards, newCard];

    await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recipient's Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title={isEdit ? "Update Card" : "Create Card"} onPress={saveCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 8, marginVertical: 8, borderRadius: 8 },
});
