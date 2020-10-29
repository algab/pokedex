import axios from 'axios';

const client = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export default client;
