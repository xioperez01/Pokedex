import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const PokemonsToViewSlice = createSlice({
  name: 'pokemonsToView',
  initialState: {
    pokemonsToViewList: [],
    next: null,
    prev: null,
  },
  reducers: {
    showMorePomkemons: (state, action) => {
      state.pokemonsToViewList = [
        ...state.pokemonsToViewList,
        ...action.payload,
      ];
    },

    showInitialPokemons: (state, action) => {
      state.pokemonsToViewList = [...action.payload];
    },
  },
});

export const { showMorePomkemons, showInitialPokemons } =
  PokemonsToViewSlice.actions;

export default PokemonsToViewSlice.reducer;

export const addPokemonsToView = (newPokemonsToView, isInitial) => dispatch => {
  async function getPokemon(name) {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    return data;
  }

  Promise.all(
    newPokemonsToView?.map(pokemon => getPokemon(pokemon?.name))
  ).then(response => {
    const data = response.map(d => d.data);
    console.log(data);
    isInitial
      ? dispatch(showInitialPokemons(data))
      : dispatch(showMorePomkemons(data));
  });
};
