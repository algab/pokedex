import styled from 'styled-components/native';

export const ButtonPokemon = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5px;
`;

export const TextPokemon = styled.Text`
  font-size: 15px;
  text-transform: uppercase;
  margin-left: 25px;
  width: 70%;
`;

export const ImagePokemon = styled.Image`
  height: 80px;
  width: 80px;
  width: 30%;
`;

export const Separator = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
  align-self: flex-end;
  width: 65%;
`;
