/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import Image from 'gatsby-image';

const PostHero = ({
  credit,
  feature,
  expand = true,
  wrapperProps,
  ...props
}) => (
  <div {...wrapperProps}>
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
    <Styled.p
      sx={{
        textAlign: 'center',
        display: 'block',
        m: 0,
        p: 0,
        mt: 2,
        color: 'muted',
        fontSize: 0,
        a: {
          color: 'muted',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      }}
      dangerouslySetInnerHTML={{
        __html: credit,
      }}
    />
  </div>
);

export default PostHero;
