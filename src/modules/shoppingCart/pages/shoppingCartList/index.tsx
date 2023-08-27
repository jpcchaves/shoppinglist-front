import { useEffect, useState } from "react";
import { http } from "../../../../http/http";
import { Box, Heading } from "@chakra-ui/react";

interface IShoppingCart {
  id?: string;
  uuid?: string;
  name: string;
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

  return (
    <>
      {(shoppingCarts || []).map(({ id, uuid, createdAt, name }) => (
        <Box>
          <Heading>
            {name}, {id}, {uuid}, {createdAt}
          </Heading>
        </Box>
      ))}
    </>
  );
};

export default ShoppingCartList;
