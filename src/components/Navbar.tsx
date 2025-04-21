import { Link } from 'react-router-dom';
import { Flex, Button, Spacer } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex p={4} bg='gray.100' boxShadow='sm'>
      <Button as={Link} to='/' colorScheme='blue' variant='ghost'>
        Home
      </Button>
      <Button as={Link} to='/onboarding' colorScheme='blue' variant='ghost'>
        Onboarding
      </Button>
      <Spacer />
    </Flex>
  );
};

export default Navbar;
