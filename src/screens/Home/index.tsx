import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import api from '../../services/api';

import ListPokemons from './List';

import { ListSkeleton, List, LoadingScroll } from './styles';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pokemons, setPokemons] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function listPokemons() {
      try {
        setLoading(true);
        const { data } = await api.get('/pokemon?offset=0&limit=20');
        setPokemons(data.results);
        setLoading(false);
      } catch (error) {
        Alert.alert('Aviso', 'Ocorreu um problema, tente novamente mais tarde', [{ text: 'OK' }]);
      }
    }
    listPokemons();
  }, []);

  const selectPokemon = (index: number) => {
    navigation.navigate('Pokemon', { id: index + 1 });
  };

  const infiniteScroll = () => {
    return (
      <LoadingScroll>
        <ActivityIndicator color="blue" />
      </LoadingScroll>
    );
  };

  const loadPokemons = async () => {
    const offset = 20 * (page + 1) - 20;
    const { data } = await api.get(`/pokemon?offset=${offset}&limit=20`);
    const result = pokemons.concat(data.results);
    setPage(page + 1);
    setPokemons(result);
  };

  if (loading) {
    return (
      <ListSkeleton>
        {Array.from({ length: 10 }).map((_, index: number) => (
          <SkeletonPlaceholder key={index}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={80}
                height={80}
                borderRadius={40}
                marginLeft={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item width={150} height={20} marginLeft={20} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ))}
      </ListSkeleton>
    );
  }
  return (
    <List>
      <FlatList
        data={pokemons}
        keyExtractor={(_, index) => `${index}`}
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.1}
        ListFooterComponent={infiniteScroll}
        initialNumToRender={20}
        renderItem={({ item, index }: any) => (
          <ListPokemons item={item} index={index} selectPokemon={selectPokemon} />
        )}
      />
    </List>
  );
};

export default Home;
