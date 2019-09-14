/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import Image from 'gatsby-image';

const PostHero = ({ credit, feature, expand = true, ...props }) => (
  <React.Fragment>
    <Image
      {...props}
      objectFit={expand ? 'contain' : undefined}
      sx={{
        display: 'block',
        height: expand
          ? [300, undefined, 400]
          : [150, undefined, feature ? 300 : 200],
        position: expand ? 'relative' : undefined,
        maxWidth: expand ? '100vw' : undefined,
        right: expand ? '50%' : undefined,
        width: expand ? '100vw' : undefined,
        left: expand ? '50%' : undefined,
        mx: expand ? '-50vw' : undefined,
      }}
    />
    <small
      sx={{
        textAlign: 'center',
        display: 'block',
      }}
      dangerouslySetInnerHTML={{
        __html: credit,
      }}
    />
  </React.Fragment>
);

export default PostHero;
