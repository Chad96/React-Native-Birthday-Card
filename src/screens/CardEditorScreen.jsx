import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';

export default function CardEditorScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
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
    setImage(card.image);
  };

  const saveCard = async () => {
    const newCard = { id: isEdit ? cardId : uuid.v4(), name, message, image };
    const storedCards = JSON.parse(await AsyncStorage.getItem('birthdayCards')) || [];
    const updatedCards = isEdit
      ? storedCards.map((card) => (card.id === cardId ? newCard : card))
      : [...storedCards, newCard];

    await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards));
    navigation.goBack();
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEdit ? "Edit Card" : "Create Card"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipient's Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
        <Text style={styles.imageButtonText}>Add Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />}
      <TouchableOpacity style={styles.saveButton} onPress={saveCard}>
        <Text style={styles.saveButtonText}>{isEdit ? "Update Card" : "Create Card"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5', 
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  input: { 
    borderColor: '#ddd', 
    borderWidth: 1, 
    padding: 12, 
    width: '100%',
    marginVertical: 10, 
    borderRadius: 8, 
    backgroundColor: '#fff',
    fontSize: 16,
  },
  messageInput: {
    height: 100, 
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#6c63ff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: { 
    width: 150, 
    height: 150, 
    marginVertical: 15, 
    borderRadius: 10, 
    borderColor: '#ddd', 
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
