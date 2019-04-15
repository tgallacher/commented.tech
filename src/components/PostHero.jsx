import React from 'react';
import styled from '@emotion/styled';
import GatsbyImg from 'gatsby-image';
import {
  position,
  maxWidth,
  display,
  borders,
  height,
  space,
  right,
  width,
  left,
} from 'styled-system';

const HeroCredit = styled.small`
  text-align: center;
  display: block;
`;

const Image = styled(GatsbyImg)`
  ${left}
  ${right}
  ${space}
  ${width}
  ${maxWidth}
  ${position}
  ${display}
  ${height}
`;

const PostHero = ({ credit, ...props }) => (
  <div>
    <Image
      {...props}
      display="block"
      height={[300, 400]}
      objectFit="contain"
      position="relative"
      maxWidth="100vw"
      right="50%"
      width="100vw"
      left="50%"
      mx="-50vw"
    />

    <HeroCredit
      dangerouslySetInnerHTML={{
        __html: credit,
      }}
    />
  </div>
);

export default PostHero;
