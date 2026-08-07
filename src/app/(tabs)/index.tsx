import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { loadPolishes, Polish } from '../../polishStorage';

export default function HomeScreen() {
  const router = useRouter();
  const [polishes, setPolishes] = useState<Polish[]>([]);
  const [choiceOpen, setChoiceOpen] = useState(false);

  // Reload the list every time this screen comes into focus
  // (e.g. after returning from the add-polish screen)
  useFocusEffect(
    useCallback(() => {
      loadPolishes().then(setPolishes);
    }, [])
  );

  function goToManualAdd() {
    setChoiceOpen(false);
    router.push('/add-polish');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Nail Closet</Text>

      <FlatList
        data={polishes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No polishes yet. Tap + to add your first one!</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View
              style={[styles.colorDot, { backgroundColor: item.color || '#eee' }]}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardShade}>{item.shade || 'Unnamed shade'}</Text>
              <Text style={styles.cardBrand}>{item.brand || 'Unknown brand'}</Text>
              {item.type ? (
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{item.type}</Text>
                </View>
              ) : null}
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setChoiceOpen(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={choiceOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setChoiceOpen(false)}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setChoiceOpen(false)}
        />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Add a polish</Text>
          <TouchableOpacity style={styles.choiceButton} onPress={goToManualAdd}>
            <Text style={styles.choiceButtonText}>✍️  Add manually</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceButton, styles.choiceButtonAlt]}
            onPress={() => alert('Barcode scanning coming next!')}
          >
            <Text style={styles.choiceButtonText}>📷  Scan barcode</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChoiceOpen(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 15,
  },
  card: {
    backgroundColor: '#faf0f3',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardShade: {
    fontSize: 17,
    fontWeight: '600',
  },
  cardBrand: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e75480',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e75480',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '300',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  choiceButton: {
    backgroundColor: '#e75480',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  choiceButtonAlt: {
    backgroundColor: '#8a5a8a',
  },
  choiceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    marginTop: 10,
    padding: 8,
  },
});
