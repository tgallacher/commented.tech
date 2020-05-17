import { css } from '@emotion/core';
import { lighten, darken } from 'polished';
import theme from './gatsby-plugin-theme-ui';

export const root = css`
  a {
    color: ${theme.colors.primary};

    &:hover {
      color: ${theme.colors.muted};
    }

    &:visted {
      color: ${theme.colors.secondary};
    }
  }
`;
/**
 * Customise PrismJS syntax highlighting.
 */
export const gatsbyHighlight = css`
  margin: 2em 0;
  overflow: hidden;
  border-radius: 0.3em;

  /**
   * Remove the default PrismJS theme background-color, border-radius, margin,
   * padding and overflow.
   * 1. Make the element just wide enough to fit its content.
   * 2. Always fill the visible space in .gatsby-highlight.
   * 3. Adjust the position of the line numbers
   */
  pre[class*='language-'] {
    padding: 0;
    margin: 1em 0;
    ${'' /* overflow: initial; */}
    float: left; /* 1 */
    min-width: 100%; /* 2 */
    background-color: ${darken(0.02, theme.colors.text)};

    &.line-numbers {
      padding: 0.5em 0 0.5em 2.8em;
    }

    & > .line-numbers-rows {
      left: 0.5em !important; /* overwrite JS inline styles added by PrismJS */
      top: 0.5em;
      bottom: 0.5em;
    }
  }

  :not(pre) > code[class*='language-'] {
    background: ${theme.colors.secondary};
    color: ${theme.colors.background};
    border-radius: 0;
    padding: 0.25em 0.35em;
    text-shadow: none;
  }

  .gatsby-highlight-code-line {
    background-color: ${lighten(0.05, theme.colors.text)};
    display: block;
    margin: 0 -0.7em;
    padding-right: 1em;
    padding-left: 0.35em;
    border-left: 0.25em solid ${lighten(0.0, theme.colors.primary)};
  }
`;
