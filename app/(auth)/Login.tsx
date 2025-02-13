import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextField } from 'components/TextField';
import { TextI } from 'components/TextI';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import axios from 'lib/axios';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function verifyAvaibleAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) return false;
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (LocalAuthentication.AuthenticationType[types[0]] === 'FINGERPRINT') return true;
  }

  async function handleBiometricAuthentication() {
    const isAvaible = await verifyAvaibleAuthentication();
    if (isAvaible) {
      const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isBiometricEnrolled) return;
      const authenticate = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login com Biometria',
        fallbackLabel: 'Biometria não reconhecida',
      });
      if (authenticate.success) {
        router.replace('/Associates');
      }
    }
  }

  async function hasTokenValidInStorage() {
    const token = await AsyncStorage.getItem('token');
    if (!token) return false;
    const response = await axios.post('/login/verify', {
      token,
    });
    return !!response.data.isValid;
  }

  useEffect(() => {
    async function biometricVerify() {
      if (await hasTokenValidInStorage()) handleBiometricAuthentication();
    }
    biometricVerify();
  }, []);

  async function login() {
    setErrorMessage('');
    setLoading(true);
    try {
      const response = await axios.post(
        '/login',
        {
          name: name.trim(),
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
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
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
            {errorMessage && <TextI style={styles.errorText}>{errorMessage}</TextI>}
            <TextField placeholder="Digite seu nome" value={name} onChangeText={setName} />
            <TextField
              placeholder="Digite sua senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={login}
              style={{
                backgroundColor: '#c50b31',
                width: '85%',
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextI style={{ color: 'white' }}>Entrar</TextI>
            </TouchableOpacity>
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
