import { useToast } from "@chakra-ui/react";

const UseToast = () => {
  const toast = useToast();

  const notifySuccess = (title: string) => {
    toast({
      title: title,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const notifyError = (title: string) => {
    toast({
      title: title,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return { notifySuccess, notifyError };
};

export default UseToast;
