import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

function PostEntrySummary({ post }) {
  const title = post.frontmatter.title || post.fields.slug;

  const articleStyles = css`
    margin-bottom: 0.5em;

    @media (min-width: 767px) {
      margin-bottom: 0em;
    }
  `;
  const innerWrapperStyles = css`
    max-width: 40em; /* TODO: centralise this */
    padding: 0.25em;
    margin: 0 auto;
  `;
  const headingStyles = css`
    margin-bottom: 0.1em;
  `;

  return (
    <article css={articleStyles}>
      <div css={innerWrapperStyles}>
        <h3 css={headingStyles}>
          <Link to={post.fields.slug}>{title}</Link>
        </h3>

        <small
          css={css`
            font-style: italic;
          `}
        >
          {post.timeToRead} mins &#9679;&nbsp;
          {post.frontmatter.date}
        </small>

        <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      </div>
    </article>
  );
}

export default PostEntrySummary;
