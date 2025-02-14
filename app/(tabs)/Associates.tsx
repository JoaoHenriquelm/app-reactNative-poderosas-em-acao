import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AssociateCard } from 'components/AssociateCard';
import { TextI } from 'components/TextI';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Associate } from 'interfaces/AssociateProps';
import { LimitOfPages } from 'interfaces/LimitOfPages';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Platform,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Pressable,
  RefreshControl,
} from 'react-native';
import { getLimitOfPagesOfAssociates } from 'services/get-limit-of-pages-of-associates';
import { indexAssociates } from 'services/index-associates';
import { showAssociatesPerName } from 'services/show-associates-per-name';

export default function Associates() {
  const [associates, setAssociates] = useState<Associate[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [limitPage, setLimitPage] = useState(1);
  const [showIndex, setShowIndex] = useState(true);
  const [loading, setLoading] = useState(false);

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

  function cleanSearchText() {
    setSearchText('');
  }

  async function setUpPage() {
    setLoading(true);
    const response = await indexAssociates(page + 1);
    setLoading(false);
    if (response.length === 0) return;
    setAssociates(response);
    setPage(page + 1);
  }

  async function setDownPage() {
    if (page === 1) return;
    setLoading(true);
    const response = await indexAssociates(page - 1);
    setLoading(false);
    setAssociates(response);
    setPage(page - 1);
  }

  async function searchAssociates() {
    setLoading(true);
    setPage(1);
    setSearchName(searchText);
    const response = await showAssociatesPerName(searchText);
    setAssociates(response);
    setShowIndex(false);
    setLoading(false);
  }

  async function loadAssociates() {
    setLoading(true);
    setPage(1);
    const response = await indexAssociates(page);
    const index: LimitOfPages = await getLimitOfPagesOfAssociates();
    setLimitPage(index.limitOfPages);
    setAssociates(response);
    setLoading(false);
  }

  useEffect(() => {
    if (searchText.length === 0) {
      setSearchName('');
      loadAssociates();
      setShowIndex(true);
    }
  }, [searchText]);

  const onRefresh = useCallback(() => {
    if (searchText.length === 0) {
      loadAssociates();
      return;
    }
    searchAssociates();
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <View
        style={{
          width: '85%',
          height: 50,
          borderRadius: 15,
          alignContent: 'center',
          borderColor: '#343434',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextInput
          placeholder="Digite o nome do associado"
          value={searchText}
          onChangeText={setSearchText}
          style={{
            fontSize: 18,
            paddingStart: 10,
            width: '75%',
            fontFamily: 'Inter',
          }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          {searchText.length > 0 && (
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                position: 'relative',
                right: 10,
                height: 50,
              }}
              onPress={cleanSearchText}>
              <FontAwesome size={20} name="close" color="gray" />
            </Pressable>
          )}

          <Pressable
            style={{
              backgroundColor: '#343434',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              paddingLeft: 18,
              paddingRight: 18,
              borderTopRightRadius: 14,
              borderBottomRightRadius: 14,
            }}
            onPress={() => searchText.length > 0 && searchAssociates()}>
            <FontAwesome size={18} name="search" color="white" />
          </Pressable>
        </View>
      </View>

      <View style={styles.associates}>
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
            ListHeaderComponent={
              searchName ? (
                <View
                  style={{
                    margin: 'auto',
                    marginBottom: 20,
                    width: '85%',
                  }}>
                  <TextI style={{ fontSize: 18, color: '#343434' }}>
                    Procurando por: "{searchName}"
                  </TextI>
                </View>
              ) : null
            }
            ListFooterComponent={
              showIndex && limitPage > 1 ? (
                <View style={styles.indexContainer}>
                  <View style={styles.index}>
                    <Pressable
                      style={{
                        borderRightWidth: 1,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#f64f71',
                      }}
                      disabled={page === 1}
                      onPress={setDownPage}>
                      <FontAwesome
                        size={24}
                        name="angle-left"
                        color={page === 1 ? '#919191' : '#f64f71'}
                      />
                    </Pressable>
                    <TextI style={{ fontSize: 18, justifyContent: 'center', alignSelf: 'center' }}>
                      {page}
                    </TextI>
                    <Pressable
                      style={{
                        borderLeftWidth: 1,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#f64f71',
                      }}
                      disabled={limitPage === page}
                      onPress={setUpPage}>
                      <FontAwesome
                        size={24}
                        name="angle-right"
                        color={limitPage === page ? '#919191' : '#f64f71'}
                      />
                    </Pressable>
                  </View>
                </View>
              ) : null
            }
            data={associates}
            keyExtractor={(associate) => associate.props._id}
            renderItem={({ item }) => <AssociateCard props={item.props} />}
            ListEmptyComponent={
              <View style={{ alignItems: 'center' }}>
                <TextI>Nenhum associado encontrado</TextI>
              </View>
            }
          />
        )}
      </View>
      <View />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  associates: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    gap: 20,
  },
  indexContainer: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  index: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderColor: '#f64f71',
  },
});
