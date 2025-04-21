import { ChakraProvider, Container } from '@chakra-ui/react';
import AppRoutes from './routes';
import Navbar from './components/Navbar';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Container maxW='full' py={10}>
        <AppRoutes />
      </Container>
    </ChakraProvider>
  );
}

export default App;
