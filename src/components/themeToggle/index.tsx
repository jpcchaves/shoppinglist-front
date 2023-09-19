import { Box, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position={"fixed"} right={"28"} bottom={"12"}>
      <IconButton
        borderRadius={"full"}
        size={"lg"}
        onClick={toggleColorMode}
        icon={
          colorMode === "dark" ? (
            <SunIcon color={"orange.300"} />
          ) : (
            <MoonIcon color={"blue.300"} />
          )
        }
        aria-label={"theme toggle"}
      />
    </Box>
  );
};

export default ThemeToggle;
