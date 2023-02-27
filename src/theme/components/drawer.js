export const Drawer = {
  variants: {
    alwaysOpen: {
      dialog: {
        pointerEvents: "auto",
      },
      dialogContainer: {
        pointerEvents: "none",
      },
    },
    sidebarMaps: {
      dialog: {
        maxW: "349px",
        pointerEvents: "auto",
      },
      dialogContainer: {
        pointerEvents: "none",
      },
    },
  },
};
