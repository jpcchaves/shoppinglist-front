import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDate } from "../../utils/dateUtils";
import { ShoppingCartModel } from "../../models/ShoppingCartModel";
import FloatButton from "../../components/floatButton";
import ShoppingCartFormModal from "../../components/shoppingCartFormModal";
import { FormikValues } from "formik";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import PopoverOptions from "../../components/popoverOptions";

interface IProps {
  shoppingCarts: ShoppingCartModel[];
  isModalOpen: boolean;
  toggleModal: () => void;
  validation: FormikValues;
  deleteShoppingCart: (shoppingCartId: string) => void;
}

const ShoppingCartListView = ({
  shoppingCarts,
  toggleModal,
  isModalOpen,
  validation,
  deleteShoppingCart,
}: IProps) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={4} p={12}>
      <ShoppingCartFormModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        validation={validation}
      />

      {(shoppingCarts || []).map(({ id, name, productsAmount, createdAt }) => (
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
                  },
                  {
                    title: "Deletar",
                    icon: <DeleteIcon color={"red.300"} />,
                    shoppingCartId: id!,
                    handleClick: deleteShoppingCart,
                  },
                ]}
              />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>{name}</Text>
            <Text>Produtos: {productsAmount}</Text>
          </CardBody>
          <CardFooter>
            <VStack w={"full"}>
              <Button w={"full"} colorScheme="blue">
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
      ))}

      <FloatButton handleClick={toggleModal} aria-label={"float button"} />
    </SimpleGrid>
  );
};

export default ShoppingCartListView;
