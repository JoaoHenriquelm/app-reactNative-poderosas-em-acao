import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextField } from 'components/TextField';
import { router } from 'expo-router';
import axios from 'lib/axios';
import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Image,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function login() {
    setErrorMessage('');
    setLoading(true);
    try {
      const response = await axios.post(
        '/login',
        {
          name,
          password,
        },
        { withCredentials: true }
      );
      await AsyncStorage.setItem('token', response.data.token);
      setLoading(false);
      router.replace('/Associates');
    } catch (error: any) {
      const e = { ...error };
      setLoading(false);
      showErrorMessage(e.response.data.message);
    }
  }

  function showErrorMessage(message: string) {
    setErrorMessage(message);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size={128}
            color="#c50b31"
            style={{ justifyContent: 'center', alignItems: 'center' }}
          />
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <Image
            source={require('../../assets/logo.webp')}
            style={{
              alignSelf: 'center',
            }}
          />
          <View style={styles.container}>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
            <TextField placeholder="Digite seu nome" value={name} onChangeText={setName} />
            <TextField
              placeholder="Digite sua senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <View style={{ width: '85%' }}>
              <Button title="Entrar" color="#c50b31" onPress={login} />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  errorText: {
    display: 'flex',
    color: 'red',
    alignItems: 'center',
  },
});
