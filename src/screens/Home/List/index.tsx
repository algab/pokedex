import React from 'react';

import { ButtonPokemon, TextPokemon, ImagePokemon } from './styles';

interface Props {
  item: any;
  index: number;
  selectPokemon: (index: number) => void;
}

const ListPokemons: React.FC<Props> = ({ item, index, selectPokemon }) => {
  return (
    <ButtonPokemon key={index} onPress={() => selectPokemon(index)}>
      <ImagePokemon
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }}
      />
      <TextPokemon>{item.name}</TextPokemon>
    </ButtonPokemon>
  );
};

export default ListPokemons;
