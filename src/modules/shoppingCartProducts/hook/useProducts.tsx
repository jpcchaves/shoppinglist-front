import { useAppDispatch } from "../../../hooks/useRedux";
import { http } from "../../../http/http";
import { ProductModel } from "../models/ProductModel";
import {
  loadProductById,
  loadProductList,
} from "../../../store/products/productSlice";
import useToast from "../../../hooks/useToast";
import { FormikValues } from "formik";

enum ProductsApiRoute {
  baseRoute = import.meta.env.VITE_API_PRODUCT_LIST_ROUTE,
}

interface IProps {
  shoppingCartId: string;
  validation: FormikValues;
  toggleModal: () => void;
}

const UseProducts = ({ shoppingCartId, toggleModal, validation }: IProps) => {
  const dispatch = useAppDispatch();
  const { notifySuccess, notifyError } = useToast();

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

  const getProductById = (productId: string) => {
    http
      .get(
        `${ProductsApiRoute.baseRoute.toString()}/${shoppingCartId}/${productId}`,
      )
      .then(({ data }: { data: ProductModel }) => {
        dispatch(loadProductById(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProduct = (data: ProductModel) => {
    http
      .post(ProductsApiRoute.baseRoute.toString(), data)
      .then(() => {
        validation.resetForm();
        notifySuccess("Produto adicionado com sucesso!");
        getAllProducts();
        toggleModal();
      })
      .catch((err) => {
        console.log(err);
        notifyError(err?.response?.message || "Ocorreu um erro");
      });
  };

  const updateProduct = (productId: string, data: ProductModel) => {
    http
      .put(
        `${ProductsApiRoute.baseRoute.toString()}/${shoppingCartId}/${productId}`,
        data,
      )
      .then(() => {
        notifySuccess("Produto atualizado com sucesso!");
        getAllProducts();
        toggleModal();
      })
      .catch((err) => {
        console.log(err);
        notifyError(err?.response?.message || "Ocorreu um erro");
      });
  };

  const removeProduct = (productId: string) => {
    http
      .delete(
        `${ProductsApiRoute.baseRoute.toString()}/${shoppingCartId}/${productId}`,
      )
      .then(() => {
        notifySuccess("Produto removido com sucesso!");
        getAllProducts();
      })
      .catch((err) => {
        console.log(err);
        notifyError(err?.response?.message || "Ocorreu um erro");
      });
  };

  return {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    removeProduct,
  };
};

export default UseProducts;
