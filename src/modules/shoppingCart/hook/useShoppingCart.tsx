import { http } from "../../../http/http";
import { ShoppingCartModel } from "../models/ShoppingCartModel";
import { useAppDispatch } from "../../../hooks/useRedux";
import { loadShoppingCarts } from "../../../store/shoppingCart/shoppingCartSlice";
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

  return { getShoppingCarts, createShoppingCart, deleteShoppingCart };
};

export default UseShoppingCart;
