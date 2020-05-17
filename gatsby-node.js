const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

/**
 *
 * @param {*} param0
 */
const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
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
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
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
  `);

  if (errors) throw errors;

  const posts = data.allMdx.nodes;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];

    createPage({
      path: post.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.fields.slug,
        // required for [gatsby-plugin-changelog-context]
        fileAbsolutePath: post.fileAbsolutePath,
        previous,
        next,
      },
    });
  });
};

exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
