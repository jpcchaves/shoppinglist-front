import ProductsListView from "./view";
import useProducts from "../../hook/useProducts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ProductsList = () => {
  const { shoppingCartId } = useParams();
  const { getAllProducts } = useProducts({
    shoppingCartId: shoppingCartId ?? "",
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  return <ProductsListView />;
};

export default ProductsList;
