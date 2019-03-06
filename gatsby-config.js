const TITLE = `Commented.tech`;
const AUTHOR = `Tom Gallacher`;

module.exports = {
  siteMetadata: {
    title: TITLE,
    author: AUTHOR,
    description: 'A place for my personal brain dumps, comments, and thoughts',
    siteUrl: `https://commented.tech/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: 'Maven Pro',
            variants: ['700'],
          },
          {
            family: 'Montserrat',
            variants: ['400', '700'],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.NODE_ENV === 'production' && 'UA-135750116-1',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: TITLE,
        short_name: `Commented.tech`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${__dirname}/content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-feed`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-force-trailing-slashes`,
    `gatsby-plugin-offline`,
  ],
};
