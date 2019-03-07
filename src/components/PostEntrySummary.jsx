import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

function PostEntrySummary({ post }) {
  const title =
    post.childMarkdownRemark.frontmatter.title ||
    post.childMarkdownRemark.fields.slug;

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
          <Link to={post.childMarkdownRemark.fields.slug}>{title}</Link>
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
            {post.childMarkdownRemark.fields.readingTime.text}
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
            {post.birthTime}
          </span>
          {post.birthTime !== post.modifiedTime && (
            <React.Fragment>
              &#9679;
              <span
                css={css`
                  display: inline-block;
                  margin-left: 0.5em;
                `}
              >
                <i
                  css={css`
                    margin-right: 0.25em;
                  `}
                  className="far fa-edit"
                />
                {post.modifiedTime}
              </span>
            </React.Fragment>
          )}
        </small>

        <p
          dangerouslySetInnerHTML={{
            __html: post.childMarkdownRemark.excerpt,
          }}
        />
      </div>
    </article>
  );
}

export default PostEntrySummary;
