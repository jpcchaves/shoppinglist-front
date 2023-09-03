import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { FormikValues } from "formik";
import { FormEvent } from "react";

interface IProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  validation: FormikValues;
}

const ShoppingCartFormModal = ({
  isModalOpen,
  toggleModal,
  validation,
}: IProps) => {
  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal}>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          validation.handleSubmit(e);
          return false;
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Nova Lista de Compras</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              isInvalid={!!(validation.errors.name && validation.touched.name)}
            >
              <FormLabel>Dê um nome a sua lista</FormLabel>
              <Input
                name="name"
                onChange={validation.handleChange}
                value={validation.values.name}
                onBlur={validation.handleBlur}
              />
              {validation.errors.name && validation.touched.name ? (
                <FormErrorMessage>{validation.errors.name}</FormErrorMessage>
              ) : null}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Adicione uma descrição</FormLabel>
              <Textarea />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Salvar
            </Button>
            <Button onClick={toggleModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ShoppingCartFormModal;
