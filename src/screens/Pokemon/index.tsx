import React, { useCallback, useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';

import api from '../../services/api';
import {
  PokemonData,
  PokemonType,
  PokemonAbility,
  PokemonMoves,
  PokemonSpecies,
  PokemonEvolution,
} from '../../utils/types';

import {
  PokemonDetail,
  LoadingView,
  ImagePokemon,
  ImageViewPokemon,
  InfoPokemon,
  InfoPokemonText,
  DataPokemon,
  DataPokemonTitle,
  DataPokemonText,
} from './styles';

type PokemonParam = {
  Params: {
    id: number;
  };
};

const Pokemon: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<PokemonData>({} as PokemonData);
  const [specie, setSpecie] = useState<PokemonSpecies>({} as PokemonSpecies);
  const [chainEvolutions, setChainEvolutions] = useState<PokemonEvolution[]>([]);

  const navigation = useNavigation();
  const route = useRoute<RouteProp<PokemonParam, 'Params'>>();

  const verifyEvolution = useCallback((pokemonData: PokemonData, evolutions: any) => {
    const data = [];
    if (evolutions.species.name !== pokemonData.name) {
      const url = evolutions.species.url;
      const id = url.split('/pokemon-species/')[1].split('/')[0];
      data.push({ id, name: evolutions.species.name });
    }
    if (
      evolutions.evolves_to.length !== 0 &&
      evolutions.evolves_to[0].species.name !== pokemonData.name
    ) {
      const url = evolutions.evolves_to[0].species.url;
      const id = url.split('/pokemon-species/')[1].split('/')[0];
      data.push({ id, name: evolutions.evolves_to[0].species.name });
    }
    if (
      evolutions.evolves_to.length !== 0 &&
      evolutions.evolves_to[0].evolves_to.length !== 0 &&
      evolutions.evolves_to[0].evolves_to[0].species.name !== pokemonData.name
    ) {
      const url = evolutions.evolves_to[0].evolves_to[0].species.url;
      const id = url.split('/pokemon-species/')[1].split('/')[0];
      data.push({ id, name: evolutions.evolves_to[0].evolves_to[0].species.name });
    }
    setChainEvolutions(data);
  }, []);

  useEffect(() => {
    async function searchPokemon() {
      setLoading(true);
      const responses = await axios.all([
        api.get(`/pokemon/${route.params.id}`),
        api.get(`/pokemon-species/${route.params.id}`),
      ]);
      const evolutions = await axios.get(responses[1].data.evolution_chain.url);
      setPokemon(responses[0].data);
      setSpecie(responses[1].data);
      verifyEvolution(responses[0].data, evolutions.data.chain);
      setLoading(false);
    }
    searchPokemon();
  }, [route, verifyEvolution]);

  useEffect(() => {
    if (pokemon.name) {
      navigation.setOptions({ headerTitle: pokemon.name });
    }
  }, [navigation, pokemon]);

  const selectPokemon = (id: string) => {
    navigation.navigate('Pokemon', { id });
  };

  if (loading) {
    return (
      <LoadingView>
        <ActivityIndicator color="blue" size="large" />
      </LoadingView>
    );
  }
  return (
    <PokemonDetail>
      <ImageViewPokemon>
        <ImagePokemon source={{ uri: pokemon.sprites.front_default }} />
      </ImageViewPokemon>
      <InfoPokemon>
        <InfoPokemonText>XP: {pokemon.base_experience}</InfoPokemonText>
        <InfoPokemonText>ALTURA: {pokemon.height * 10} cm</InfoPokemonText>
        <InfoPokemonText>PESO: {pokemon.weight / 10} Kg</InfoPokemonText>
      </InfoPokemon>
      <InfoPokemon>
        <InfoPokemonText>TAXA DE CAPTURA: {specie.capture_rate}</InfoPokemonText>
        <InfoPokemonText>LENDÁRIO: {specie.is_legendary ? 'Sim' : 'Não'}</InfoPokemonText>
      </InfoPokemon>
      <DataPokemon>
        <DataPokemonTitle>Tipo:</DataPokemonTitle>
        {pokemon.types.map((data: PokemonType, index: number) => (
          <DataPokemonText key={index}>{data.type.name}</DataPokemonText>
        ))}
      </DataPokemon>
      {chainEvolutions.length !== 0 && (
        <DataPokemon>
          <DataPokemonTitle>Evolução:</DataPokemonTitle>
          {chainEvolutions.map((data: PokemonEvolution, index: number) => (
            <TouchableOpacity key={index} onPress={() => selectPokemon(data.id)}>
              <DataPokemonText>{data.name}</DataPokemonText>
            </TouchableOpacity>
          ))}
        </DataPokemon>
      )}
      <DataPokemon>
        <DataPokemonTitle>Habilidades:</DataPokemonTitle>
        {pokemon.abilities.map((data: PokemonAbility, index: number) => (
          <DataPokemonText key={index}>{data.ability.name}</DataPokemonText>
        ))}
      </DataPokemon>
      <DataPokemon>
        <DataPokemonTitle>Movimentos:</DataPokemonTitle>
        {pokemon.moves.map((data: PokemonMoves, index: number) => (
          <DataPokemonText key={index}>{data.move.name}</DataPokemonText>
        ))}
      </DataPokemon>
    </PokemonDetail>
  );
};

export default Pokemon;
