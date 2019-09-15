/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Bio from 'components/Bio';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import PostPagination from 'components/PostPagination';
import PostMeta from 'components/PostMeta';
import PostHero from 'components/PostHero';
import Changelog from 'components/Changelog';

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "Do MMM, YYYY")
        hero {
          credit
          img {
            childImageSharp {
              fluid(maxHeight: 500, cropFocus: ENTROPY) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;

const BlogPostTemplate = ({
  data: { mdx: post, site },
  location,
  pageContext,
}) => {
  const siteTitle = site.siteMetadata.title;
  const heroImg = post.frontmatter.hero.img.childImageSharp.fluid;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <article sx={{ position: 'relative' }}>
        <PostHero
          wrapperProps={{
            sx: { mb: 5 },
          }}
          credit={post.frontmatter.hero.credit}
          fluid={heroImg}
        />

        <section
          sx={{
            backgroundColor: 'background',
            position: 'absolute',
            top: 0,
            zIndex: 10,
            p: 3,
            pt: 4,
          }}
        >
          <header sx={{ mb: 0 }}>
            <Styled.h1 sx={{ mt: 1 }}>{post.frontmatter.title}</Styled.h1>
            <PostMeta
              sx={{
                m: 0,
                p: 0,
              }}
              readingTime={post.fields.readingTime.text}
              postDate={post.frontmatter.date}
              color="#757575"
              as="p"
            />
          </header>
        </section>

        <MDXRenderer sx={{ mt: 4 }}>{post.body}</MDXRenderer>

        <Changelog commits={pageContext.changelog} />

        <footer sx={{ mt: 4, borderTop: '1px solid #455a64' }}>
          <PostPagination pageContext={pageContext} />
          <Bio />
        </footer>
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;
