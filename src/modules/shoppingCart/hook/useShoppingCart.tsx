import {http} from "../../../http/http";
import {ShoppingCartModel} from "../models/ShoppingCartModel";
import {useAppDispatch} from "../../../hooks/useRedux";
import {loadShoppingCarts} from "../../../store/shoppingCart/shoppingCartSlice";

const UseShoppingCart = () => {

  const dispatch = useAppDispatch();

  const getShoppingCarts = async () => {
    await http
      .get("/api/v1/shopping-carts")
      .then(({data}: { data: ShoppingCartModel[] }) => {
        dispatch(loadShoppingCarts(data));
      })
      .catch((err) => console.log(err));
  };

  return {getShoppingCarts}
};

export default UseShoppingCart;
