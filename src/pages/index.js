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
    allFile(
      filter: { extension: { eq: "md" } }
      sort: { fields: [birthTime], order: DESC }
    ) {
      edges {
        node {
          birthTime(formatString: "Do MMM, YYYY")
          modifiedTime(formatString: "Do MMM, YYYY")
          childMarkdownRemark {
            excerpt
            fields {
              slug
              readingTime {
                text
              }
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`;

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allFile.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      <Container>
        <Bio />
      </Container>

      {posts.map(({ node }) => (
        <PostSummary key={node.childMarkdownRemark.fields.slug} post={node} />
      ))}
    </Layout>
  );
}

export default BlogIndex;
