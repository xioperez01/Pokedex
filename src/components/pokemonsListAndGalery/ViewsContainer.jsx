import { SimpleGrid } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { handlePokemonSelected } from '../../reducer/slices/pokemonSelectedSlice';
import { addPokemonsToView } from '../../reducer/slices/pokemonsToViewSlice';
import { ListCard } from './ListCard';

export const ViewsContainer = () => {
  const { pokemonsToViewList } = useSelector(state => state.pokemonsToView);

  const { allPokemonsList } = useSelector(state => state.allPokemons);
  const dispatch = useDispatch();

  const pokemonsPerView = 15;

  const handleNext = () => {
    dispatch(
      addPokemonsToView(
        allPokemonsList?.slice(
          pokemonsToViewList?.length,
          pokemonsToViewList?.length + pokemonsPerView
        )
      )
    );
  };

  return (
    <SimpleGrid
      columns={3}
      w="100%"
      h="calc(100vh - 190px)"
      overflowY="auto"
      spacing={1}
      pb={4}
    >
      {pokemonsToViewList.map(pokemon => (
        <ListCard pokemon={pokemon} />
      ))}
    </SimpleGrid>
  );
};
