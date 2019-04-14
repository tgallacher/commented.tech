import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { maxWidth, space, width } from 'styled-system';

const StyledContainer = styled.div`
  ${maxWidth}
  ${space}
  ${width}
`;

const Container = props => (
  <StyledContainer maxWidth="44em" mx={[2, 'auto']} {...props} />
);

export default Container;
