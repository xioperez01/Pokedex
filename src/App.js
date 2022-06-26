import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { MainView } from './components/MainView';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainView />
    </ChakraProvider>
  );
}

export default App;
