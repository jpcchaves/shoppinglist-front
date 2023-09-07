import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface IProps extends IconButtonProps {
  handleClick: () => void;
}

const GoBackButton = ({ handleClick, ...rest }: IProps) => {
  return (
    <IconButton
      {...rest}
      variant="ghost"
      colorScheme="gray"
      fontSize="20px"
      position={"fixed"}
      right={"12"}
      top={"12"}
      icon={<ArrowBackIcon />}
      size="sm"
      onClick={() => {
        handleClick();
      }}
    />
  );
};

export default GoBackButton;
