import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props) => ({
    body: {
      minH: "100%",
      bg: mode("#FBFBFC", "bg.900")(props),
      fontFamily: `'Poppins', sans-serif`,
    },
    html: {
      minH: "100%",
      scrollBehavior: "smooth",
    },
  }),
};
