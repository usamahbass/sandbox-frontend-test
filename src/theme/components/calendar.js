export const Calendar = {
  parts: ["calendar", "months"],

  baseStyle: {
    calendar: {
      position: "relative",
      w: "min-content",
      borderWidth: "1px",
      rounded: "md",
      shadow: "lg",
    },

    months: {
      p: 4,
      w: "100%",
      gridTemplateColumns: "1fr 1fr",
    },
  },
};

export const CalendarControl = {
  parts: ["controls", "button"],

  baseStyle: {
    controls: {
      position: "absolute",
      p: 4,
      w: "100%",
      justifyContent: "space-between",
    },

    button: {
      h: 6,
      px: 2,
      lineHeight: 0,
      fontSize: "md",
      rounded: "md",
    },
  },
};

export const CalendarDay = {
  baseStyle: {
    rounded: "none",
    bgColor: "transparent",

    _hover: {
      bgColor: "gray.100",
    },

    _disabled: {
      color: "gray.200",
      _hover: {
        cursor: "initial",
        bgColor: "transparent",
      },
    },
  },

  sizes: {
    sm: {
      h: 8,
    },
  },

  variants: {
    selected: {
      bgColor: "primary.400",
      color: "white",
      borderRadius: '100px',

      _hover: {
        bgColor: "primary.300",
      },
    },

    range: {
      bgColor: "primary.200",
      color: "white",

      _hover: {
        bgColor: "primary.100",
      },

      _disabled: {
        _hover: {
          bgColor: "primary.300",
        },
      },
    },

    outside: {
      color: "gray.300",
    },
    today: {
      bgColor: "primary.500",
      _hover: {
        bgColor: "primary.200",
      },
    },
  },

  defaultProps: {
    size: "sm",
  },
};

export const CalendarMonth = {
  parts: ["month", "name", "week", "weekday", "days"],

  baseStyle: {
    name: {
      h: 8,
      fontSize: "md",
      lineHeight: 6,
      textAlign: "center",
      textTransform: "capitalize",
    },

    week: {
      gridTemplateColumns: "repeat(7, 1fr)",
    },

    weekday: {
      color: "gray.500",
      textAlign: "center",
      textTransform: "capitalize",
    },

    days: {
      gridTemplateColumns: "repeat(7, 1fr)",
    },
  },

  defaultProps: {
    name: {
      as: "h2",
    },
  },
};
