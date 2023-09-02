import {Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import {formalizeDate, formatDate} from "../../utils/dateUtils";
import {ShoppingCartModel} from "../../models/ShoppingCartModel";
import FloatButton from "../../components/floatButton";

interface IProps {
  shoppingCarts: ShoppingCartModel[]
}

const ShoppingCartListView = ({shoppingCarts}: IProps) => {
  return (
    <SimpleGrid columns={{sm: 1, md: 2, lg: 3}} gap={4} p={12}>
      {(shoppingCarts || []).map(({id, name, productsAmount, createdAt}) => (
        <>
          <Card key={id} size={'md'}>
            <CardHeader>
              <Heading size='md'>{name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{name}</Text>
              <Text>Produtos: {productsAmount}</Text>
            </CardBody>
            <CardFooter>
              <VStack w={'full'}>
                <Button w={'full'} colorScheme="blue">
                  Ver mais
                </Button>
                <Text w={'full'} textAlign={'end'} fontSize='x-small' fontStyle={'italic'} color={'whiteAlpha.500'}>
                  Criado em {(formatDate(formalizeDate(createdAt)))}
                </Text>
              </VStack>
            </CardFooter>
          </Card>
        </>
      ))}

      <FloatButton aria-label={'float button'}/>
    </SimpleGrid>
  );
};

export default ShoppingCartListView;
