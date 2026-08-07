import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ColorPicker, {
  HueSlider,
  Panel1,
  Preview,
} from 'reanimated-color-picker';
import { addPolish } from '../polishStorage';

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

export default function AddPolishScreen() {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [shade, setShade] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [typeFocused, setTypeFocused] = useState(false);

  const typeSuggestions = PRODUCT_TYPES.filter(
    (t) =>
      t.toLowerCase().includes(type.toLowerCase()) &&
      t.toLowerCase() !== type.toLowerCase()
  );

  async function save() {
    if (brand.trim() === '' && shade.trim() === '') {
      router.back();
      return;
    }
    await addPolish({
      id: Date.now().toString(),
      brand: brand.trim(),
      shade: shade.trim(),
      type: type,
      color: color,
    });
    router.back();
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>New Polish</Text>

      <TextInput
        style={styles.input}
        placeholder="Brand (e.g. OPI)"
        value={brand}
        onChangeText={setBrand}
      />

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

      <Text style={styles.label}>Color</Text>
      <View style={styles.pickerWrap}>
        <ColorPicker
          style={{ width: '100%' }}
          value={color || '#e75480'}
          onComplete={({ hex }) => setColor(hex)}
        >
          <Preview hideInitialColor style={styles.preview} />
          <Panel1 style={styles.panel} />
          <HueSlider style={styles.hue} />
        </ColorPicker>
      </View>

      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Add Polish</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
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
  pickerWrap: {
    marginBottom: 16,
  },
  preview: {
    height: 40,
    borderRadius: 8,
    marginBottom: 12,
  },
  panel: {
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  hue: {
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#e75480',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    marginTop: 12,
    padding: 8,
  },
});
