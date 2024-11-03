import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadCards);
    return unsubscribe;
  }, [navigation]);

  const loadCards = async () => {
    const storedCards = await AsyncStorage.getItem('birthdayCards');
    if (storedCards) setCards(JSON.parse(storedCards));
  };

  const deleteCard = async (id) => {
    const updatedCards = cards.filter(card => card.id !== id);
    await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

  return (
    <View style={styles.container}>
      <Button title="Create New Card" onPress={() => navigation.navigate('CardEditor')} />
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CardDetail', { card: item })}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Button title="Delete" onPress={() => deleteCard(item.id)} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 20, marginVertical: 8, backgroundColor: '#e0f7fa', borderRadius: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
});
