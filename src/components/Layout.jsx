import React from 'react';
import { Link } from 'gatsby';
import { Global, css } from '@emotion/core';

import { globalStyles, gatsbyHighlight } from '../styles';
import Footer from './Footer';
import Header from './Header';

function Layout({ children, ...props }) {
  return (
    <main
      css={css`
        max-width: 40em;
        margin: 0 auto;
      `}
    >
      <Global styles={[globalStyles, gatsbyHighlight]} />
      <Header {...props} />
      {children}
      <Footer {...props} />
    </main>
  );
}

export default Layout;
