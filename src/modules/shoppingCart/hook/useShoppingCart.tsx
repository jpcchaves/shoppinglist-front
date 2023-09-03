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

const UseShoppingCart = ({ validation, toggleModal }: IProps) => {
  const dispatch = useAppDispatch();
  const { notifySuccess, notifyError } = useToast();

  const resetForm = (): void => {
    validation.resetForm();
  };

  const getShoppingCarts = () => {
    http
      .get("/api/v1/shopping-carts")
      .then(({ data }: { data: ShoppingCartModel[] }) => {
        dispatch(loadShoppingCarts(data));
      })
      .catch((err) => console.log(err));
  };

  const createShoppingCart = (data: ShoppingCartModel) => {
    http
      .post("/api/v1/shopping-carts", data)
      .then(() => {
        getShoppingCarts();
        notifySuccess("Lista de compras criada com sucesso!");
        toggleModal();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
        notifyError("Ocorreu um erro ao criar a lista de compras");
      });
  };

  return { getShoppingCarts, createShoppingCart };
};

export default UseShoppingCart;
