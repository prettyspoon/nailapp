import { View, Text, StyleSheet } from 'react-native';

export default function InspoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inspo</Text>
      <Text style={styles.subtitle}>AI design help will live here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 8 },
});
