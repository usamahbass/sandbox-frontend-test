import { mode } from './theme-mode';

export const layerStyles = {
  card: {
    ...mode('bg', 'white', 'whiteAlpha.200'),
  },
  'card-dark': {
    ...mode('bg', 'white', 'whiteAlpha.50'),
  },
  neutral: {
    ...mode('bg', 'gray.50', 'bg.800'),
  },
};
