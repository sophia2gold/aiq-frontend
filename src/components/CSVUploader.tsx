import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa, { ParseResult } from 'papaparse';
import {
  Box,
  Text,
  Icon,
  VStack,
  Flex,
  useColorModeValue,
  Progress,
  Badge,
} from '@chakra-ui/react';
import { FiUploadCloud, FiCheckCircle } from 'react-icons/fi';

type CSVRow = Record<string, string>;

interface CSVUploaderProps {
  onFileUpload: (data: CSVRow[]) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPartnerCategory, setIsPartnerCategory] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      setProgress(10);
      setUploadComplete(false);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (!event.target || typeof event.target.result !== 'string') return;

        setProgress(50);

        const csv: ParseResult<CSVRow> = Papa.parse<CSVRow>(
          event.target.result,
          {
            header: true,
            skipEmptyLines: true,
          }
        );

        const isPartnerFile = csv.data.some((row) =>
          Object.keys(row).some((key) =>
            key.toLowerCase().includes('partner_category')
          )
        );

        setIsPartnerCategory(isPartnerFile);
        setProgress(80);
        setTimeout(() => {
          onFileUpload(csv.data);
          setProgress(100);
          setUploadComplete(true);
        }, 500);
      };

      reader.readAsText(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
  });

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColorDefault = useColorModeValue('gray.300', 'gray.500');
  const borderColor = isDragActive ? 'blue.400' : borderColorDefault;

  return (
    <Box
      {...getRootProps()}
      border='2px dashed'
      borderColor={borderColor}
      bg={bgColor}
      borderRadius='lg'
      p={6}
      textAlign='center'
      cursor='pointer'
      transition='background 0.3s ease'
      _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
      boxShadow='md'
    >
      <input {...getInputProps()} />
      <VStack spacing={4}>
        <Flex direction='column' align='center'>
          <Icon as={FiUploadCloud} boxSize={10} color='blue.500' />
          <Text fontSize='lg' fontWeight='bold' color='gray.700'>
            {isDragActive ? 'Drop it here!' : 'Drag & drop your CSV file here'}
          </Text>
          <Text fontSize='sm' color='gray.500'>
            or click to browse
          </Text>
        </Flex>

        {fileName && (
          <Box
            mt={2}
            p={2}
            bg='gray.200'
            borderRadius='md'
            fontSize='sm'
            color='gray.700'
          >
            📂 {fileName}
          </Box>
        )}

        {progress > 0 && (
          <Box width='100%' mt={2}>
            <Progress value={progress} size='sm' colorScheme='blue' />
            {uploadComplete && (
              <Flex mt={2} align='center' justify='center'>
                <Icon as={FiCheckCircle} color='green.500' mr={1} />
                <Text fontSize='sm' fontWeight='bold' color='green.600'>
                  Upload Complete!
                </Text>
              </Flex>
            )}
          </Box>
        )}

        {fileName && (
          <Badge mt={2} colorScheme={isPartnerCategory ? 'green' : 'red'}>
            {isPartnerCategory
              ? 'Partner Category CSV ✅'
              : 'Not a Partner Category File ❌'}
          </Badge>
        )}
      </VStack>
    </Box>
  );
};

export default CSVUploader;
