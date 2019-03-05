import React from 'react';
import { Link, graphql } from 'gatsby';
import { css } from '@emotion/core';

function PostPagination({ pageContext }) {
  const { previous, next } = pageContext;

  return (
    <ul
      css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        list-style: none;
        padding: 0;
      `}
    >
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            ← (Prev) {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            (Next) {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </ul>
  );
}

export default PostPagination;
