import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const AllPokemonsSlice = createSlice({
  name: 'allPokemons',
  initialState: {
    allPokemonsList: undefined,
  },
  reducers: {
    setAllPokemonsList: (state, action) => {
      state.allPokemonsList = action.payload;
    },
  },
});

export const { setAllPokemonsList } = AllPokemonsSlice.actions;
export default AllPokemonsSlice.reducer;

//

export const fetchPokemons = () => dispatch => {
  axios
    .get('https://pokeapi.co/api/v2/generation/1/')
    .then(response => {
      dispatch(setAllPokemonsList(response.data.pokemon_species));
    })
    .catch(error => console.error(error));
};
