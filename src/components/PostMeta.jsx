/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';

const PostMeta = ({ readingTime, postDate, color, as = 'small', ...props }) => (
  <Styled.p as={as} sx={{ color, fontStyle: 'italic' }} {...props}>
    <span sx={{ display: 'inline-block', mr: 3 }}>
      <i className="far fa-clock" sx={{ mr: 1 }} />
      {postDate}
    </span>
    &#9679;
    <i className="fas fa-book-open" sx={{ ml: 3 }} />
    <span sx={{ display: 'inline-block', mx: 2 }}>{readingTime}</span>
  </Styled.p>
);

export default PostMeta;
