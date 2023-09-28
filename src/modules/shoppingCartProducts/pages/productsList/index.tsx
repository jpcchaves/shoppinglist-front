import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { ModalDeleteContext } from "../../../../contexts/modalDelete/context/ModalDeleteContext";
import { useAppSelector } from "../../../../hooks/useRedux";
import useProducts from "../../hook/useProducts";
import { ProductModel } from "../../models/ProductModel";
import { UrgencyLevel } from "../../models/urgencyLevel";
import { removeCurrencyMask } from "../../utils/formatCurrency";
import ProductsListView from "./view";

const ProductsList = () => {
  const { shoppingCartId } = useParams();
  const { productById } = useAppSelector((state) => state.product);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const { toggleDeleteModal } = useContext(ModalDeleteContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productById ? productById.name : "",
      urgencyLevel: productById
        ? productById.urgencyLevel
        : UrgencyLevel.NORMAL,
      productPrice: productById ? String(productById.productPrice!) : "",
      productQuantity: productById ? productById.productQuantity : "1",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("O campo é obrigatório"),
      urgencyLevel: Yup.string().oneOf(Object.values(UrgencyLevel)),
      productPrice: Yup.string().required("O campo é obrigatório "),
      productQuantity: Yup.number()
        .min(1, "A quantidade deve ser maior ou igual a 1")
        .required("O campo é obrigatório"),
    }),
    onSubmit: (values) => {
      const valuesToSubmit: ProductModel = {
        name: values.name,
        urgencyLevel: values.urgencyLevel,
        shoppingCartId: shoppingCartId!,
        productPrice: removeCurrencyMask(values.productPrice!),
        productQuantity: values.productQuantity,
      };

      if (productById) {
        updateProduct(productById.id!, valuesToSubmit);
      } else {
        addProduct(valuesToSubmit);
      }
    },
  });

  const toggleProductModal = () => {
    setIsProductModalOpen((prevState) => !prevState);
  };

  const {
    getAllProducts,
    addProduct,
    getProductById,
    removeProduct,
    updateProduct,
    exportToPdf,
  } = useProducts({
    shoppingCartId: shoppingCartId ?? "",
    toggleModal: toggleProductModal,
    validation,
    toggleDeleteModal,
  });

  return (
    <ProductsListView
      isProductModalOpen={isProductModalOpen}
      toggleProductModal={toggleProductModal}
      validation={validation}
      handleEdit={getProductById}
      handleDelete={removeProduct}
      toggleDeleteModal={toggleDeleteModal}
      exportToPdf={exportToPdf}
    />
  );
};

export default ProductsList;
