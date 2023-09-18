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
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { FormikValues } from "formik";
import { FormEvent } from "react";
import { radioButtons } from "../../utils/radioButtonsData";

interface IProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  validation: FormikValues;
}

const ProductModalForm = ({ isModalOpen, toggleModal, validation }: IProps) => {
  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal} size={"xl"}>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          validation.handleSubmit(e);
          return false;
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              isInvalid={!!(validation.errors.name && validation.touched.name)}
            >
              <FormLabel>Nome</FormLabel>
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

            <RadioGroup pt={"4"} value={validation.values.urgencyLevel}>
              <Stack spacing={5} direction={{ sm: "row", base: "column" }}>
                {radioButtons.map(({ id, value, label, color }) => (
                  <Radio
                    key={id}
                    colorScheme={color}
                    onChange={validation.handleChange}
                    value={value}
                    name="urgencyLevel"
                  >
                    {label}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
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

export default ProductModalForm;
