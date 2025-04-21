import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

interface FullCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Record<string, string>[];
}

const FullCSVModal: React.FC<FullCSVModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!data || data.length === 0) {
    return null; // Don't render anything if data is missing
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Full CSV Preview</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box maxH='60vh' overflowY='auto'>
            <TableContainer>
              <Table variant='striped' size='sm'>
                <Thead>
                  <Tr>
                    {data.length > 0 &&
                      Object.keys(data[0] || {}).map((key, index) => (
                        <Th key={index}>{key}</Th>
                      ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((row, rowIndex) => (
                    <Tr key={rowIndex}>
                      {Object.values(row || {}).map((value, colIndex) => (
                        <Td key={colIndex}>{value}</Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FullCSVModal;
