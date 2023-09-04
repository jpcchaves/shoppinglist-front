import {
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ReactElement } from "react";

type IOption = {
  shoppingCartId: string;
  title: string;
  icon: ReactElement;
  handleClick?: (id: string) => void;
};

interface IProps {
  options: IOption[];
}

const PopoverOptions = ({ options }: IProps) => {
  return (
    <Popover placement={"left-start"}>
      <PopoverTrigger>
        <IconButton
          variant="link"
          colorScheme="gray"
          aria-label="menu options"
          icon={<BsThreeDotsVertical />}
        />
      </PopoverTrigger>
      <PopoverContent zIndex={4} w={"fit-content"} textAlign={"left"}>
        {(options || []).map(
          ({ title, icon, handleClick, shoppingCartId }, idx) => (
            <PopoverHeader key={idx}>
              <Button
                onClick={() =>
                  handleClick ? handleClick(shoppingCartId) : null
                }
                aria-label={"edit button"}
                variant={"link"}
                leftIcon={icon}
              >
                {title}
              </Button>
            </PopoverHeader>
          ),
        )}
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};

export default PopoverOptions;
