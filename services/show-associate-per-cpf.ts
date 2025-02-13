import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from 'lib/axios';

export async function showAssociatesPerCpf(cpf: string) {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(`/associate/${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.props;
  } catch (error: any) {
    if (error.response.status === 401) router.replace('/Login');
    return error.response.data.message;
  }
}
