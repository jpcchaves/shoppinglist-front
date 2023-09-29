import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  SimpleGrid,
} from "@chakra-ui/react";
import { FormikValues } from "formik";
import React, { useContext } from "react";
import FloatButton from "../../../../components/floatButton";
import ModalDelete from "../../../../components/modalDelete";
import { ModalDeleteContext } from "../../../../contexts/modalDelete/context/ModalDeleteContext";
import ShoppingCard from "../../components/shoppingCard";
import ShoppingCartFormModal from "../../components/shoppingCartFormModal";
import { ShoppingCartModel } from "../../models/ShoppingCartModel";

interface IProps {
  shoppingCarts: ShoppingCartModel[];
  isModalOpen: boolean;
  toggleModal: () => void;
  validation: FormikValues;
  deleteShoppingCart: (shoppingCartId: string) => void;
  getShoppingCartById: (shoppingCartId: string) => void;
  searchInput: string;
  handleSearchInput: (e: string) => void;
  filterShoppingCarts: (searchInput: string) => void;
  getShoppingCarts: () => void;
}

const ShoppingCartListView = ({
  shoppingCarts,
  toggleModal,
  isModalOpen,
  validation,
  deleteShoppingCart,
  getShoppingCartById,
  searchInput,
  handleSearchInput,
  filterShoppingCarts,
  getShoppingCarts,
}: IProps) => {
  const { toggleDeleteModal } = useContext(ModalDeleteContext);

  return (
    <SimpleGrid pt={16} px={{ base: "8" }} pb="32">
      <ShoppingCartFormModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        validation={validation}
      />
      <Heading textAlign={"center"} pb={8}>
        Listas de Compras
      </Heading>
      <Container mb={6}>
        <Heading size={"sm"} textAlign={"center"} mb={2}>
          Busque uma lista de compras pelo nome
        </Heading>
        <InputGroup>
          <InputLeftAddon>
            <SearchIcon />
          </InputLeftAddon>
          <Input
            value={searchInput}
            onChange={(e) => handleSearchInput(e.target.value)}
            type="text"
            name="name"
            isDisabled={!shoppingCarts?.length}
          />
          <InputRightAddon
            me={2}
            cursor={searchInput.length ? "pointer" : "not-allowed"}
            onClick={() => {
              if (searchInput.length) {
                handleSearchInput("");
                getShoppingCarts();
              } else {
                return;
              }
            }}
          >
            <CloseIcon />
          </InputRightAddon>
          <Button
            type="button"
            colorScheme={"blue"}
            isDisabled={!searchInput.length}
            onClick={() => filterShoppingCarts(searchInput)}
          >
            Buscar
          </Button>
        </InputGroup>
      </Container>
      {shoppingCarts?.length ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={4}>
          {(shoppingCarts || []).map(
            ({ id, name, description, productsAmount, createdAt }) => (
              <React.Fragment key={id}>
                <ModalDelete id={id!} handleDelete={deleteShoppingCart} />
                <ShoppingCard
                  createdAt={createdAt!}
                  id={id!}
                  name={name}
                  description={description!}
                  productsAmount={productsAmount!}
                  getShoppingCartById={getShoppingCartById}
                  toggleDeleteModal={toggleDeleteModal}
                />
              </React.Fragment>
            ),
          )}
        </SimpleGrid>
      ) : (
        <Heading size={"md"} textAlign={"center"} mt={6}>
          Ainda não há nenhuma lista de compras cadastrada
        </Heading>
      )}

      <FloatButton handleClick={toggleModal} aria-label={"float button"} />
    </SimpleGrid>
  );
};

export default ShoppingCartListView;
