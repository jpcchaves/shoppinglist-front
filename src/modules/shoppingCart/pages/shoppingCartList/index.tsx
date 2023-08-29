import { Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { http } from "../../../../http/http";

interface IShoppingCart {
  id?: string;
  uuid?: string;
  name: string;
  productsAmount: string;
  createdAt: string;
}

const ShoppingCartList = () => {
  const [shoppingCarts, setShoppingCarts] = useState<IShoppingCart[] | null>(
    null
  );

  useEffect(() => {
    getShoppingCarts();
  }, []);

  const getShoppingCarts = async () => {
    await http
      .get("/api/v1/shopping-carts")
      .then(({ data }: { data: IShoppingCart[] }) => {
        setShoppingCarts(data);
      })
      .catch((err) => console.log(err));
  };

  const formalizeDate = (rawDate: string) => {
    return new Date(rawDate);
  }

  const formatDate = (date: Date) => {
    const options = { timeZone: 'America/Sao_Paulo' };
    return date.toLocaleDateString('pt-BR', options);
  }

  return (
    <SimpleGrid columns={4} gap={4} p={12}>
      {(shoppingCarts || []).map(({ id, name, productsAmount, createdAt }) => (
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
              <Button w={'full'} colorScheme="blue">
                Ver mais
              </Button>
              <span>

                <small>Criado em {(formatDate(formalizeDate(createdAt)))}</small>
              </span>
            </CardFooter>
          </Card>
        </>
      ))}
    </SimpleGrid>
  );
};

export default ShoppingCartList;
