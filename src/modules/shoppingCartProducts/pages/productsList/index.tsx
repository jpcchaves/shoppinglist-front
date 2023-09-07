import ProductsListView from "./view";
import useProducts from "../../hook/useProducts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductModel } from "../../models/ProductModel";
import { UrgencyLevel } from "../../models/urgencyLevel";

const ProductsList = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const toggleProductModal = () => {
    setIsProductModalOpen((prevState) => !prevState);
  };

  const { shoppingCartId } = useParams();
  const { getAllProducts, addProduct } = useProducts({
    shoppingCartId: shoppingCartId ?? "",
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      urgencyLevel: UrgencyLevel.NORMAL,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("O campo é obrigatório "),
      urgencyLevel: Yup.string().oneOf(Object.values(UrgencyLevel)),
    }),
    onSubmit: (values) => {
      const valuesToSubmit: ProductModel = {
        name: values.name,
        urgencyLevel: values.urgencyLevel,
        shoppingCartId: shoppingCartId!,
      };

      addProduct(valuesToSubmit);
    },
  });

  console.log(validation.errors, validation.values.urgencyLevel);

  return (
    <ProductsListView
      isProductModalOpen={isProductModalOpen}
      toggleProductModal={toggleProductModal}
      validation={validation}
    />
  );
};

export default ProductsList;
