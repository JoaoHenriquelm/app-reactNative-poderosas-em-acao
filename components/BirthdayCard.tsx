import { router } from 'expo-router';
import { Birthday } from 'interfaces/BirthdayProps';
import { View, StyleSheet } from 'react-native';

import { TextI } from './TextI';

function touch(cpf: string) {
  router.push(`/Associate/${cpf}`);
}

function newAge(dateOfBirthISO: string) {
  const currentYear = new Date().getFullYear();
  const dateOfBirth = new Date(dateOfBirthISO).getFullYear();
  return currentYear - dateOfBirth;
}

export const BirthdayCard = ({ props }: Birthday) => (
  <View style={styles.container} onTouchEnd={() => touch(props.cpf)}>
    <TextI style={{ color: 'white', fontSize: 18, letterSpacing: 0.5 }}>
      Nome: {props.fullName}
    </TextI>
    <TextI style={{ color: 'white', fontSize: 18, letterSpacing: 0.5 }}>
      Estará completando: {newAge(props.dateOfBirth)} anos
    </TextI>
    <TextI style={styles.text}>
      Data de nascimento:{' '}
      {`${props.dateOfBirth.slice(8, 10)}/${props.dateOfBirth.slice(5, 7)}/${props.dateOfBirth.slice(0, 4)}`}
    </TextI>
    <TextI style={styles.text}>
      CPF: <TextI style={{ letterSpacing: 2 }}>{props.cpf}</TextI>
    </TextI>
    <TextI style={styles.text}>Telefone celular: {props.cellPhone}</TextI>
    <TextI style={styles.text}>Telefone residencial: {props.homePhone}</TextI>
    <TextI style={styles.text}>E-mail: {props.email}</TextI>
    <TextI style={styles.text}>Endereço: {props.address}</TextI>
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
