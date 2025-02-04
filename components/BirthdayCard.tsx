import { router } from 'expo-router';
import { BirthdayProps } from 'interfaces/BirthdayProps';
import { View, Text, StyleSheet } from 'react-native';

function touch(cpf: string) {
  router.push(`/Associate/${cpf}`);
}

function newAge(dateOfBirthISO: string) {
  const currentYear = new Date().getFullYear();
  const dateOfBirth = new Date(dateOfBirthISO).getFullYear();
  return currentYear - dateOfBirth;
}

export const BirthdayCard = ({
  address,
  cellPhone,
  cpf,
  dateOfBirth,
  email,
  fullName,
  homePhone,
}: BirthdayProps) => (
  <View style={styles.container} onTouchEnd={() => touch(cpf)}>
    <Text style={{ color: 'white', fontSize: 18, letterSpacing: 0.5 }}>Nome: {fullName}</Text>
    <Text style={styles.text}>
      Data de nascimento:{' '}
      {`${dateOfBirth.slice(8, 10)}/${dateOfBirth.slice(5, 7)}/${dateOfBirth.slice(0, 4)}`}
    </Text>
    <Text style={{ color: 'white', fontSize: 18, letterSpacing: 0.5 }}>
      Estará completando: {newAge(dateOfBirth)} anos
    </Text>
    <Text style={styles.text}>CPF: {cpf}</Text>
    <Text style={styles.text}>Telefone celular: {cellPhone}</Text>
    <Text style={styles.text}>Telefone residencial: {homePhone}</Text>
    <Text style={styles.text}>E-mail: {email}</Text>
    <Text style={styles.text}>Endereço: {address}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    marginBottom: 20,
    padding: 12,
    width: '85%',
    backgroundColor: '#f64f71',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#80171a',
    gap: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
