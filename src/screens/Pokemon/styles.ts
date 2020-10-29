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

export const SkillsPokemon = styled.View`
  margin-top: 10px;
  margin-left: 10px;
`;

export const SkillsPokemonTitle = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
`;

export const SkillsPokemonText = styled.Text`
  font-size: 15px;
  margin-top: 15px;
`;

export const MovesPokemon = styled.View`
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const MovesPokemonTitle = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
`;

export const MovesPokemonText = styled.Text`
  font-size: 15px;
  margin-top: 15px;
`;
