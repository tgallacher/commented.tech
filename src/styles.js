import { css } from '@emotion/core';
import { lighten } from 'polished';
/**
 * Palette colors
 *
 * @see https://coolors.co/ffffff-00171f-003459-007ea7-51bfe2
 */
const PRIMARY_COLOR_LIGHT = '#51BFE2';
const PRIMARY_COLOR = '#007EA7';
const PRIMARY_COLOR_DARK = '#00171F';
const TEXT_ICONS_COLOR = '#FFFFFF';

const ACCENT_COLOR = '#51BFE2';
const PRIMARY_TEXT_COLOR = '#FFFFFF';
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
    font-family: 'Montserrat', 'sans-serif';
    font-weight: 400;
    line-height: 1.65;
    font-size: 100%;
    background-color: ${PRIMARY_COLOR_DARK};
    color: ${TEXT_ICONS_COLOR};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Roboto', 'sans-serif';
    ${'' /* font-family: 'Maven Pro', 'sans-serif'; */}
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

  blockquote {
    margin: 0 0 1.75rem 0;
    padding: 0 0 0 1.42188rem;
    line-height: 1.75rem;
    color: inherit;
    font-style: italic;
    border-left: 0.32813rem solid hsla(0, 0%, 0%, 0.9);
    border-left-color: inherit;
    opacity: 0.8;
  }

  :not(pre) > code[class*='language-text'] {
    font-family: 'Cutive Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
      monospace;
    text-shadow: none;
    background: #d7d58a;
    color: black;
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
    }

    & > .line-numbers-rows {
      left: 0.5em !important; /* overwrite JS inline styles added by PrismJS */
      top: 0.5em;
      bottom: 0.5em;
    }
  }
`;
