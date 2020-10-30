export type PokemonType = {
  type: { name: string };
};

export type PokemonAbility = {
  ability: { name: string };
};

export type PokemonMoves = {
  move: { name: string };
};

export type PokemonData = {
  base_experience: string;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: [PokemonType];
  abilities: [PokemonAbility];
  moves: [PokemonMoves];
};

export type PokemonSpecies = {
  capture_rate: number;
  is_legendary: boolean;
};

export type PokemonEvolution = {
  id: string;
  name: string;
};
