import { configureStore } from '@reduxjs/toolkit';
import allPokemons from './slices/allPokemonsSlice';
import pokemonsToView from './slices/pokemonsToViewSlice';

export default configureStore({
  reducer: {
    allPokemons,
    pokemonsToView,
  },
});
