/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import { Box, Heading } from '@chakra-ui/core';
import { Link } from 'gatsby';

const CardFooter = props => {
  return <Box>{props.children}</Box>;
};

const Card = props => {
  return (
    <Box>
      <Styled.a
        as={Link}
        to={post.fields.slug}
        sx={{ textDecoration: 'none', color: 'text' }}
      >
        <Heading m={0} mt={1} fontSize={5}>
          {title}
        </Heading>
      </Styled.a>
      {props.children}
    </Box>
  );
};

Card.Footer = CardFooter;

export default Card;
