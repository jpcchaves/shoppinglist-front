import {useEffect} from "react";
import useShoppingCart from "../../hook/useShoppingCart";
import {useAppSelector} from "../../../../hooks/useRedux";
import ShoppingCartListView from "./view";

const ShoppingCartList = () => {
  const {getShoppingCarts} = useShoppingCart();
  const {shoppingCarts} = useAppSelector(state => state.shoppingCart);

  useEffect(() => {
    getShoppingCarts();
  }, [getShoppingCarts]);


  return <ShoppingCartListView shoppingCarts={shoppingCarts}/>
};

export default ShoppingCartList;
