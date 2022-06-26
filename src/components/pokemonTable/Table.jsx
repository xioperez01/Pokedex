import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  ButtonGroup,
  Box,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { handlePokemonSelected } from '../../reducer/slices/pokemonSelectedSlice';
import { addPokemonsToView } from '../../reducer/slices/pokemonsToViewSlice';

export const PokemonsTable = () => {
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
    <Box w="100%" h="calc(100vh - 82px)">
      <TableContainer
        id="tableTpm"
        w="100%"
        h="calc(100vh - 138px)"
        overflowY="auto"
        //onScroll={e => console.log(e)}
      >
        <Table variant="simple" borderWidth="1px">
          <Thead>
            <Tr>
              <Th>N.º</Th>
              <Th>name</Th>
              <Th>height(m)</Th>
              <Th>weight(kg)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pokemonsToViewList.map(pokemon => (
              <Tr
                key={pokemon.name}
                onClick={() => dispatch(handlePokemonSelected(pokemon))}
              >
                <Td>{pokemon.id}</Td>
                <Td>{pokemon.name}</Td>
                <Td>{pokemon.height / 10}</Td>
                <Td>{pokemon.weight / 10}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ButtonGroup
        w="100%"
        mt={4}
        justifyContent="space-between"
        variant="link"
      >
        <Button isDisabled={pokemonsToViewList?.length === pokemonsPerView}>
          Reset
        </Button>
        <Button
          onClick={handleNext}
          isDisabled={pokemonsToViewList?.length === allPokemonsList?.length}
        >
          Show More
        </Button>
      </ButtonGroup>
    </Box>
  );
};
