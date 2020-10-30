import styled from 'styled-components/native';

export const PokemonDetail = styled.ScrollView`
  background-color: white;
`;

export const LoadingView = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export const ImageViewPokemon = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ImagePokemon = styled.Image`
  height: 140px;
  width: 140px;
  border-radius: 70px;
`;

export const InfoPokemon = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 5px;
`;

export const InfoPokemonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const DataPokemon = styled.View`
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const DataPokemonTitle = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
`;

export const DataPokemonText = styled.Text`
  font-size: 15px;
  margin-top: 15px;
`;
