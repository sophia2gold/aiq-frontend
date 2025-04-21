import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
  VStack,
  HStack,
  Circle,
} from '@chakra-ui/react';

type FormDataType = {
  [key: string]: string;
};

type OnboardingFormProps = {
  onProgressUpdate: (progress: number) => void;
  onSubmitForm: (formData: FormDataType) => void;
};
const questions = [
  {
    label:
      'Does the partner have a technical document that specifies the requirements for making the taxonomy or is there a taxonomy template?',
    type: 'textarea',
    field: 'docOrTemplate',
  },
  {
    label:
      'Does the partner require the taxonomy to be delivered prior to the data files? If yes, what is the timeframe for segment review and setup?',
    type: 'input',
    field: 'taxonomyTimeframe',
  },
  {
    label:
      'For quarters where net new segments are not added, does a taxonomy still need to be delivered with the file delivery?',
    type: 'radio',
    field: 'taxonomyDelivery',
    options: ['yes', 'no'],
  },
  {
    label:
      'Does the platform have an expiration window for the segments (30, 60, 90)?',
    type: 'select',
    field: 'expirationWindow',
    options: ['30', '60', '90'],
  },
  {
    label: 'Does the platform have taxonomy file naming requirements?',
    type: 'textarea',
    field: 'namingRequirements',
  },
  {
    label: 'Does the partner have a support alias for taxonomy questions?',
    type: 'textarea',
    field: 'supportAlias',
  },
  {
    label:
      'Does the platform have category/vertical restrictions or segment limits?',
    type: 'textarea',
    field: 'restrictionsOrLimits',
  },
  {
    label: 'What are the taxonomy requirements/process for custom segments?',
    type: 'textarea',
    field: 'customSegments',
  },
  {
    label: 'If segments are to be removed, what does that process entail?',
    type: 'textarea',
    field: 'segmentRemoval',
  },
  {
    label:
      'If segments are to be changed (CPM, paths, definitions), what does that process entail?',
    type: 'textarea',
    field: 'segmentAlteration',
  },
];

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  onProgressUpdate,
  onSubmitForm,
}) => {
  const [formData, setFormData] = useState<FormDataType>({});
  const [step, setStep] = useState(0);

  const handleChange =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleNext = () => {
    const newStep = Math.min(step + 1, questions.length - 1);
    setStep(newStep);
    onProgressUpdate(((newStep + 1) / questions.length) * 100);
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitForm(formData);
  };

  return (
    <Box
      maxW='600px'
      mx='auto'
      p={4}
      borderWidth={1}
      borderRadius='lg'
      boxShadow='lg'
    >
      <HStack justifyContent='center' mb={4}>
        {questions.map((_, index) => (
          <Circle
            key={index}
            size={step === index ? '12px' : '8px'}
            bg={formData[questions[index].field] ? 'blue.500' : 'gray.300'}
            cursor={formData[questions[index].field] ? 'pointer' : 'default'}
            onClick={() => formData[questions[index].field] && setStep(index)}
            transition='all 0.2s ease-in-out'
          />
        ))}
      </HStack>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>{questions[step].label}</FormLabel>
            {questions[step].type === 'textarea' && (
              <Textarea
                value={formData[questions[step].field] || ''}
                onChange={handleChange(questions[step].field)}
              />
            )}
            {questions[step].type === 'input' && (
              <Input
                type='text'
                value={formData[questions[step].field] || ''}
                onChange={handleChange(questions[step].field)}
              />
            )}
            {questions[step].type === 'radio' && (
              <RadioGroup
                value={formData[questions[step].field] || ''}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    [questions[step].field]: value,
                  }))
                }
              >
                <Stack direction='row'>
                  {questions[step].options?.map((option) => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            )}
            {questions[step].type === 'select' && (
              <Select
                placeholder='Select an option'
                value={formData[questions[step].field] || ''}
                onChange={handleChange(questions[step].field)}
              >
                {questions[step].options?.map((option) => (
                  <option key={option} value={option}>
                    {option} days
                  </option>
                ))}
              </Select>
            )}
          </FormControl>
          <HStack justifyContent='space-between' w='full'>
            <Button onClick={handlePrev} isDisabled={step === 0}>
              Previous
            </Button>
            {step < questions.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button colorScheme='blue' type='submit'>
                Submit
              </Button>
            )}
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default OnboardingForm;
