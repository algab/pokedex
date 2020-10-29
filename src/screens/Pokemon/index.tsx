import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import api from '../../services/api';

import {
  PokemonDetail,
  LoadingView,
  ImagePokemon,
  ImageViewPokemon,
  InfoPokemon,
  InfoPokemonText,
  SkillsPokemon,
  SkillsPokemonTitle,
  SkillsPokemonText,
  MovesPokemon,
  MovesPokemonTitle,
  MovesPokemonText,
} from './styles';

type PokemonParam = {
  Params: {
    id: number;
  };
};

interface Pokemon {
  base_experience: string;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  abilities: [{ ability: { name: string } }];
  moves: [
    {
      move: { name: string };
    },
  ];
}

const Pokemon: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);

  const navigation = useNavigation();
  const route = useRoute<RouteProp<PokemonParam, 'Params'>>();

  useEffect(() => {
    async function searchPokemon() {
      setLoading(true);
      const { data } = await api.get(`/pokemon/${route.params.id}`);
      setPokemon(data);
      setLoading(false);
    }
    searchPokemon();
  }, [route]);

  useEffect(() => {
    if (pokemon.name) {
      navigation.setOptions({ headerTitle: pokemon.name });
    }
  }, [navigation, pokemon]);

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
      <SkillsPokemon>
        <SkillsPokemonTitle>Habilidades:</SkillsPokemonTitle>
        {pokemon.abilities.map((data: any, index: number) => (
          <SkillsPokemonText key={index}>{data.ability.name}</SkillsPokemonText>
        ))}
      </SkillsPokemon>
      <MovesPokemon>
        <MovesPokemonTitle>Movimentos:</MovesPokemonTitle>
        {pokemon.moves.map((data: any, index: number) => (
          <MovesPokemonText key={index}>{data.move.name}</MovesPokemonText>
        ))}
      </MovesPokemon>
    </PokemonDetail>
  );
};

export default Pokemon;
