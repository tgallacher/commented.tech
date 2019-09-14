/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Link } from 'gatsby';

import Footer from './Footer';
import Header from './Header';
import Container from './Container';

function Layout({ children, ...props }) {
  return (
    <main sx={theme => theme.styles.root}>
      <Container>
        <Header {...props} />
        {children}
        <Footer {...props} />
      </Container>
    </main>
  );
}

export default Layout;
