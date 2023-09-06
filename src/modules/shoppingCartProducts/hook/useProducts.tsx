import { useAppDispatch } from "../../../hooks/useRedux";
import { http } from "../../../http/http";
import { ProductModel } from "../models/ProductModel";
import { loadProductList } from "../../../store/products/productSlice";

enum ProductsApiRoute {
  baseRoute = import.meta.env.VITE_API_PRODUCT_LIST_ROUTE,
}

interface IProps {
  shoppingCartId: string;
}

const UseProducts = ({ shoppingCartId }: IProps) => {
  const dispatch = useAppDispatch();

  const getAllProducts = () => {
    http
      .get(`${ProductsApiRoute.baseRoute.toString()}/${shoppingCartId}`)
      .then(({ data }: { data: ProductModel[] }) => {
        dispatch(loadProductList(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { getAllProducts };
};

export default UseProducts;
