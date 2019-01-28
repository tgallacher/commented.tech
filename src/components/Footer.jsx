import React from 'react';

const Footer = () => (
  <footer>
    &copy; {new Date().getFullYear()} Tom Gallacher
    <a
      href="//github.com/tgallacher"
      rel="noopener noreferrer"
      title="See what i'm up to on Github"
      target="_blank"
    >
      Github
    </a>
  </footer>
);

export default Footer;
