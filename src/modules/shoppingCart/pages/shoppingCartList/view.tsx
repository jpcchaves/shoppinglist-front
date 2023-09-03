import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDate } from "../../utils/dateUtils";
import { ShoppingCartModel } from "../../models/ShoppingCartModel";
import FloatButton from "../../components/floatButton";
import ShoppingCartFormModal from "../../components/shoppingCartFormModal";
import { FormikValues } from "formik";

import { BsThreeDotsVertical } from "react-icons/bs";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

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
        <Card key={id} size={"md"} variant={"filled"}>
          <CardHeader>
            <Flex gap={"4"}>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Box>
                  <Heading size="sm">{name}</Heading>
                </Box>
              </Flex>

              <Popover placement={"left-end"}>
                <PopoverTrigger>
                  <IconButton
                    variant="link"
                    colorScheme="gray"
                    aria-label="menu options"
                    icon={<BsThreeDotsVertical />}
                  />
                </PopoverTrigger>
                <PopoverContent zIndex={4} w={"fit-content"} textAlign={"left"}>
                  <PopoverHeader>
                    <Button
                      aria-label={"edit button"}
                      variant={"link"}
                      leftIcon={<EditIcon color={"green.300"} />}
                    >
                      Editar
                    </Button>
                  </PopoverHeader>
                  <PopoverHeader>
                    <Button
                      aria-label={"edit button"}
                      variant={"link"}
                      leftIcon={<DeleteIcon color={"red.300"} />}
                    >
                      Apagar
                    </Button>
                  </PopoverHeader>
                  <PopoverArrow />
                </PopoverContent>
              </Popover>
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
