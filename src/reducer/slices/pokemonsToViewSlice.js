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

    showLessPokemons: (state, action) => {
      state.pokemonsToViewList = [
        ...state.pokemonsToViewList,
        ...action.payload,
      ];
    },

    handleNext: (state, action) => {
      state.pokemonsToViewList = [(state.next = action.payload)];
    },

    handlePrev: (state, action) => {
      state.prev = action.payload;
    },
  },
});

export const { showMorePomkemons, showLessPokemons, handleNext, handlePrev } =
  PokemonsToViewSlice.actions;

export default PokemonsToViewSlice.reducer;

export const addPokemonsToView = newPokemonsToView => dispatch => {
  async function getPokemon(name) {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    return data;
  }

  Promise.all(
    newPokemonsToView?.map(pokemon => getPokemon(pokemon?.name))
  ).then(response => {
    const data = response.map(d => d.data);
    console.log(data);
    dispatch(showMorePomkemons(data));
  });
};
