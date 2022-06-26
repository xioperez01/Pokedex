import { Flex, Image, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { handlePokemonSelected } from '../../reducer/slices/pokemonSelectedSlice';

export const ListCard = ({ pokemon }) => {
  const dispatch = useDispatch();
  return (
    <Flex
      dir="row"
      w="auto"
      h="auto"
      py={2}
      px={4}
      alignItems="center"
      rounded="xl"
      border="1px"
      onClick={() => dispatch(handlePokemonSelected(pokemon))}
      zIndex={10}
    >
      <Image
        w="30px"
        h="30px"
        src={pokemon?.sprites?.other['official-artwork'].front_default}
      />
      <Text ml={4}>{pokemon?.name}</Text>
    </Flex>
  );
};
