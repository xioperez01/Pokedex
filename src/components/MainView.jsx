import { Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../reducer/slices/allPokemonsSlice';
import { addPokemonsToView } from '../reducer/slices/pokemonsToViewSlice';

export const MainView = () => {
  const dispatch = useDispatch();
  const { allPokemonsList } = useSelector(state => state.allPokemons);
  const { pokemonsToViewList } = useSelector(state => state.pokemonsToView);

  console.log(pokemonsToViewList);

  useEffect(() => {
    if (!allPokemonsList) dispatch(fetchPokemons());

    if (allPokemonsList && allPokemonsList.lenght !== 0)
      dispatch(addPokemonsToView(allPokemonsList.slice(0, 11)));
  }, []);

  return (
    <VStack h="100%" w="100vw" bgColor="blue.100" p={4}>
      <Heading>Bienvenido a la Pokedex</Heading>
    </VStack>
  );
};
