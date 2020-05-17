import { lighten, darken } from 'polished';

// common heading config
const heading = {
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading',
  mt: 5,
  mb: 1,
  p: 0,
};

// const colors = {
//   text: '#170A1C',
//   background: '#ffffff',
//   primary: '#228CDB',
//   secondary: '#D14750',
//   muted: '#86C0EB',
//   // Prism
//   accent: '#0B7189',
//   gray: '#666',
// };
const colors = {
  text: '#3E3445',
  background: '#EFEDEB',
  primary: '#C67E31',
  secondary: '#AC3B24',
  muted: '#B6A192',
  // Prism
  accent: '#AC3B24',
  gray: '#666',
  // states
  success: '#6cab64',
  warning: '#e99b2c',
  danger: '#f44336',
  info: '#3e3445',
};

export const base = {
  useCustomProperties: true,
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '“Roboto”, sans-serif, system-ui',
    heading: 'inherit',
    monospace: '“IBM Plex Mono”, monospace',
  },
  fontSizes: [14, 16, 18, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors,
  sizes: {
    container: 928,
  },
  styles: {
    root: {
      backgroundColor: 'background',
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      fontSize: 2,
      px: [3, undefined, 0],
    },
    h1: {
      ...heading,
      fontSize: 6,
    },
    h2: {
      ...heading,
      fontSize: 5,
    },
    h3: {
      ...heading,
      fontSize: 4,
    },
    h4: {
      ...heading,
      fontSize: 3,
    },
    h5: {
      ...heading,
      fontSize: 2,
    },
    h6: {
      ...heading,
      fontSize: 1,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    a: {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    blockquote: {
      backgroundColor: darken(0.05, colors.background),
      borderLeftColor: 'primary',
      borderLeftStyle: 'solid',
      borderLeftWidth: 5,
      margin: 0,
      p: 1,
      pl: 2,
    },
  },
};

export default base;
