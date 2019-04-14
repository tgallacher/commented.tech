import React from 'react';
import { Link } from 'gatsby';
import { Global } from '@emotion/core';

import { globalStyles, gatsbyHighlight } from '../styles';
import Footer from './Footer';
import Header from './Header';
import Container from './Container';

function Layout({ children, ...props }) {
  return (
    <main>
      <Global styles={[globalStyles, gatsbyHighlight]} />

      <Container>
        <Header {...props} />
        {children}
        <Footer {...props} />
      </Container>
    </main>
  );
}

export default Layout;
