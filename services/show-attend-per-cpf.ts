import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'lib/axios';

export async function showAttendPerCpf(cpf: string) {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(`/attend/${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    if (error.response.status === 401) router.replace('/Login');
    return null;
  }
}
