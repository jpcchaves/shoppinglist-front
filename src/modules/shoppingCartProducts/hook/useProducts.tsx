import { FormikValues } from "formik";
import { useAppDispatch } from "../../../hooks/useRedux";
import useToast from "../../../hooks/useToast";
import { http } from "../../../http/http";
import {
  loadProductById,
  loadProductList,
} from "../../../store/products/productSlice";
import { ProductByIdModel } from "../models/ProductByIdModel";
import {
  ProductList,
  ProductModel,
  setUrgencyLevel,
} from "../models/ProductModel";

enum ProductsApiRoute {
  baseRoute = import.meta.env.VITE_API_PRODUCT_LIST_ROUTE,
  baseRouteV2 = import.meta.env.VITE_API_PRODUCT_LIST_ROUTE_V2,
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
      .get(`${ProductsApiRoute.baseRouteV2.toString()}/${shoppingCartId}`)
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
        const urgencyLevel = setUrgencyLevel(data.urgencyLevel);
        const product = {
          id: data.id!,
          name: data.name,
          urgencyLevel,
          productPrice: data.productPrice,
          productQuantity: data.productQuantity,
        };
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
      .catch((err) => {
        notifyError(
          "Que pena! Houve um erro ao gerar o PDF. Por favor, tente novamente mais tarde ou contate o suporte",
        );
        console.log(err.message);
      });
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
