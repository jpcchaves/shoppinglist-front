import "./styles/style.css";
import { useAppSelector } from "../../../../hooks/useRedux";
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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import FloatButton from "../../../../components/floatButton";
import GoBackButton from "../../../../components/goBackButton";
import { useNavigate } from "react-router-dom";

const ProductsListView = () => {
  const navigate = useNavigate();

  const { productList } = useAppSelector((state) => state.product);

  return (
    <SimpleGrid pt={16} px={{ base: "8", md: "16", lg: "32", xl: "48" }}>
      <Heading textAlign={"center"} pb={8}>
        Lista de Compras
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
              <Tr key={id} className={"actions-hidden-container"}>
                <Td textAlign={"center"}>{name}</Td>
                <Td textAlign={"center"}>{urgencyLevel}</Td>
                <Td textAlign={"end"} position={"relative"} px={"8"}>
                  <Box className={"actions-hidden"}>
                    <IconButton
                      variant="link"
                      aria-label={"action button"}
                      icon={<EditIcon />}
                    />
                    <IconButton
                      variant="link"
                      aria-label={"action button"}
                      icon={<DeleteIcon />}
                    />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <FloatButton
        handleClick={() => console.log("")}
        aria-label={"float button"}
      />

      <GoBackButton
        handleClick={() => navigate("/")}
        aria-label={"go back button"}
      />
    </SimpleGrid>
  );
};

export default ProductsListView;
