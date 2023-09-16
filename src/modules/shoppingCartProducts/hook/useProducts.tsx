import { useAppDispatch } from "../../../hooks/useRedux";
import { http } from "../../../http/http";
import { Product, ProductList, ProductModel } from "../models/ProductModel";
import {
  loadProductById,
  loadProductList,
} from "../../../store/products/productSlice";
import useToast from "../../../hooks/useToast";
import { FormikValues } from "formik";
import { ProductByIdModel } from "../models/ProductByIdModel";

enum ProductsApiRoute {
  baseRoute = import.meta.env.VITE_API_PRODUCT_LIST_ROUTE,
}

interface IProps {
  shoppingCartId: string;
  validation: FormikValues;
  toggleModal: () => void;
  toggleDeleteModal: () => void;
}

const UseProducts = ({
  shoppingCartId,
  toggleModal,
  validation,
  toggleDeleteModal,
}: IProps) => {
  const dispatch = useAppDispatch();
  const { notifySuccess, notifyError } = useToast();

  const getAllProducts = () => {
    http
      .get(`${ProductsApiRoute.baseRoute.toString()}/${shoppingCartId}`)
      .then(({ data }: { data: ProductList }) => {
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
      .then(({ data }: { data: ProductByIdModel }) => {
        const product = new Product();
        product.id = data.id!;
        product.name = data.name;
        product.urgencyLevel = data.urgencyLevel;
        dispatch(loadProductById(product));
        toggleModal();
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
        toggleDeleteModal();
      })
      .catch((err) => {
        console.log(err);
        notifyError(err?.response?.message || "Ocorreu um erro");
      });
  };

  const exportToPdf = () => {
    http
      .get(
        `${ProductsApiRoute.baseRoute.toString()}/${shoppingCartId}/export-to-pdf`,
        {
          responseType: "blob",
        },
      )
      .then(({ data }: { data: Blob }) => {
        openPdfInNewTab(generatePdfUrl(generateBlob(data)));
      })
      .catch((err) => console.log(err));
  };

  const generateBlob = (data: Blob) => {
    return new Blob([data], { type: "application/pdf" });
  };

  const generatePdfUrl = (data: Blob) => {
    return URL.createObjectURL(generateBlob(data));
  };

  const openPdfInNewTab = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank");
  };

  return {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    removeProduct,
    exportToPdf,
  };
};

export default UseProducts;
