import ProductsListView from "./view";
import useProducts from "../../hook/useProducts";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductModel } from "../../models/ProductModel";
import { UrgencyLevel } from "../../models/urgencyLevel";
import { useAppSelector } from "../../../../hooks/useRedux";
import { ModalDeleteContext } from "../../../../contexts/modalDelete/context/ModalDeleteContext";

const ProductsList = () => {
  const { shoppingCartId } = useParams();
  const { productById } = useAppSelector((state) => state.product);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const { toggleDeleteModal } = useContext(ModalDeleteContext);

  const toggleProductModal = () => {
    setIsProductModalOpen((prevState) => !prevState);
  };

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

      if (productById) {
        updateProduct(productById.id!, valuesToSubmit);
      } else {
        addProduct(valuesToSubmit);
      }
    },
  });

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
