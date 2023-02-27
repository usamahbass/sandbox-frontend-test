export const mode = (...[prop, light, dark]) => {
  return {
    [prop]: light,
    '.chakra-ui-dark &': {
      [prop]: dark,
    },
  };
};
