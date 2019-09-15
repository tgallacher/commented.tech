/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import { Link } from 'gatsby';

import Footer from './Footer';
import Header from './Header';
import Container from './Container';

function Layout({ children, ...props }) {
  return (
    <Styled.root>
      <main>
        <Container>
          <Header {...props} />
          {children}
          <Footer {...props} />
        </Container>
      </main>
    </Styled.root>
  );
}

export default Layout;
