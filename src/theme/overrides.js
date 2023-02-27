import { layerStyles } from "./others/layer-styles";
import { textStyles } from "./others/text-styles";
import { styles } from "./styles";
import { fonts } from "./collects/font";
import { colors } from "./collects/color";
import { components } from "./components";
import { breakpoints } from "./breakpoints";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

export const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

export const overrides = {
  config,
  colors,
  styles,
  textStyles,
  layerStyles,
  fonts,
  breakpoints,
  components,
  shadows: { outline: "0 0 0 3px var(--chakra-colors-primary-500)" },
};
