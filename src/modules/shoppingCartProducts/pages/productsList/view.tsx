import { useAppSelector } from "../../../../hooks/useRedux";
import {
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
import FloatButton from "../../../shoppingCart/components/floatButton";

const ProductsListView = () => {
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
              <Tr key={id}>
                <Td textAlign={"center"}>{name}</Td>
                <Td textAlign={"center"}>{urgencyLevel}</Td>
                <Td textAlign={"end"}>
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
    </SimpleGrid>
  );
};

export default ProductsListView;
