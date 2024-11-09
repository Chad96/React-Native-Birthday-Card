import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CardDetailScreen({ route, navigation }) {
  const { card } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {card.image && (
          <Image source={{ uri: card.image }} style={styles.image} resizeMode="cover" />
        )}
        <Text style={styles.title}>{card.name}</Text>
        <Text style={styles.message}>{card.message}</Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('CardEditor', { cardId: card.id })}
      >
        <Text style={styles.editButtonText}>Edit Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0e4d7', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20 
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#5a2d82', 
    marginTop: 15, 
    textAlign: 'center' 
  },
  message: { 
    fontSize: 18, 
    color: '#555', 
    marginTop: 10, 
    textAlign: 'center', 
    lineHeight: 24 
  },
  image: { 
    width: 250, 
    height: 250, 
    borderRadius: 15, 
    marginBottom: 15,
    borderWidth: 1, 
    borderColor: '#ddd',
  },
  editButton: {
    backgroundColor: '#ff6f61',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
