import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../reducer/slices/allPokemonsSlice';
import { addPokemonsToView } from '../reducer/slices/pokemonsToViewSlice';
import { PokemonDetailCard } from './pokemonDetail/PokemonDetailCard';
import { PokemonsTable } from './pokemonTable/Table';

export const MainView = () => {
  const dispatch = useDispatch();
  const { allPokemonsList, isLoading } = useSelector(
    state => state.allPokemons
  );
  const { pokemonsToViewList } = useSelector(state => state.pokemonsToView);
  const { pokemonSelected } = useSelector(state => state.pokemonSelected);

  useEffect(() => {
    if (!allPokemonsList) dispatch(fetchPokemons());

    if (pokemonsToViewList.length === 0 && allPokemonsList) {
      dispatch(addPokemonsToView(allPokemonsList.slice(0, 15)));
    }

    //if (!pokemonSelected && pokemonsToViewList)
    //  dispatch(handlePokemonSelected(pokemonsToViewList[0]));

    //if (pokemonsToViewList)
  });

  return (
    <VStack h="100vh" w="100vw" p={4}>
      <Box h="50px">
        <Heading>Bienvenido a la Pokedex</Heading>
      </Box>

      {isLoading ? (
        <Text>...loading</Text>
      ) : (
        <HStack w="100%" maxW="1200px" h="calc(100vh - 82px)">
          {pokemonsToViewList && <PokemonsTable />}

          {pokemonSelected && <PokemonDetailCard />}
        </HStack>
      )}
    </VStack>
  );
};
