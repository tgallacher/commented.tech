import React from 'react';
import { Link } from 'gatsby';
import { Global, css } from '@emotion/core';
import Footer from './Footer';
import Header from './Header';

const globalStyles = css`
  html {
    font-size: 16px;
    border-top: 3px solid #e64a19;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    line-height: 1.25;
    font-size: 100%;
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
    color: #ff5722;

    :hover {
      color: #e64a19;
    }
  }
`;

function Layout({ children, ...props }) {
  return (
    <main
      css={css`
        max-width: 40em;
        margin: 0 auto;
      `}
    >
      <Global styles={globalStyles} />
      <Header {...props} />
      {children}
      <Footer {...props} />
    </main>
  );
}

export default Layout;
