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
        excerpt
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
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      <Bio />

      {posts.map(post => (
        <PostSummary key={post.fields.slug} post={post} />
      ))}
    </Layout>
  );
}

export default BlogIndex;
