import { useEffect } from "react";
import useShoppingCart from "../../hook/useShoppingCart";
import { useAppSelector } from "../../../../hooks/useRedux";
import ShoppingCartListView from "./view";
import useShoppingCartModal from "../../hook/useShoppingCartModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ShoppingCartModel } from "../../models/ShoppingCartModel";
import { useDispatch } from "react-redux";
import { clearStates } from "../../../../store/shoppingCart/shoppingCartSlice";

const ShoppingCartList = () => {
  const dispatch = useDispatch();
  const { isModalOpen, toggleModal } = useShoppingCartModal();
  const { shoppingCarts, shoppingCartById } = useAppSelector(
    (state) => state.shoppingCart,
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: shoppingCartById ? shoppingCartById.name : "",
      description: shoppingCartById ? shoppingCartById.description : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("O campo é obrigatório"),
      description: Yup.string().nullable(),
    }),
    onSubmit: (values) => {
      const valuesToSubmit: ShoppingCartModel = {
        name: values.name,
        description: values.description,
      };

      if (shoppingCartById) {
        updateShoppingCart(shoppingCartById.id!, valuesToSubmit);
      } else {
        createShoppingCart(valuesToSubmit);
      }
    },
  });

  const {
    getShoppingCarts,
    createShoppingCart,
    deleteShoppingCart,
    getShoppingCartById,
    updateShoppingCart,
  } = useShoppingCart({
    validation,
    toggleModal,
  });

  useEffect(() => {
    getShoppingCarts();

    return () => {
      dispatch(clearStates());
    };
  }, []);

  return (
    <ShoppingCartListView
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
      shoppingCarts={shoppingCarts}
      validation={validation}
      deleteShoppingCart={deleteShoppingCart}
      getShoppingCartById={getShoppingCartById}
    />
  );
};

export default ShoppingCartList;
