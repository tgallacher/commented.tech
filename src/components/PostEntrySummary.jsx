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
    padding: 0.25em;
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
          <span
            css={css`
              display: inline-block;
              margin-right: 0.5em;
            `}
          >
            {post.fields.readingTime.text}
          </span>
          &#9679;
          <span
            css={css`
              display: inline-block;
              margin-right: 0.5em;
              margin-left: 0.5em;
            `}
          >
            <i
              css={css`
                margin-right: 0.25em;
              `}
              className="far fa-clock"
            />
            {post.frontmatter.date}
          </span>
        </small>

        <p
          dangerouslySetInnerHTML={{
            __html: post.excerpt,
          }}
        />
      </div>
    </article>
  );
}

export default PostEntrySummary;
