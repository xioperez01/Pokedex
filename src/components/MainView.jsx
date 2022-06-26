import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../reducer/slices/allPokemonsSlice';
import { addPokemonsToView } from '../reducer/slices/pokemonsToViewSlice';
import { handlePokemonSelected } from '../reducer/slices/pokemonSelectedSlice';
import { PokemonDetailCard } from './pokemonDetail/PokemonDetailCard';

export const MainView = () => {
  const dispatch = useDispatch();
  const { allPokemonsList, isLoading } = useSelector(
    state => state.allPokemons
  );
  const { pokemonsToViewList } = useSelector(state => state.pokemonsToView);
  const { pokemonSelected } = useSelector(state => state.pokemonSelected);

  useEffect(() => {
    if (!allPokemonsList) dispatch(fetchPokemons());

    if (!pokemonsToViewList && allPokemonsList) {
      dispatch(addPokemonsToView(allPokemonsList?.slice(0, 11)));
    }

    if (!pokemonSelected && pokemonsToViewList)
      dispatch(handlePokemonSelected(pokemonsToViewList[0]));

    //if (pokemonsToViewList)
  });

  return (
    <VStack h="100vh" w="100vw" bgColor="blue.100" p={4}>
      <Box h="100px">
        <Heading>Bienvenido a la Pokedex</Heading>
        <Text>Estos son los pokemones de la primera temporada</Text>
        {isLoading ? (
          <Text>...loading</Text>
        ) : (
          <HStack
            bgColor="red.100"
            w="100%"
            maxW="1200px"
            h="calc(100vh - 132px )"
          >
            {pokemonSelected && <PokemonDetailCard />}
          </HStack>
        )}
      </Box>
    </VStack>
  );
};
