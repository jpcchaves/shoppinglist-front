import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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

interface IProps {
  shoppingCarts: ShoppingCartModel[];
  isModalOpen: boolean;
  toggleModal: () => void;
  validation: FormikValues;
}

const ShoppingCartListView = ({
  shoppingCarts,
  toggleModal,
  isModalOpen,
  validation,
}: IProps) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={4} p={12}>
      <ShoppingCartFormModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        validation={validation}
      />

      {(shoppingCarts || []).map(({ id, name, productsAmount, createdAt }) => (
        <>
          <Card key={id} size={"md"}>
            <CardHeader>
              <Heading size="md">{name}</Heading>
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
        </>
      ))}

      <FloatButton handleClick={toggleModal} aria-label={"float button"} />
    </SimpleGrid>
  );
};

export default ShoppingCartListView;
