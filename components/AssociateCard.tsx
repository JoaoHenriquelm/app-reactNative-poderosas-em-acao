import { router } from 'expo-router';
import { AssociateProps, Associate } from 'interfaces/AssociateProps';
import { View, Text, StyleSheet } from 'react-native';

function touch(props: AssociateProps) {
  router.push(`/Associate/${props.cpf}`);
}

export const AssociateCard = ({ props }: Associate) => (
  <View style={styles.container} onTouchEnd={() => touch(props)}>
    <Text style={{ color: 'white', fontSize: 18, letterSpacing: 0.5 }}>Nome: {props.fullName}</Text>
    <Text style={styles.text}>CPF: {props.cpf}</Text>
    <Text style={styles.text}>
      Data de nascimento:{' '}
      {`${props.dateOfBirth.slice(8, 10)}/${props.dateOfBirth.slice(5, 7)}/${props.dateOfBirth.slice(0, 4)}`}
    </Text>
    <Text style={styles.text}>Categoria de associação: {props.associationCategory}</Text>
    <Text style={styles.text}>Telefone celular: {props.cellPhone}</Text>
    <Text style={styles.text}>Endereço: {props.address}</Text>
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
