import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'lib/axios';

export async function showAssociatesPerName(name: string) {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(`/associates/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data.value;
  }
}
