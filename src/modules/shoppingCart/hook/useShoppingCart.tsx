import { http } from "../../../http/http";
import { ShoppingCartModel } from "../models/ShoppingCartModel";
import { useAppDispatch } from "../../../hooks/useRedux";
import {
  loadShoppingCartById,
  loadShoppingCarts,
} from "../../../store/shoppingCart/shoppingCartSlice";
import useToast from "../../../hooks/useToast";
import { FormikValues } from "formik";
import { useContext } from "react";
import { ModalDeleteContext } from "../../../contexts/modalDelete/context/ModalDeleteContext";

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

  const { toggleDeleteModal } = useContext(ModalDeleteContext);

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
        toggleModal();
        getShoppingCarts();
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
        validation.resetForm();
        getShoppingCarts();
        notifySuccess("Lista de compras criada com sucesso!");
        toggleModal();
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
        toggleDeleteModal();
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
