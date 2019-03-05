import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

import Container from 'components/Container';

function Header({ location, title }) {
  const rootPath = `${__PATH_PREFIX__}/`;

  const HeadingTag = location.pathname === rootPath ? 'h1' : 'h3';
  const headerStyling = css`
    margin-bottom: 1.5em;
    margin-top: ${HeadingTag === 'h1' ? '0' : '0.25em'};
  `;

  return (
    <header>
      <Container>
        <HeadingTag css={headerStyling}>
          <Link to="/">{title}</Link>
        </HeadingTag>
      </Container>
    </header>
  );
}

export default Header;
