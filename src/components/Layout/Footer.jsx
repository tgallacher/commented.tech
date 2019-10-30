import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { space, color } from 'styled-system';

const Footer = styled.footer`
  ${space}
  ${color}
`;

const A = styled.a`
  ${space}
`;

const FooterArea = () => (
  <Footer py={2} px={0} mt={5}>
    &copy; {new Date().getFullYear()} Tom Gallacher
    <A
      href="//twitter.com/tfgallacher"
      rel="noopener noreferrer"
      title="Twitter profile"
      target="_blank"
      mx={2}
    >
      Twitter
    </A>
    -
    <A
      href="//github.com/tgallacher"
      rel="noopener noreferrer"
      title="Github profile"
      target="_blank"
      ml={2}
    >
      Github
    </A>
  </Footer>
);

export default FooterArea;
