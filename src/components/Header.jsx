import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { space } from 'styled-system';

let Title = styled.h1`
  ${space}
`;

const Header = ({ location, title }) => {
  // `__PATH_PREFIX__` comes from Gatsby.?
  const isRoot = location.pathname === `${__PATH_PREFIX__}/`;
  const marginTop = isRoot ? 0 : 1;

  Title = Title.withComponent(isRoot ? 'h1' : 'h3');

  return (
    <header>
      <Title mb={4} mt={marginTop}>
        <Link to="/">{title}</Link>
      </Title>
    </header>
  );
};

export default Header;
