import { SimpleGrid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { ListCard } from './ListCard';
import { GaleryCard } from './GaleryCard';

export const ViewsContainer = () => {
  const { pokemonsToViewList } = useSelector(state => state.pokemonsToView);
  const { viewType } = useSelector(state => state.allPokemons);

  return (
    <SimpleGrid
      columns={3}
      w="100%"
      h="calc(100vh - 190px)"
      overflowY="auto"
      spacing={1}
      pb={4}
    >
      {pokemonsToViewList.map(pokemon =>
        viewType === 'list' ? (
          <ListCard pokemon={pokemon} />
        ) : (
          <GaleryCard pokemon={pokemon} />
        )
      )}
    </SimpleGrid>
  );
};
