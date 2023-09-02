import {
  Button,
  FormControl, FormLabel, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Textarea
} from "@chakra-ui/react";

const ShoppingCartFormModal = () => {
  return (
    <Modal
      isOpen={true}
      onClose={() => console.log("")}
    >
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Adicionar Nova Lista de Compras</ModalHeader>
        <ModalCloseButton/>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Dê um nome a sua lista</FormLabel>
            <Input/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Adicione uma descrição</FormLabel>
            <Textarea/>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3}>
            Salvar
          </Button>
          <Button onClick={() => console.log("")}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShoppingCartFormModal;