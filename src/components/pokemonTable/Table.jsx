import { VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const PokemonDetailCard = () => {
  const { allPokemonsList } = useSelector(state => state.allPokemons);
  console.log(allPokemonsList);

  return <VStack h="100%" w="100%" p={2} spacing={2}></VStack>;
};
