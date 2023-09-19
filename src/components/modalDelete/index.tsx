import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ModalDeleteContext } from "../../contexts/modalDelete/context/ModalDeleteContext";
import TrashAnimation from "../../assets/animation/trashcam.json";
import Lottie from "react-lottie";

interface IProps {
  id: string;
  handleDelete: (id: string) => void;
  message?: string;
}

const ModalDelete = ({
  id,
  handleDelete,
  message = "Atenção! O item será removido permanentemente, deseja continuar?",
}: IProps) => {
  const { isModalDeleteOpen, toggleDeleteModal } =
    useContext(ModalDeleteContext);

  return (
    <Modal
      isCentered={true}
      isOpen={isModalDeleteOpen}
      onClose={() => toggleDeleteModal()}
      size={"sm"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atenção!</ModalHeader>
        <ModalCloseButton />
        <Lottie width={"300px"} options={{ animationData: TrashAnimation }} />
        <ModalBody pb={6}>
          <Text textAlign={"center"}>{message}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={() => handleDelete(id)}>
            Apagar
          </Button>
          <Button onClick={toggleDeleteModal}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
