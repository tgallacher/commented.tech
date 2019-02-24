import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

function Header({ location, title }) {
  const rootPath = `${__PATH_PREFIX__}/`;

  const HeadingTag = location.pathname === rootPath ? 'h1' : 'h3';
  const headerStyling = css`
    margin-bottom: 1.5em;
    margin-top: 0;
  `;
  const linkStyles = css`
    box-shadow: none;
    text-decoration: none;
    color: inherit;
  `;

  return (
    <header>
      <HeadingTag css={headerStyling}>
        <Link css={linkStyles} to="/">
          {title}
        </Link>
      </HeadingTag>
    </header>
  );
}

export default Header;
