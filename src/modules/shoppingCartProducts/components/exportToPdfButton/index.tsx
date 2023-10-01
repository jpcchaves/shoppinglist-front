import { Button, Tooltip } from "@chakra-ui/react";
import { BiFileBlank } from "react-icons/bi";

interface IProps {
  productsAmount: number;
  exportToPdf: () => void;
}

export const ExportToPdfButton = ({ exportToPdf, productsAmount }: IProps) => {
  return (
    <Tooltip
      label={"Não é possível gerar o PDF a partir de uma lista vazia"}
      isDisabled={!(productsAmount <= 0)}
    >
      <Button
        aria-label={"icon button exportToPdf"}
        position={"fixed"}
        right={"24"}
        top={"12"}
        size={"sm"}
        onClick={() => exportToPdf()}
        leftIcon={<BiFileBlank size={16} />}
        isDisabled={productsAmount <= 0}
      >
        Gerar PDF
      </Button>
    </Tooltip>
  );
};

export default ExportToPdfButton;
