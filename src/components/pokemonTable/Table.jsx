import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { handlePokemonSelected } from '../../reducer/slices/pokemonSelectedSlice';

export const PokemonsTable = () => {
  const { pokemonsToViewList } = useSelector(state => state.pokemonsToView);

  const dispatch = useDispatch();

  return (
    <TableContainer
      id="tableTpm"
      w="100%"
      h="calc(100vh - 190px)"
      overflowY="auto"
      //onScroll={e => console.log(e)}
    >
      <Table variant="simple" borderWidth="1px">
        <Thead>
          <Tr>
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
              <Td>{pokemon.name}</Td>
              <Td>{pokemon.height / 10}</Td>
              <Td>{pokemon.weight / 10}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
