import "./styles/style.css";
import { useAppSelector } from "../../../../hooks/useRedux";
import {
  Box,
  Button,
  Heading,
  IconButton,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import FloatButton from "../../../../components/floatButton";
import GoBackButton from "../../../../components/goBackButton";
import { useNavigate } from "react-router-dom";
import { FormikValues } from "formik";
import ProductModalForm from "../../components/productModalForm";
import ModalDelete from "../../../../components/modalDelete";
import { useState } from "react";
import { BiFileBlank } from "react-icons/bi";

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
    <SimpleGrid pt={16} px={{ base: "8", md: "16", lg: "32", xl: "48" }}>
      <ProductModalForm
        toggleModal={toggleProductModal}
        isModalOpen={isProductModalOpen}
        validation={validation}
      />

      <ModalDelete id={selectedId!} handleDelete={handleDelete} />
      <Heading textAlign={"center"} pb={8}>
        Produtos da Lista
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign={"center"}>Produtos</Th>
              <Th textAlign={"center"}>Nível de Urgência</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {(productList || []).map(({ id, name, urgencyLevel }) => (
              <>
                <Tr key={id} className={"actions-hidden-container"}>
                  <Td textAlign={"center"}>{name}</Td>
                  <Td textAlign={"center"}>{urgencyLevel}</Td>
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
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <FloatButton
        handleClick={toggleProductModal}
        aria-label={"float button"}
      />

      <Tooltip
        label={"Não é possível gerar o PDF a partir de uma lista vazia"}
        isDisabled={!(productList?.length <= 0)}
      >
        <Button
          aria-label={"icon button exportToPdf"}
          position={"fixed"}
          right={"24"}
          top={"12"}
          size={"sm"}
          onClick={() => exportToPdf()}
          leftIcon={<BiFileBlank size={16} />}
          isDisabled={productList?.length <= 0}
        >
          Gerar PDF
        </Button>
      </Tooltip>

      <GoBackButton
        handleClick={() => navigate("/")}
        aria-label={"go back button"}
      />
    </SimpleGrid>
  );
};

export default ProductsListView;
