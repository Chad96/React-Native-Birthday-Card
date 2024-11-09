import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadCards);
    return unsubscribe;
  }, [navigation]);

  const loadCards = async () => {
    try {
      const storedCards = await AsyncStorage.getItem('birthdayCards');
      if (storedCards) {
        setCards(JSON.parse(storedCards));
      } else {
        setCards([]);
      }
    } catch (error) {
      console.error("Error loading cards: ", error);
    }
  };

  const deleteCard = async (id) => {
    const updatedCards = cards.filter(card => card.id !== id);
    await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

  return (
    <View style={styles.container}>
      <Button title="Create New Card" onPress={() => navigation.navigate('CardEditor')} />
      {cards.length === 0 ? (
        <Text style={styles.noCardsText}>No cards available. Please create one!</Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('CardDetail', { card: item })}
            >
              {item.image && <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />}
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Button title="Delete" onPress={() => deleteCard(item.id)} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 20, marginVertical: 8, backgroundColor: '#e0f7fa', borderRadius: 8 },
  cardImage: { width: 120, height: 120, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  noCardsText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
});
