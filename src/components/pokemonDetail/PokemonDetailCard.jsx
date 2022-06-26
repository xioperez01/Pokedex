import {
  Image,
  Icon,
  VStack,
  Stack,
  Badge,
  Text,
  Box,
  Progress,
  Flex,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { handlePokemonSelected } from '../../reducer/slices/pokemonSelectedSlice';
export const PokemonDetailCard = () => {
  const { pokemonSelected } = useSelector(state => state.pokemonSelected);
  const dispatch = useDispatch();

  return (
    <VStack
      h="100%"
      w="100%"
      p={2}
      spacing={2}
      position="relative"
      border="1px"
      rounded="xl"
    >
      <Icon
        position="absolute"
        right="8px"
        top="8px"
        as={MdClose}
        boxSize={6}
        onClick={() => dispatch(handlePokemonSelected(undefined))}
        _hover={{ cursor: 'pointer' }}
        zIndex="modal"
      />
      <Image
        w="10vw"
        src={pokemonSelected?.sprites.other['official-artwork'].front_default}
      />
      <Text textAlign="center" w="100%">
        {pokemonSelected?.description}
      </Text>

      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        w="100%"
        px={2}
      >
        <Box textAlign="center">
          <Text mb={2} fontWeight="semibold" fontSize="lg">
            Category
          </Text>
          <Text>{pokemonSelected?.category}</Text>
        </Box>
        <Box textAlign="center">
          <Text mb={2} fontWeight="semibold" fontSize="lg">
            Type
          </Text>
          <Stack direction="row">
            {pokemonSelected?.types?.map(t => (
              <Badge key={t?.type?.name} variant="solid" colorScheme="green">
                {t?.type?.name}
              </Badge>
            ))}
          </Stack>
        </Box>
      </Flex>

      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        w="100%"
        p={2}
        bgColor="red.200"
        rounded="md"
        textAlign="center"
      >
        <Box>
          <Text fontWeight="semibold" fontSize="lg">
            Height
          </Text>
          <Text>{`${pokemonSelected?.height / 10} m`}</Text>
          <Text fontWeight="semibold" fontSize="lg">
            Weight
          </Text>
          <Text>{`${pokemonSelected?.weight / 10} kg`}</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold" fontSize="lg">
            Skills
          </Text>
          {pokemonSelected?.abilities?.map(
            (a, index) =>
              index < 5 && (
                <Text key={a?.ability?.name}>{a?.ability?.name}</Text>
              )
          )}
        </Box>
      </Flex>

      <Box w="100%" px={4} textAlign="left">
        <Text textAlign="center" fontWeight="semibold" fontSize="lg">
          Stats
        </Text>
        {pokemonSelected?.stats?.map(s => (
          <Flex direction="row" alignItems="center" key={s?.stat?.name}>
            <Text fontWeight="semibold">{s?.stat?.name} </Text>
            <Progress
              w="80%"
              mx={4}
              value={s?.base_stat}
              size="xs"
              colorScheme="pink"
            />
            <Text>{s?.base_stat}</Text>
          </Flex>
        ))}
      </Box>
    </VStack>
  );
};
