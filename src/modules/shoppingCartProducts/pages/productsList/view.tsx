import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FormikValues } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatButton from "../../../../components/floatButton";
import GoBackButton from "../../../../components/goBackButton";
import ModalDelete from "../../../../components/modalDelete";
import { useAppSelector } from "../../../../hooks/useRedux";
import ProductModalForm from "../../components/productModalForm";
import { formatCurrency } from "../../utils/formatCurrency";
import "./styles/style.css";
import ExportToPdfButton from "../../components/exportToPdfButton";

interface IProps {
  isProductModalOpen: boolean;
  toggleProductModal: () => void;
  toggleDeleteModal: () => void;
  validation: FormikValues;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  exportToPdf: () => void;
}

const ProductsListView = ({
  toggleProductModal,
  isProductModalOpen,
  toggleDeleteModal,
  validation,
  handleEdit,
  exportToPdf,
  handleDelete,
}: IProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { productList } = useAppSelector((state) => state.product);

  const handleOpenDeleteModal = () => {
    toggleDeleteModal();
  };

  return (
    <SimpleGrid
      pt={16}
      px={{ base: "8", md: "16", lg: "24", xl: "32" }}
      pb="32"
    >
      <ProductModalForm
        toggleModal={toggleProductModal}
        isModalOpen={isProductModalOpen}
        validation={validation}
      />

      <ModalDelete id={selectedId!} handleDelete={handleDelete} />
      <Heading textAlign={"center"} pb={8}>
        Produtos da Lista {productList?.shoppingCartName}
      </Heading>
      <TableContainer>
        {productList?.products?.length ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th textAlign={"center"}>Produtos</Th>
                <Th textAlign={"center"}>Nível de Urgência</Th>
                <Th textAlign={"center"}>Quantidade</Th>
                <Th textAlign={"center"}>Preço</Th>
                <Th textAlign={"center"}>Total</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {(productList.products || []).map(
                ({
                  id,
                  name,
                  urgencyLevel,
                  productPrice,
                  productQuantity,
                  totalPrice,
                }) => (
                  <React.Fragment key={id}>
                    <Tr className={"actions-hidden-container"}>
                      <Td textAlign={"center"}>{name}</Td>
                      <Td textAlign={"center"}>{urgencyLevel}</Td>
                      <Td textAlign={"center"}>{productQuantity}</Td>
                      <Td textAlign={"center"}>
                        {formatCurrency(productPrice)}
                      </Td>
                      <Td textAlign={"center"}>{formatCurrency(totalPrice)}</Td>
                      <Td textAlign={"end"} position={"relative"} px={"8"}>
                        <Box className={"actions-hidden"}>
                          <IconButton
                            variant="link"
                            aria-label={"action button"}
                            icon={<EditIcon />}
                            onClick={() => handleEdit(id!)}
                          />
                          <IconButton
                            variant="link"
                            aria-label={"action button"}
                            icon={<DeleteIcon />}
                            onClick={() => {
                              setSelectedId(id!);
                              handleOpenDeleteModal();
                            }}
                          />
                        </Box>
                      </Td>
                    </Tr>
                  </React.Fragment>
                ),
              )}
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td textAlign="center">Total:</Td>
                <Td textAlign={"center"}>
                  {formatCurrency(productList?.shoppingListTotalPrice)}
                </Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        ) : (
          <Heading size={"md"} textAlign={"center"} mt={12}>
            Ainda não há produtos cadastrados
          </Heading>
        )}
      </TableContainer>

      <FloatButton
        handleClick={toggleProductModal}
        aria-label={"float button"}
      />

      <ExportToPdfButton
        exportToPdf={exportToPdf}
        productsAmount={productList?.products?.length}
      />

      <GoBackButton
        handleClick={() => navigate("/")}
        aria-label={"go back button"}
      />
    </SimpleGrid>
  );
};

export default ProductsListView;
