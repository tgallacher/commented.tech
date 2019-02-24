import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import Footer from './Footer';
import Header from './Header';

function Layout({ children, ...props }) {
  const layoutStyling = css`
    margin-left: auto;
    margin-right: auto;
    max-width: 24em;
    padding: 2em;
  `;
  const globalStyles = css`
    font-family: 'Roboto', 'sans-serif';
  `;

  return (
    <main css={layoutStyling}>
      <Header {...props} />
      {children}
      <Footer {...props} />
    </main>
  );
}

export default Layout;
