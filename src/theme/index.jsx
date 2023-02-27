import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { overrides } from "./overrides";

const theme = extendTheme(overrides);

export const Theme = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

Theme.propTypes = {
  children: PropTypes.node,
};
