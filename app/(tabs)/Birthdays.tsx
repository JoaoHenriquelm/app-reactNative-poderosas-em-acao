import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BirthdayCard } from 'components/BirthdayCard';
import { TextI } from 'components/TextI';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Birthday } from 'interfaces/BirthdayProps';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Platform,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from 'react-native';
import { showBirthdays } from 'services/show-birthdays';

export default function Birthdays() {
  const [loading, setLoading] = useState(false);
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  useFocusEffect(() => {
    return navigation.addListener('state', () => {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    });
  });
  useFocusEffect(() => {
    return navigation.addListener('focus', () => {
      setMonth(new Date().getMonth() + 1);
    });
  });

  function getMonthString() {
    return month < 10 ? `0${month}` : month;
  }

  function setUpMonth() {
    if (month === 12) return;
    return setMonth(month + 1);
  }

  function setDownMonth() {
    if (month === 1) return;
    return setMonth(month - 1);
  }

  async function loadBirthdays(month: number) {
    setLoading(true);
    const response = await showBirthdays(month);
    setBirthdays(response);
    setLoading(false);
  }

  useEffect(() => {
    loadBirthdays(month);
  }, [month]);

  const onRefresh = useCallback(() => {
    loadBirthdays(month);
  }, [month]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 80 }}>
        <Pressable
          style={{
            borderRightWidth: 1,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: month === 1 ? '#919191' : '#f64f71',
          }}
          disabled={month === 1}
          onPress={setDownMonth}>
          <FontAwesome size={24} name="angle-left" color={month === 1 ? '#919191' : '#f64f71'} />
        </Pressable>
        <View>
          <TextI style={{ fontSize: 80 }}>{getMonthString()}</TextI>
        </View>
        <Pressable
          style={{
            borderLeftWidth: 1,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: month === 12 ? '#919191' : '#f64f71',
          }}
          disabled={month === 12}
          onPress={setUpMonth}>
          <FontAwesome size={24} name="angle-right" color={month === 12 ? '#919191' : '#f64f71'} />
        </Pressable>
      </View>
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
                <TextI style={{ color: '#c50b31' }}>
                  Não há associado fazendo aniversário nesse mês
                </TextI>
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
