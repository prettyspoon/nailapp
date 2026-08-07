import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = 'nailcloset_polishes';

export type Polish = {
  id: string;
  brand: string;
  shade: string;
  type: string;
  color: string;
};

export async function loadPolishes(): Promise<Polish[]> {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    return saved !== null ? JSON.parse(saved) : [];
  } catch (e) {
    console.log('Failed to load polishes', e);
    return [];
  }
}

export async function savePolishes(polishes: Polish[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(polishes));
  } catch (e) {
    console.log('Failed to save polishes', e);
  }
}

export async function addPolish(polish: Polish): Promise<Polish[]> {
  const current = await loadPolishes();
  const updated = [polish, ...current];
  await savePolishes(updated);
  return updated;
}
