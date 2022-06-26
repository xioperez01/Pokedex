import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const PokemonsToViewSlice = createSlice({
  name: 'pokemonsToView',
  initialState: {
    pokemonsToViewList: [],
  },
  reducers: {
    showMorePomkemons: (state, action) => {
      state.pokemonsToViewList = {
        ...state.pokemonsToViewList,
        ...action.payload,
      };
    },

    showLessPokemons: (state, action) => {
      state.pokemonsToViewList = {
        ...state.pokemonsToViewList,
        ...action.payload,
      };
    },
  },
});

export const { showMorePomkemons, showLessPokemons } =
  PokemonsToViewSlice.actions;
export default PokemonsToViewSlice.reducer;

export const addPokemonsToView = pokemonsList => dispatch => {
  async function getPokemon(name) {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    return data;
  }

  Promise.all(pokemonsList.map(pokemon => getPokemon(pokemon.name))).then(
    response => {
      const data = response.map(d => d.data);
      dispatch(showMorePomkemons(data));
    }
  );
};
