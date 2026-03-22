import AsyncStorage from '@react-native-async-storage/async-storage';

const RESULTS_KEY = 'vocacion_resultados';

export async function guardarResultados(data) {
  try {
    await AsyncStorage.setItem(RESULTS_KEY, JSON.stringify({
      ...data,
      fecha: new Date().toISOString()
    }));
    return true;
  } catch (e) {
    return false;
  }
}

export async function cargarResultados() {
  try {
    const data = await AsyncStorage.getItem(RESULTS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export async function borrarResultados() {
  try {
    await AsyncStorage.removeItem(RESULTS_KEY);
    return true;
  } catch (e) {
    return false;
  }
}