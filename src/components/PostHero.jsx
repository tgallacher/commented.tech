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

const PostHero = ({ credit, expand = true, ...props }) => (
  <div>
    <Image
      {...props}
      display="block"
      height={expand ? [300, 400] : [150, 200]}
      objectFit={expand ? 'contain' : undefined}
      position={expand ? 'relative' : undefined}
      maxWidth={expand ? '100vw' : undefined}
      right={expand ? '50%' : undefined}
      width={expand ? '100vw' : undefined}
      left={expand ? '50%' : undefined}
      mx={expand ? '-50vw' : undefined}
    />

    <HeroCredit
      dangerouslySetInnerHTML={{
        __html: credit,
      }}
    />
  </div>
);

export default PostHero;
