import { Box } from "@chakra-ui/react";
import ViteIcon from "@app/icons/ViteIcon";

const LoadingGlobal = () => {
  return (
    <Box
      mx="auto"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ViteIcon />
    </Box>
  );
};

export default LoadingGlobal;
