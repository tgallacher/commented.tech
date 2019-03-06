import { css } from '@emotion/core';
import { lighten } from 'polished';
/**
 * Palette colors
 */
const PRIMARY_COLOR_LIGHT = '#CFD8DC';
const PRIMARY_COLOR = '#607D8B';
const PRIMARY_COLOR_DARK = '#455A64';
const TEXT_ICONS_COLOR = '#FFFFFF';

const ACCENT_COLOR = '#FF5722';
const PRIMARY_TEXT_COLOR = '#212121';
const SECONDARY_TEXT_COLOR = '#757575';
const DIVIDER_COLOR = '#BDBDBD';

/**
 * Site wide styles
 */
export const globalStyles = css`
  html {
    font-size: 16px;
    border-top: 3px solid ${ACCENT_COLOR};
  }

  body {
    font-family: 'Montserrat', sans - serif;
    font-weight: 400;
    line-height: 1.25;
    font-size: 100 %;
    background-color: #263238;
    color: #e2e2e2;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Maven Pro', sans-serif;
    font-weight: 700;

    a {
      text-decoration: none;
    }
  }

  a {
    color: ${ACCENT_COLOR};

    &:hover {
      color: ${lighten(0.1, ACCENT_COLOR)};
    }
  }
`;

/**
 * Customise PrismJS syntax highlighting.
 */
export const gatsbyHighlight = css`
  margin: 2em 0;
  overflow: auto;
  border-radius: 0.3em;
  border: 1px solid ${PRIMARY_COLOR_DARK};

  pre[class*='language-'] {
    padding: 0;
    margin: 0;

    &.line-numbers {
      padding: 0.5em 0 0.5em 2.8em;
      overflow: initial;
    }

    & > .line-numbers-rows {
      left: 0.5em !important; /* overwrite JS inline styles added by PrismJS */
      top: 0.5em;
      bottom: 0.5em;
    }
  }
`;
