const TITLE = `Commented.tech`;
const AUTHOR = `Tom Gallacher`;
const SITE_URL = `https://commented.tech`;

module.exports = {
  siteMetadata: {
    title: TITLE,
    author: AUTHOR,
    description: 'Personal ramblings, comments, and thoughts',
    siteUrl: SITE_URL,
  },
  plugins: [
    'gatsby-plugin-twitter',
    'gatsby-plugin-changelog-context',
    'gatsby-plugin-remove-generator',
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: 'Roboto',
            variants: ['700'],
          },
          {
            family: 'Cutive Mono',
            variants: ['400'],
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
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-embedder' },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-smartypants` },
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
        ],
      },
    },
    // despite its name, this doesn't expose 'remark' functionality
    'gatsby-remark-reading-time',
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
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: SITE_URL,
        sitemap: `${SITE_URL}/sitemap.xml`,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
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
