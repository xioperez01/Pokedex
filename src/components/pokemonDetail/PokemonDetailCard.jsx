import {
  Image,
  VStack,
  Stack,
  Badge,
  Text,
  Box,
  Progress,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const PokemonDetailCard = () => {
  const { pokemonSelected } = useSelector(state => state.pokemonSelected);

  return (
    <VStack h="100%" w="100%" p={2} spacing={2}>
      <Image
        w="10vw"
        src={pokemonSelected?.sprites.other['official-artwork'].front_default}
      />
      <Text w="50%">{pokemonSelected?.description}</Text>
      <Text>{pokemonSelected?.category}</Text>
      <Text>Type</Text>
      <Stack direction="row">
        {pokemonSelected?.types?.map(t => (
          <Badge key={t?.type?.name} variant="solid" colorScheme="green">
            {t?.type?.name}
          </Badge>
        ))}
      </Stack>
      <Stack direction="row">
        <Box>
          <Text>Height</Text>
          <Text>{`${pokemonSelected?.height / 10} m`}</Text>
          <Text>Weight</Text>
          <Text>{`${pokemonSelected?.weight / 10} kg`}</Text>
        </Box>
        <Box>
          <Text>Location</Text>
          {pokemonSelected?.location?.map(l => (
            <Text key={l}>{l}</Text>
          ))}
        </Box>
      </Stack>
      <Stack direction="row">
        <Box>
          <Text>Stats</Text>
          {pokemonSelected?.stats?.map(s => (
            <Box key={s?.stat?.name}>
              <Text>{`${s?.stat?.name} ${s?.base_stat}`}</Text>
              <Progress value={s?.base_stat} size="xs" colorScheme="pink" />
            </Box>
          ))}
        </Box>
        <Box>
          <Text>Abilidades</Text>
          {pokemonSelected?.abilities?.map(
            (a, index) =>
              index < 5 && (
                <Text key={a?.ability?.name}>{a?.ability?.name}</Text>
              )
          )}
        </Box>
      </Stack>
    </VStack>
  );
};
