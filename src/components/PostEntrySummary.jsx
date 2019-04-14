import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { space, display } from 'styled-system';

const Article = styled.article`
  ${space}
`;

const InnerWrapper = Article.withComponent('div');

const H3 = styled.h3`
  ${space}
`;

const Metadata = styled.small`
  font-style: italic;
`;

const Span = styled.span`
  ${display}
  ${space}
`;

const PostEntrySummary = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug;

  return (
    <Article mb={[3, 0]}>
      <InnerWrapper p={2}>
        <H3 mb={1}>
          <Link to={post.fields.slug}>{title}</Link>
        </H3>

        <Metadata>
          <Span display="inline-block" mr={2}>
            {post.fields.readingTime.text}
          </Span>
          &#9679;
          <Span display="inline-block" mx={2}>
            <i
              css={css`
                margin-right: 0.25em;
              `}
              className="far fa-clock"
            />
            {post.frontmatter.date}
          </Span>
        </Metadata>

        <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      </InnerWrapper>
    </Article>
  );
};

export default PostEntrySummary;
