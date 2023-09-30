import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
import PopoverOptions from "../popoverOptions";
import { formatCurrency } from "../../../shoppingCartProducts/utils/formatCurrency";

interface IProps {
  id: string;
  name: string;
  description: string;
  productsAmount: string;
  createdAt: string;
  totalPrice: string;
  getShoppingCartById: (id: string) => void;
  toggleDeleteModal: () => void;
}

const ShoppingCard = ({
  id,
  name,
  createdAt,
  description,
  productsAmount,
  totalPrice,
  getShoppingCartById,
  toggleDeleteModal,
}: IProps) => {
  const navigate = useNavigate();

  return (
    <Card key={id} size={"md"} variant={"filled"}>
      <CardHeader>
        <Flex gap={"4"}>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size="sm">{name}</Heading>
            </Box>
          </Flex>
          <PopoverOptions
            options={[
              {
                title: "Editar",
                icon: <EditIcon color={"green.300"} />,
                shoppingCartId: id!,
                handleClick: getShoppingCartById,
              },
              {
                title: "Deletar",
                icon: <DeleteIcon color={"red.300"} />,
                shoppingCartId: id!,
                handleClick: toggleDeleteModal,
              },
            ]}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
        <Text>Produtos: {productsAmount}</Text>
        <Text>Total de produtos: {productsAmount}</Text>
        <Text>Valor total: {formatCurrency(totalPrice)}</Text>
      </CardBody>
      <CardFooter>
        <VStack w={"full"}>
          <Button
            onClick={() => navigate(`/${id}`)}
            type={"button"}
            w={"full"}
            colorScheme="blue"
          >
            Ver mais
          </Button>
          <Text
            w={"full"}
            textAlign={"end"}
            fontSize="x-small"
            fontStyle={"italic"}
            color={"whiteAlpha.500"}
          >
            Criado em {formatDate(createdAt!)}
          </Text>
        </VStack>
      </CardFooter>
    </Card>
  );
};

export default ShoppingCard;
