/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import { Link } from 'gatsby';

import PostMeta from './PostMeta';
import PostHero from './PostHero';

const PostEntrySummary = ({ post }) => {
  const title = post.frontmatter.title;

  return (
    <article
      sx={{ mb: [4, undefined, 5], display: ['block', undefined, 'flex'] }}
    >
      <div
        sx={{
          mr: [0, undefined, 4],
          mb: [3, undefined, 0],
          flexGrow: 1,
          flexBasis: 0,
          maxWidth: ['100%', undefined, 250],
        }}
      >
        <Styled.a
          as={Link}
          to={post.fields.slug}
          sx={{ textDecoration: 'none', color: 'primary' }}
        >
          <PostHero
            expand={false}
            fluid={post.frontmatter.hero.img.childImageSharp.fluid}
          />
        </Styled.a>
      </div>
      <div
        sx={{
          flexGrow: 1,
          flexBasis: 0,
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <PostMeta
          readingTime={post.fields.readingTime.text}
          postDate={post.frontmatter.date}
          color="muted"
        />

        <Styled.a
          as={Link}
          to={post.fields.slug}
          sx={{ textDecoration: 'none', color: 'text' }}
        >
          <Styled.h3 sx={{ m: 0, mt: 1 }}>{title}</Styled.h3>
        </Styled.a>

        <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        <Styled.a
          as={Link}
          to={post.fields.slug}
          sx={{ textDecoration: 'none', color: 'primary', mt: 'auto' }}
        >
          Read more
        </Styled.a>
      </div>
    </article>
  );
};

export default PostEntrySummary;
