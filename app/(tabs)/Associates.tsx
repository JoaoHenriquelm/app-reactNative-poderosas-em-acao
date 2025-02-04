import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AssociateCard } from 'components/AssociateCard';
import { Associate } from 'interfaces/AssociateProps';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Platform,
  StatusBar,
  Text,
  ActivityIndicator,
  TextInput,
  Pressable,
} from 'react-native';
import { indexAssociates } from 'services/index-associates';
import { showAssociatesPerName } from 'services/show-associates-per-name';

export default function Associates() {
  const [associates, setAssociates] = useState<Associate[]>([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [showIndex, setShowIndex] = useState(true);
  const [loading, setLoading] = useState(false);

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
    setPage(page - 1);
    setAssociates(response);
    setLoading(false);
  }

  async function searchAssociates() {
    setLoading(true);
    const response = await showAssociatesPerName(searchText);
    setAssociates(response);
    setShowIndex(false);
    setLoading(false);
  }

  useEffect(() => {
    async function loadAssociates() {
      setLoading(true);
      setPage(1);
      const response = await indexAssociates(page);
      setAssociates(response);
      setLoading(false);
    }
    if (searchText.length === 0) {
      loadAssociates();
      setShowIndex(true);
    }
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '85%',
          height: 50,
          borderRadius: 15,
          alignContent: 'center',
          borderColor: '#631317',
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
          }}
        />

        <View style={{ flexDirection: 'row', width: '25%', justifyContent: 'space-between' }}>
          <Pressable
            style={{
              justifyContent: 'center',
              marginLeft: 5,
            }}
            onPress={cleanSearchText}>
            <FontAwesome size={20} name="close" color="gray" />
          </Pressable>

          <Pressable
            style={{
              backgroundColor: 'black',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              paddingLeft: 18,
              paddingRight: 18,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
            onPress={searchAssociates}>
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
            ListFooterComponent={
              showIndex ? (
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
                      onPress={setDownPage}>
                      <FontAwesome size={24} name="angle-left" color="#f64f71" />
                    </Pressable>
                    <Text style={{ fontSize: 18, justifyContent: 'center', alignSelf: 'center' }}>
                      {page}
                    </Text>
                    <Pressable
                      style={{
                        borderLeftWidth: 1,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#f64f71',
                      }}
                      onPress={setUpPage}>
                      <FontAwesome size={24} name="angle-right" color="#f64f71" />
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
                <Text>Nenhum associado encontrado</Text>
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
