import { configureStore } from '@reduxjs/toolkit';
import allPokemons from './slices/allPokemonsSlice';
import pokemonsToView from './slices/pokemonsToViewSlice';
import pokemonSelected from './slices/pokemonSelectedSlice';

export default configureStore({
  reducer: {
    allPokemons,
    pokemonsToView,
    pokemonSelected,
  },
});
