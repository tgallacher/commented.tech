import React from 'react';
import { Link, graphql } from 'gatsby';
import { css } from '@emotion/core';

import Bio from 'components/Bio';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import PostPagination from 'components/PostPagination';

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

function BlogPostTemplate({ data, location, pageContext }) {
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
        <header>
          <h1>{post.frontmatter.title}</h1>
          <div
            css={css`
              margin-bottom: 3em;
              color: #757575;
            `}
          >
            {post.timeToRead} mins &#9679;&nbsp;
            {post.frontmatter.date}
          </div>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <footer
          css={css`
            margin-top: 2em;
            border-top: 1px solid #455a64;
          `}
        >
          <PostPagination pageContext={pageContext} />
          <Bio
            css={css`
              margin: 4em 0;
            `}
          />
        </footer>
      </article>
    </Layout>
  );
}

export default BlogPostTemplate;
