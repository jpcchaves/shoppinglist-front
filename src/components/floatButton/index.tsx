import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../../hooks/useRedux";
import { clearShoppingCartById } from "../../store/shoppingCart/shoppingCartSlice";
import { clearProduct } from "../../store/products/productSlice";

interface IProps extends IconButtonProps {
  handleClick: () => void;
}

const FloatButton = ({ handleClick, ...rest }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      {...rest}
      variant="outline"
      colorScheme="blue"
      fontSize="20px"
      position={"fixed"}
      right={"12"}
      bottom={"12"}
      icon={<AddIcon />}
      borderRadius={"full"}
      size="lg"
      onClick={() => {
        handleClick();
        dispatch(clearShoppingCartById());
        dispatch(clearProduct());
      }}
    />
  );
};

export default FloatButton;
