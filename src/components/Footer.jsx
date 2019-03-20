import React from 'react';
import { css } from '@emotion/core';
import Container from 'components/Container';

const Footer = () => (
  <footer
    css={css`
      padding: 0.5em;
      background: #263238;
    `}
  >
    <Container>
      &copy; {new Date().getFullYear()} Tom Gallacher
      <a
        href="//twitter.com/tom_gallacher"
        rel="noopener noreferrer"
        title="Twitter profile"
        target="_blank"
        css={css`
          margin: 0 0.5em;
        `}
      >
        Twitter
      </a>
      /
      <a
        href="//github.com/tgallacher"
        rel="noopener noreferrer"
        title="Github profile"
        target="_blank"
        css={css`
          margin-left: 0.5em;
        `}
      >
        Github
      </a>
    </Container>
  </footer>
);

export default Footer;
