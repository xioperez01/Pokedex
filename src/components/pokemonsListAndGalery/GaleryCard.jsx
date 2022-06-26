import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { handlePokemonSelected } from '../../reducer/slices/pokemonSelectedSlice';

export const GaleryCard = ({ pokemon }) => {
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
      bgColor="white"
      _hover={{
        cursor: 'pointer',
        bgColor: 'blackAlpha.200',
        transition: 'all 0.3s',
      }}
    >
      <Image
        w="50%"
        maxW="170px"
        h="auto"
        src={pokemon?.sprites?.other['official-artwork'].front_default}
      />
      <Box textAlign="center">
        <Text fontSize="lg" fontWeight="semibold">
          {pokemon?.name}
        </Text>
        <Box>
          <Text fontWeight="semibold">Skills</Text>
          {pokemon?.abilities?.map(
            (a, index) =>
              index < 5 && (
                <Text key={a?.ability?.name}>{a?.ability?.name}</Text>
              )
          )}
        </Box>
      </Box>
    </Flex>
  );
};
