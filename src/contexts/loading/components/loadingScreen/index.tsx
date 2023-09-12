import { Box, Center, Spinner } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Box
      bgColor={"blackAlpha.300"}
      position={"fixed"}
      width={"100vw"}
      height={"100vh"}
      zIndex={999}
    >
      <Center width={"100%"} height={"100%"}>
        <Spinner
          color={"blue.300"}
          size={"xl"}
          thickness={"6px"}
          cursor={"pointer"}
        />
      </Center>
    </Box>
  );
};

export default LoadingScreen;
