import React from 'react';
import { Link, graphql } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { space, borders } from 'styled-system';

import Bio from 'components/Bio';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import PostPagination from 'components/PostPagination';
import PostMeta from 'components/PostMeta';

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "Do MMM, YYYY")
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;

const Header = styled.header`
  ${space}
`;

const Footer = styled.footer`
  ${space}
  ${borders}
`;

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <article
        css={css`
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 2em 0 0;
          }
        `}
      >
        <Header mb={5}>
          <h1>{post.frontmatter.title}</h1>
          <PostMeta
            readingTime={post.fields.readingTime.text}
            postDate={post.frontmatter.date}
            color="#757575"
            as="p"
          />
        </Header>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <Footer mt={4} borderTop="1px solid #455a64">
          <PostPagination pageContext={pageContext} />
          <Bio />
        </Footer>
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;
