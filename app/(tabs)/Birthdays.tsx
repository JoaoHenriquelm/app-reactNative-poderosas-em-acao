import { BirthdayCard } from 'components/BirthdayCard';
import { TextI } from 'components/TextI';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Birthday } from 'interfaces/BirthdayProps';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Platform,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { showBirthdays } from 'services/show-birthdays';

export default function Birthdays() {
  const [loading, setLoading] = useState(false);
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);

  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  useFocusEffect(() => {
    return navigation.addListener('state', () => {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    });
  });
  useFocusEffect(() => {
    return navigation.addListener('focus', () => {
      onRefresh();
    });
  });

  function getMonth() {
    const month = new Date().getMonth() + 1;
    return month < 10 ? `0${month}` : month;
  }

  async function loadBirthdays() {
    setLoading(true);
    const response = await showBirthdays();
    setBirthdays(response);
    setLoading(false);
  }
  useEffect(() => {
    loadBirthdays();
  }, []);

  const onRefresh = useCallback(() => {
    loadBirthdays();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <TextI style={{ fontSize: 80 }}>{getMonth()}</TextI>
      <TextI style={{ fontSize: 30 }}>Mês</TextI>

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
            ref={flatListRef}
            refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={loading} />}
            data={birthdays}
            keyExtractor={(birthday) => birthday.props.cpf}
            renderItem={({ item }) => <BirthdayCard props={item.props} />}
            ListEmptyComponent={
              <View style={{ alignItems: 'center' }}>
                <TextI>Não há associado fazendo aniversário nesse mês</TextI>
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
