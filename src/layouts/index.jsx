import { Box } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";

const CoreLayout = ({
  children,
  spaceFooter = true,
  zIndexFooter,
  hiddenNavbar,
  maxW = "7xl",
  isFixedHeader = true,
}) => {
  return (
    <Box>
      <Header isFixed={isFixedHeader} maxW={maxW} hiddenNavbar={hiddenNavbar} />

      <Box pos="relative" top="80px">
        {children}
      </Box>

      <Footer maxW={maxW} zIndex={zIndexFooter} spaceFooter={spaceFooter} />
    </Box>
  );
};

export default CoreLayout;
