import { http } from "../../../http/http";
import { ShoppingCartModel } from "../models/ShoppingCartModel";
import { useAppDispatch } from "../../../hooks/useRedux";
import {
  clearShoppingCartById,
  loadShoppingCartById,
  loadShoppingCarts,
} from "../../../store/shoppingCart/shoppingCartSlice";
import useToast from "../../../hooks/useToast";
import { FormikValues } from "formik";

interface IProps {
  validation: FormikValues;
  toggleModal: () => void;
}

enum ShoppingCartApiRoute {
  baseRoute = import.meta.env.VITE_API_SHOPPING_LIST_ROUTE,
}

const UseShoppingCart = ({ validation, toggleModal }: IProps) => {
  const dispatch = useAppDispatch();
  const { notifySuccess, notifyError } = useToast();

  const resetForm = (): void => {
    dispatch(clearShoppingCartById());
    validation.resetForm();
  };

  const getShoppingCarts = () => {
    http
      .get(ShoppingCartApiRoute.baseRoute.toString())
      .then(({ data }: { data: ShoppingCartModel[] }) => {
        dispatch(loadShoppingCarts(data));
      })
      .catch((err) => console.log(err));
  };

  const getShoppingCartById = (id: string) => {
    http
      .get(`${ShoppingCartApiRoute.baseRoute.toString()}/${id}`)
      .then(({ data }: { data: ShoppingCartModel }) => {
        dispatch(loadShoppingCartById(data));
        toggleModal();
      })
      .catch((err) => console.log(err));
  };

  const updateShoppingCart = (id: string, data: ShoppingCartModel) => {
    http
      .put(`${ShoppingCartApiRoute.baseRoute.toString()}/${id}`, data)
      .then(() => {
        resetForm();
        getShoppingCarts();
        toggleModal();
        notifySuccess("Lista de compras atualizada com sucesso!");
      })
      .catch((err) => {
        console.log(err);

        notifyError(
          err?.response?.message ||
            "Ocorreu um erro ao editar a lista de compras",
        );
      });
  };

  const createShoppingCart = (data: ShoppingCartModel) => {
    http
      .post(ShoppingCartApiRoute.baseRoute.toString(), data)
      .then(() => {
        getShoppingCarts();
        notifySuccess("Lista de compras criada com sucesso!");
        toggleModal();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
        notifyError(
          err?.response?.message ||
            "Ocorreu um erro ao criar a lista de compras",
        );
      });
  };

  const deleteShoppingCart = (id: string) => {
    http
      .delete(`${ShoppingCartApiRoute.baseRoute.toString()}/${id}`)
      .then(() => {
        getShoppingCarts();
        notifySuccess("Lista de compras deletada com sucesso");
      })
      .catch((err) => {
        console.log(err);
        notifyError(
          err?.response?.message ||
            "Ocorreu um erro ao deletar a lista de compras",
        );
      });
  };

  return {
    getShoppingCarts,
    createShoppingCart,
    deleteShoppingCart,
    getShoppingCartById,
    updateShoppingCart,
  };
};

export default UseShoppingCart;
