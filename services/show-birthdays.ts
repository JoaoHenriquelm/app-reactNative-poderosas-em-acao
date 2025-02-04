import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'lib/axios';

export async function showBirthdays() {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(`/birthdays`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data.value;
  }
}
