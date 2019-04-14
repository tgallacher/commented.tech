import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { space } from 'styled-system';

import PostMeta from './PostMeta';

const Article = styled.article`
  ${space}
`;

const H3 = styled.h3`
  ${space}
`;

const InnerWrapper = Article.withComponent('div');

const PostEntrySummary = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug;

  return (
    <Article mb={[3, 0]}>
      <InnerWrapper p={2}>
        <H3 mb={1}>
          <Link to={post.fields.slug}>{title}</Link>
        </H3>

        <PostMeta
          readingTime={post.fields.readingTime.text}
          postDate={post.frontmatter.date}
        />

        <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      </InnerWrapper>
    </Article>
  );
};

export default PostEntrySummary;
