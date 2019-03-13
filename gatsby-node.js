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
const createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise(async (resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js');

    const { data, errors } = await graphql(`
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
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
      return reject(errors);
    }

    // Create blog posts pages.
    const posts = data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      });
    });

    return resolve();
  });
};

exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
