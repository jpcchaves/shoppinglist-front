import ProductsListView from "./view";
import useProducts from "../../hook/useProducts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductsList = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const toggleProductModal = () => {
    setIsProductModalOpen((prevState) => !prevState);
  };

  const { shoppingCartId } = useParams();
  const { getAllProducts } = useProducts({
    shoppingCartId: shoppingCartId ?? "",
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductsListView
      isProductModalOpen={isProductModalOpen}
      toggleProductModal={toggleProductModal}
    />
  );
};

export default ProductsList;
