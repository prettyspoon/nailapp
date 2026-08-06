import { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

export default function HomeScreen() {
  const [brand, setBrand] = useState('');
  const [shade, setShade] = useState('');
  const [type, setType] = useState('');
  const [typeFocused, setTypeFocused] = useState(false);
  type Polish = {
    id: string;
    brand: string;
    shade: string;
    type: string;
  };
  const [polishes, setPolishes] = useState<Polish[]>([]);
  const [brandFocused, setBrandFocused] = useState(false);

  function addPolish() {
    if (brand.trim() === '' && shade.trim() === '') return;
    const newPolish = {
      id: Date.now().toString(),
      brand: brand.trim(),
      shade: shade.trim(),
      type: type,
    };
    setPolishes([newPolish, ...polishes]);
    setBrand('');
    setShade('');
    setType('');
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

      <View style={styles.form}>
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

        <TouchableOpacity style={styles.button} onPress={addPolish}>
          <Text style={styles.buttonText}>Add Polish</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={polishes}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.empty}>No polishes yet. Add your first one!</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardShade}>{item.shade || 'Unnamed shade'}</Text>
            <Text style={styles.cardBrand}>{item.brand || 'Unknown brand'}</Text>
            {item.type ? (
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{item.type}</Text>
              </View>
            ) : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
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
  button: {
    backgroundColor: '#e75480',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
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
});