import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CardDetailScreen({ route, navigation }) {
  const { card } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{card.name}</Text>
      <Text style={styles.message}>{card.message}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('CardEditor', { cardId: card.id })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  message: { fontSize: 16, marginTop: 10 },
});
