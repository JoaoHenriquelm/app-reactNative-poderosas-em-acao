import { BirthdayCard } from 'components/BirthdayCard';
import { BirthdayProps } from 'interfaces/BirthdayProps';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { showBirthdays } from 'services/show-birthdays';

export default function Birthdays() {
  const [loading, setLoading] = useState(false);
  const [birthdays, setBirthdays] = useState<BirthdayProps[]>([]);

  function getMonth() {
    const month = new Date().getMonth() + 1;
    return month < 10 ? `0${month}` : month;
  }
  useEffect(() => {
    async function loadBirthdays() {
      setLoading(true);
      const response = await showBirthdays();
      setBirthdays(response);
      setLoading(false);
    }
    loadBirthdays();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 80 }}>{getMonth()}</Text>
      <Text style={{ fontSize: 30 }}>Mês</Text>

      <View style={styles.birthdays}>
        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <ActivityIndicator
              size={128}
              color="#c50b31"
              style={{ justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
        ) : (
          <FlatList
            data={birthdays}
            keyExtractor={(birthday) => birthday.cpf}
            renderItem={({ item }) => <BirthdayCard {...item} />}
            ListEmptyComponent={
              <View style={{ alignItems: 'center' }}>
                <Text>Não há associado fazendo aniversário nesse mês</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  birthdays: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    gap: 20,
  },
});
