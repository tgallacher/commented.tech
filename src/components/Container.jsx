import React from 'react';
import { css } from '@emotion/core';

function Container({ children }) {
  return (
    <div
      css={css`
        max-width: 40em;
        margin: 0 auto;
      `}
    >
      {children}
    </div>
  );
}

export default Container;
