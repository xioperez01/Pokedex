import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Flex,
  Icon,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPokemons,
  togglePokemonsPerView,
  toggleViewType,
} from '../reducer/slices/allPokemonsSlice';
import { addPokemonsToView } from '../reducer/slices/pokemonsToViewSlice';
import { PokemonDetailCard } from './pokemonDetail/PokemonDetailCard';
import { ViewsContainer } from './pokemonsListAndGalery/ViewsContainer';
import { PokemonsTable } from './pokemonTable/Table';
import { BsFillGridFill, BsTable, BsList } from 'react-icons/bs';
import { handlePokemonSelected } from '../reducer/slices/pokemonSelectedSlice';

export const MainView = () => {
  const dispatch = useDispatch();
  const { allPokemonsList, isLoading, pokemonsPerView, viewType } = useSelector(
    state => state.allPokemons
  );
  const { pokemonsToViewList } = useSelector(state => state.pokemonsToView);
  const { pokemonSelected } = useSelector(state => state.pokemonSelected);

  useEffect(() => {
    if (!allPokemonsList) dispatch(fetchPokemons());

    if (pokemonsToViewList.length === 0 && allPokemonsList) {
      dispatch(
        addPokemonsToView(allPokemonsList.slice(0, pokemonsPerView), true)
      );
    }
  });

  const handleViewType = (newType, pokemonsPerView) => {
    dispatch(togglePokemonsPerView(pokemonsPerView));
    dispatch(toggleViewType(newType));
    dispatch(
      addPokemonsToView(
        allPokemonsList.slice(pokemonsToViewList.length, pokemonsPerView),
        false
      )
    );
  };

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

  const handlReset = () => {
    dispatch(handlePokemonSelected(undefined));
    dispatch(togglePokemonsPerView(15));
    dispatch(toggleViewType('table'));
    dispatch(
      addPokemonsToView(allPokemonsList.slice(0, pokemonsPerView), true)
    );
  };

  console.log(pokemonSelected);

  return (
    <VStack h="100vh" w="100vw" p={4} spacing={4}>
      <Box h="50px">
        <Heading>Bienvenido a la Pokedex</Heading>
      </Box>
      <Flex direction="row" w="100%" maxW="1200px">
        <Icon
          as={BsTable}
          boxSize={5}
          onClick={() => handleViewType('table', 15)}
          _hover={{ cursor: 'pointer' }}
          color={viewType === 'table' && 'purple'}
        />
        <Icon
          as={BsFillGridFill}
          boxSize={5}
          mx={4}
          onClick={() => handleViewType('grid', 30)}
          _hover={{ cursor: 'pointer' }}
          color={viewType === 'grid' && 'purple'}
        />

        <Icon
          as={BsList}
          boxSize={5}
          onClick={() => handleViewType('list', 45)}
          _hover={{ cursor: 'pointer' }}
          color={viewType === 'list' && 'purple'}
        />
      </Flex>

      {isLoading ? (
        <Text>...loading</Text>
      ) : (
        <HStack w="100%" maxW="1200px" h="calc(100vh - 174px)" spacing={4}>
          <Box w={pokemonSelected ? '60%' : '100%'} h="calc(100vh - 174px)">
            {pokemonsToViewList && viewType === 'table' ? (
              <PokemonsTable />
            ) : (
              <ViewsContainer />
            )}

            <ButtonGroup
              w="100%"
              mt={4}
              justifyContent="space-between"
              variant="link"
            >
              <Button onClick={handlReset}>Reset</Button>
              <Button
                onClick={handleNext}
                isDisabled={
                  pokemonsToViewList?.length === allPokemonsList?.length
                }
              >
                Show More
              </Button>
            </ButtonGroup>
          </Box>
          <Box w="40%" h="calc(100vh - 134px)">
            {pokemonSelected && <PokemonDetailCard />}
          </Box>
        </HStack>
      )}
    </VStack>
  );
};
