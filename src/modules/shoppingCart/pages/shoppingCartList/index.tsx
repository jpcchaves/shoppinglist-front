import { useEffect } from "react";
import useShoppingCart from "../../hook/useShoppingCart";
import { useAppSelector } from "../../../../hooks/useRedux";
import ShoppingCartListView from "./view";
import useShoppingCartModal from "../../hook/useShoppingCartModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ShoppingCartModel } from "../../models/ShoppingCartModel";

const ShoppingCartList = () => {
  const { isModalOpen, toggleModal } = useShoppingCartModal();
  const { shoppingCarts } = useAppSelector((state) => state.shoppingCart);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
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

      createShoppingCart(valuesToSubmit);
    },
  });

  const { getShoppingCarts, createShoppingCart } = useShoppingCart({
    validation,
    toggleModal,
  });

  useEffect(() => {
    getShoppingCarts();
  }, []);

  return (
    <ShoppingCartListView
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
      shoppingCarts={shoppingCarts}
      validation={validation}
    />
  );
};

export default ShoppingCartList;
