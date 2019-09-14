/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from 'components/Bio';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import PostSummary from 'components/PostEntrySummary';
import Container from 'components/Container';

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
      nodes {
        excerpt(pruneLength: 250)
        fields {
          slug
          readingTime {
            text
          }
        }
        frontmatter {
          title
          date(formatString: "Do MMM, YYYY")
          hero {
            img {
              childImageSharp {
                fluid(maxHeight: 500, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <Bio />

      <section
        sx={{
          mx: [0, undefined, -5],
          px: [0, undefined, 4],
        }}
      >
        <PostSummary feature post={posts[0]} />
      </section>

      {posts.slice(1).map(post => (
        <PostSummary key={post.fields.slug} post={post} />
      ))}
    </Layout>
  );
}

export default BlogIndex;
