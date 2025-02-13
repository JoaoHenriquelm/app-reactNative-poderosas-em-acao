import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'lib/axios';

export async function getLimitOfPagesOfAssociates(limit = 10) {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(`/pages/associates/?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) router.replace('/Login');
    return error.response.data.value;
  }
}
