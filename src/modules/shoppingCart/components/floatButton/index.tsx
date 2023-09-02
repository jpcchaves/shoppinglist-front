import {IconButton, IconButtonProps} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

interface IProps extends IconButtonProps {
}

const FloatButton = ({...rest}: IProps) => {
  return (
    <IconButton
      {...rest}
      variant='outline'
      colorScheme='blue'
      fontSize='20px'
      position={'fixed'}
      right={'12'}
      bottom={'12'}
      icon={<AddIcon/>}
      borderRadius={'full'}
      size='lg'
    />
  );
};

export default FloatButton;
