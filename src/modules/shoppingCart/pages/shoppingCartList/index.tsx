import {useEffect} from "react";
import useShoppingCart from "../../hook/useShoppingCart";
import {useAppSelector} from "../../../../hooks/useRedux";
import ShoppingCartListView from "./view";
import useShoppingCartModal from "../../hook/useShoppingCartModal";

const ShoppingCartList = () => {
  const {getShoppingCarts} = useShoppingCart();
  const {isModalOpen, toggleModal} = useShoppingCartModal();
  const {shoppingCarts} = useAppSelector(state => state.shoppingCart);

  useEffect(() => {
    getShoppingCarts();
  }, []);


  return <ShoppingCartListView isModalOpen={isModalOpen}
                               toggleModal={toggleModal} shoppingCarts={shoppingCarts}/>
};

export default ShoppingCartList;
