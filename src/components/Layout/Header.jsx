/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { space } from 'styled-system';

const Header = ({ title }) => (
  <header>
    <Styled.div
      sx={{
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 5,
        pb: 4,
        pt: 3,
      }}
    >
      <Styled.a as={Link} sx={{ color: 'secondary' }} to="/">
        {title}
      </Styled.a>
    </Styled.div>
  </header>
);

export default Header;
