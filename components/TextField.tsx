import { View, TextInput, StyleSheet } from 'react-native';

export const TextField = ({ ...inputProps }) => (
  <View style={styles.textField}>
    <TextInput style={styles.input} {...inputProps} />
  </View>
);

const styles = StyleSheet.create({
  textField: {
    width: '85%',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#631317',
    paddingStart: 10,
    borderRadius: 15,
  },
});
