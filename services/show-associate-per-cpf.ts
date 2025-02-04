import AsyncStorage from '@react-native-async-storage/async-storage';
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
    return error.response.data.message;
  }
}
