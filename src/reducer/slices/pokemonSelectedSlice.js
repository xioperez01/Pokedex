import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const PokemonSelectedSlice = createSlice({
  name: 'pokemonSelected',
  initialState: {
    pokemonSelected: undefined,
  },
  reducers: {
    selectPokemon: (state, action) => {
      state.pokemonSelected = action.payload;
    },

    unSelectPokemon: (state, action) => {
      state.pokemonSelected = action.payload;
    },

    updatePokemonSelectedLocation: (state, action) => {
      state.pokemonSelected = {
        ...state.pokemonSelected,
        location: action.payload,
      };
    },

    updatePokemonSelectedCategory: (state, action) => {
      state.pokemonSelected = {
        ...state.pokemonSelected,
        category: action.payload,
      };
    },

    updatePokemonSelectedDescription: (state, action) => {
      state.pokemonSelected = {
        ...state.pokemonSelected,
        description: action.payload,
      };
    },
  },
});

export const {
  selectPokemon,
  unSelectPokemon,
  updatePokemonSelectedLocation,
  updatePokemonSelectedCategory,
  updatePokemonSelectedDescription,
} = PokemonSelectedSlice.actions;

export default PokemonSelectedSlice.reducer;

export const handlePokemonSelected = pokemonSelected => dispatch => {
  if (pokemonSelected) {
    dispatch(selectPokemon(pokemonSelected));

    // Update Locations
    axios.get(pokemonSelected?.location_area_encounters).then(response => {
      const locations =
        response?.data?.length <= 3
          ? response?.data
          : response?.data?.splice(0, 3);
      dispatch(
        updatePokemonSelectedLocation(
          locations.map(l => l?.location_area?.name)
        )
      );
    });

    // Update Category

    axios.get(pokemonSelected?.species?.url).then(response => {
      dispatch(
        updatePokemonSelectedCategory(
          response.data.genera.filter(g => g?.language?.name === 'en')[0].genus
        )
      );
      //update Description
      dispatch(
        updatePokemonSelectedDescription(
          response.data.flavor_text_entries.filter(
            description => description.language.name === 'en'
          )[0].flavor_text
        )
      );
    });
  } else selectPokemon(undefined);
};
