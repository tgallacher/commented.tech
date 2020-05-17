/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = props => (
  <div
    {...props}
    sx={{
      maxWidth: 'container',
      mx: 'auto',
    }}
  />
);

export default Container;
