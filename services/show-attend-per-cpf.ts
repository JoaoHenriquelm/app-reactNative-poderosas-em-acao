import AsyncStorage from '@react-native-async-storage/async-storage';
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
  } catch (e: any) {
    return null;
  }
}
