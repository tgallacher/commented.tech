import React from 'react';
import styled from '@emotion/styled';
import { space, display, color } from 'styled-system';
import { css } from '@emotion/core';

const Metadata = styled.small`
  font-style: italic;
  ${color}
`;

const Span = styled.span`
  ${display}
  ${space}
`;

const Icon = styled.i`
  ${space}
`;

const PostMeta = ({ readingTime, postDate, color, as = 'small' }) => (
  <Metadata as={as} color={color}>
    <Icon className="fas fa-book-open" mr={1} />
    <Span display="inline-block" mr={2}>
      {readingTime}
    </Span>
    &#9679;
    <Span display="inline-block" mx={2}>
      <Icon className="far fa-clock" mr={1} />
      {postDate}
    </Span>
  </Metadata>
);

export default PostMeta;
