import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from '@emotion/styled';
import { space, minWidth, display, borderRadius } from 'styled-system';

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

const StyledImg = styled(Image)`
  ${space}
  ${minWidth}
  ${display}
  ${borderRadius}
`;

const Wrapper = styled.div`
  ${display}
  ${space}
`;

const Bio = ({ data, className }) => (
  <StaticQuery query={bioQuery}>
    {data => {
      const { author } = data.site.siteMetadata;

      return (
        <Wrapper display="flex" mb={4} className={className}>
          <StyledImg
            borderRadius="100%"
            minWidth={50}
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            mr={2}
            mb={0}
          />
          <p>
            By <em>{author}</em>.
          </p>
        </Wrapper>
      );
    }}
  </StaticQuery>
);

export default Bio;
