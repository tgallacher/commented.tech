/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import { Link } from 'gatsby';
import { Global } from '@emotion/core';

import Footer from './Footer';
import Header from './Header';
import Container from './Container';
import { gatsbyHighlight, root } from '../styles';

function Layout({ children, ...props }) {
  return (
    <Styled.root>
      <Global styles={[root, gatsbyHighlight]} />

      <main>
        <Container>
          <Header {...props} />
          {children}
          <Footer />
        </Container>
      </main>
    </Styled.root>
  );
}

export default Layout;
