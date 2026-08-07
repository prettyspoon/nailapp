import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

const PRODUCT_TYPES = [
  'Regular Polish',
  'Quick-Dry Polish',
  'Gel Polish',
  'Builder Gel (BIAB)',
  'Hard Gel',
  'Gel-X Tips',
  'Acrylic',
  'Dip Powder',
  'Base Coat',
  'Top Coat',
  'Nail Art / Tools',
];

// A spectrum of base colors, each with light -> dark shades
const COLOR_SPECTRUM = [
  ['#fde2e4', '#f9bec7', '#f48fb1', '#e75480', '#c2185b', '#880e4f'], // pinks
  ['#ffe0e0', '#ff9e9e', '#f44336', '#d32f2f', '#b71c1c', '#7f1010'], // reds
  ['#ffe8d6', '#ffcc80', '#ff9800', '#f57c00', '#e65100', '#bf360c'], // oranges
  ['#fff9c4', '#fff176', '#ffeb3b', '#fdd835', '#f9a825', '#f57f17'], // yellows
  ['#e8f5e9', '#a5d6a7', '#66bb6a', '#43a047', '#2e7d32', '#1b5e20'], // greens
  ['#e0f7fa', '#80deea', '#26c6da', '#00acc1', '#00838f', '#006064'], // teals
  ['#e3f2fd', '#90caf9', '#42a5f5', '#1e88e5', '#1565c0', '#0d47a1'], // blues
  ['#ede7f6', '#b39ddb', '#7e57c2', '#5e35b1', '#4527a0', '#311b92'], // purples
  ['#efebe9', '#bcaaa4', '#8d6e63', '#6d4c41', '#4e342e', '#3e2723'], // browns
  ['#ffffff', '#e0e0e0', '#9e9e9e', '#616161', '#212121', '#000000'], // neutrals
];

const STORAGE_KEY = 'nailcloset_polishes';

type Polish = {
  id: string;
  brand: string;
  shade: string;
  type: string;
  color: string;
};

export default function HomeScreen() {
  const [brand, setBrand] = useState('');
  const [shade, setShade] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [typeFocused, setTypeFocused] = useState(false);
  const [polishes, setPolishes] = useState<Polish[]>([]);
  const [brandFocused, setBrandFocused] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [sheetMode, setSheetMode] = useState<'closed' | 'choice' | 'form'>('closed');

  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
          setPolishes(JSON.parse(saved));
        }
      } catch (e) {
        console.log('Failed to load polishes', e);
      }
      setLoaded(true);
    }
    load();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(polishes)).catch((e) =>
      console.log('Failed to save polishes', e)
    );
  }, [polishes, loaded]);

  function resetForm() {
    setBrand('');
    setShade('');
    setType('');
    setColor('');
  }

  function addPolish() {
    if (brand.trim() === '' && shade.trim() === '') return;
    const newPolish = {
      id: Date.now().toString(),
      brand: brand.trim(),
      shade: shade.trim(),
      type: type,
      color: color,
    };
    setPolishes([newPolish, ...polishes]);
    resetForm();
    setSheetMode('closed');
  }

  const usedBrands = [...new Set(polishes.map((p) => p.brand).filter(Boolean))];
  const suggestions = usedBrands.filter(
    (b) =>
      b.toLowerCase().includes(brand.toLowerCase()) &&
      b.toLowerCase() !== brand.toLowerCase()
  );

  const typeSuggestions = PRODUCT_TYPES.filter(
    (t) =>
      t.toLowerCase().includes(type.toLowerCase()) &&
      t.toLowerCase() !== type.toLowerCase()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Nail Closet</Text>

      <FlatList
        data={polishes}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No polishes yet. Tap + to add your first one!</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View
              style={[
                styles.colorDot,
                { backgroundColor: item.color || '#eee' },
              ]}
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
        onPress={() => setSheetMode('choice')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={sheetMode !== 'closed'}
        animationType="slide"
        transparent
        onRequestClose={() => setSheetMode('closed')}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setSheetMode('closed')}
        />
        <View style={styles.sheet}>
          {sheetMode === 'choice' && (
            <>
              <Text style={styles.sheetTitle}>Add a polish</Text>
              <TouchableOpacity
                style={styles.choiceButton}
                onPress={() => setSheetMode('form')}
              >
                <Text style={styles.choiceButtonText}>✍️  Add manually</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceButton, styles.choiceButtonAlt]}
                onPress={() => alert('Barcode scanning coming next!')}
              >
                <Text style={styles.choiceButtonText}>📷  Scan barcode</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSheetMode('closed')}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}

          {sheetMode === 'form' && (
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.sheetTitle}>New polish</Text>

              <TextInput
                style={styles.input}
                placeholder="Brand (e.g. OPI)"
                value={brand}
                onChangeText={setBrand}
                onFocus={() => setBrandFocused(true)}
                onBlur={() => setBrandFocused(false)}
              />

              {brandFocused && suggestions.length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.suggestionRow}
                  keyboardShouldPersistTaps="handled"
                >
                  {suggestions.map((b) => (
                    <TouchableOpacity
                      key={b}
                      style={styles.chip}
                      onPress={() => setBrand(b)}
                    >
                      <Text style={styles.chipText}>{b}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              <TextInput
                style={styles.input}
                placeholder="Shade (e.g. Big Apple Red)"
                value={shade}
                onChangeText={setShade}
              />

              <Text style={styles.label}>Type</Text>
              <TextInput
                style={styles.input}
                placeholder="Type (e.g. Gel, Builder, Acrylic)"
                value={type}
                onChangeText={setType}
                onFocus={() => setTypeFocused(true)}
                onBlur={() => setTypeFocused(false)}
              />

              {typeFocused && type.length > 0 && typeSuggestions.length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.suggestionRow}
                  keyboardShouldPersistTaps="handled"
                >
                  {typeSuggestions.map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={styles.chip}
                      onPress={() => setType(t)}
                    >
                      <Text style={styles.chipText}>{t}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              <View style={styles.colorHeader}>
                <Text style={styles.label}>Color</Text>
                {color ? (
                  <View style={[styles.selectedColor, { backgroundColor: color }]} />
                ) : null}
              </View>

              {COLOR_SPECTRUM.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.colorRow}>
                  {row.map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: c },
                        color === c && styles.colorSwatchSelected,
                      ]}
                      onPress={() => setColor(c)}
                    />
                  ))}
                </View>
              ))}

              <TouchableOpacity style={styles.button} onPress={addPolish}>
                <Text style={styles.buttonText}>Add Polish</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resetForm();
                  setSheetMode('closed');
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    marginBottom: 8,
    marginLeft: 2,
  },
  suggestionRow: {
    marginBottom: 10,
  },
  chip: {
    backgroundColor: '#f0e0e6',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  chipText: {
    color: '#e75480',
    fontWeight: '600',
    fontSize: 14,
  },
  colorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  selectedColor: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginLeft: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  colorSwatch: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  colorSwatchSelected: {
    borderWidth: 3,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#e75480',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    maxHeight: '85%',
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
