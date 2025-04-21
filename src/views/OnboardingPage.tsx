import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Divider,
} from '@chakra-ui/react';
import OnboardingForm from '../components/OnboardingForm';
import CSVUploader from '../components/CSVUploader';
import CSVPreview from '../components/CSVPreview';

const Onboarding = () => {
  const [partnerName, setPartnerName] = useState('');
  const [partnerFile, setPartnerFile] = useState([]);
  const [setCategoryFile] = useState([]);
  const [isMappingEnabled, setIsMappingEnabled] = useState(false);

  return (
    <Container maxW='container.md' py={10}>
      <VStack spacing={6} align='stretch'>
        <Heading as='h2' size='lg' textAlign='center'>
          Partner Onboarding
        </Heading>

        {/* Partner Name Input */}
        <FormControl isRequired>
          <FormLabel>Partner Name</FormLabel>
          <Input
            placeholder='Enter Partner Name'
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
          />
        </FormControl>

        <Divider />

        {/* Onboarding Questions */}
        <OnboardingForm />

        <Divider />

        {/* Partner File Upload */}
        <Heading as='h3' size='md'>
          Upload Partner File
        </Heading>
        <CSVUploader
          onFileUpload={(data) => {
            setPartnerFile(data);
            setIsMappingEnabled(true);
          }}
        />

        {partnerFile.length > 0 && <CSVPreview data={partnerFile} />}

        {/* Field Mapping Section (Placeholder) */}
        {isMappingEnabled && (
          <Box p={4} borderWidth={1} borderRadius='lg'>
            <Heading as='h4' size='sm' mb={2}>
              Map Partner Fields
            </Heading>
            {/* Mapping UI to be implemented */}
            <Button colorScheme='blue' mt={2}>
              Start Mapping
            </Button>
          </Box>
        )}

        <Divider />

        {/* Partner Category File Upload */}
        <Heading as='h3' size='md'>
          Upload Partner Category File
        </Heading>
        <CSVUploader onFileUpload={setCategoryFile} />
      </VStack>
    </Container>
  );
};

export default Onboarding;
