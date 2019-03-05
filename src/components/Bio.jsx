import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { css } from '@emotion/core';

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpe?g/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`;

function Bio({ data }) {
  const imgWrapperStyles = css`
    display: flex;
    margin-bottom: 2.5em;
  `;
  const imgStyles = css`
    margin-right: 0.5em;
    margin-bottom: 0;
    min-width: 50px;
    border-radius: 100%;
    background-color: #0f0;
  `;

  return (
    <StaticQuery query={bioQuery}>
      {data => {
        const { author } = data.site.siteMetadata;

        return (
          <div css={imgWrapperStyles}>
            <Image
              alt={author}
              css={imgStyles}
              fixed={data.avatar.childImageSharp.fixed}
            />
            <p>
              By <em>{author}</em>.
            </p>
          </div>
        );
      }}
    </StaticQuery>
  );
}

export default Bio;
