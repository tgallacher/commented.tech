const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

/**
 *
 * @param {*} param0
 */
const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

/**
 *
 * @param {*} param0
 */
const createPages = async ({ graphql, actions: { createPage } }) => {
  const blogPostTemplate = path.resolve('./src/templates/blog-post.js');

  const { data, errors } = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  // Create blog posts pages.
  const posts = data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        // required for [gatsby-plugin-changelog-context]
        fileAbsolutePath: post.node.fileAbsolutePath,
        previous,
        next,
      },
    });
  });
};

exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
