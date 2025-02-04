import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'lib/axios';

export async function indexAssociates(page = 1) {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(`/associates/?limit=10&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data.value;
  }
}
