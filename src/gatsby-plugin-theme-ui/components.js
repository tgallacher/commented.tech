import { Styled } from 'theme-ui';
import React from 'react';
import Prism from '@theme-ui/prism';

export default {
  // ...Styled,
  pre: props => props.children,
  // pre: ({ children }) => <>{children}</>,
  code: props => <Prism {...props} />,
};
