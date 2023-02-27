import { mode } from './theme-mode';

export const textStyles = {
  stroke: {
    color: 'transparent',
    WebkitTextStrokeColor: 'white',
    WebkitTextStrokeWidth: '1px',
  },
  default: {
    ...mode('color', 'black', 'white'),
  },
  light: {
    ...mode('color', 'gray.600', 'gray.400'),
  },
};
