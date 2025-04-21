import React from 'react';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

interface CSVPreviewProps {
  data: Record<string, string>[];
}

const CSVPreview: React.FC<CSVPreviewProps> = ({ data }) => {
  return (
    <Box w='100%' p={4} bg='gray.50' borderRadius='lg' boxShadow='sm'>
      <Text fontSize='md' fontWeight='bold' mb={2}>
        CSV Data Preview:
      </Text>

      <TableContainer>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              {Object.keys(data[0]).map((key, index) => (
                <Th key={index}>{key}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.slice(0, 3).map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <Td key={colIndex}>{value}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CSVPreview;
