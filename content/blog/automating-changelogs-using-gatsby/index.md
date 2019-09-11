---
title: Automating page changelogs using GatsbyJS
date: '2019-09-11'
labels: gatsby, gatsby-plugins
hero:
  img: './hero.jpg'
  credit: Photo by <a href="https://unsplash.com/@lukekminklein">Luke K. Minklein</a> on <a href="https://unsplash.com/">Unsplash</a>
---

After coming across this tweet by [Søren Birkemeyer](https://twitter.com/polarbirke):

https://twitter.com/polarbirke/status/1169334048516444160

It got me thinking:

1. What a really cool and neat idea
1. That is some serious Perl skills 💪
1. I wonder if this could be simplified
1. How easily would it be to automate this with Gatsby and add it to this site

Firstly, I really like the idea of having an Errata/change history on each post on a site: When I read stuff online I typically do a quick scan to find the _publish_ or _update_ date to get a sense of relevance of the content--rightly or wrongly, I correlate newer content to be more relevant, at least online. Plus, I thought this would be great addition to this site--provide myself with this information when I read these posts back in the future.

With that, I thought this might be a cool small focused feature to see how I could add it to this site, although I definitely don't want to dive into Perl to accomplish it 😰.

Giving it some thought, I remember coming across a nifty package when researching an idea I had of possibly separating a Gastby pipeline and the markdown files across different Git repos: Digging the package out of my Github stars, the possible saviour was [simple-git](https://github.com/steveukx/git-js). This is a lightweight NodeJS interface to the `git` CLI.

So, effectively what I needed to achieve--much like Senøren outlined in his [blog post](https://annualbeta.com/blog/a-changelog-for-my-blog-posts/)--was:

1. Get the commit history for a given (markdown) file
1. Extract the key data useful for display: commit message, timestamp, commit hash (useful for unique ids in React, etc)
1. Transform the data into JSON so that it can easily be consumed
1. Add this data to my Gatsby blog setup for this site
1. Build the necessary UI elements to display the above contents

## Extract & Transform git commit history into JSON

Using `simple-git`, the first 3 items turned out to be surprisingly simple:

```js
const git = require('simple-git/promise');

/**
 * @param {string} path Absolute path to file to retrieve commit history
 * @return {object[]}
 */
const getChangelog = async path => {
  const { all: changelog } = await git().log({ file: path });

  return changelog ? changelog : [];
};
```

With this function executed in a NodeJS environment (which is also a git repo) and supplying a given file path that matches the current working directory

```js
// node index.js
const commits = getChangelog('/abs/path/to/file');
```

would give us a data structure that looks like (as of v1.126.0 of _simple-git_):

```js
[
  {
    "hash": string; // commit hash
    "date": string; // ISO datetime
    "message": string; // commit summary
    "body": string; // commit body
    "author_name": string;
    "author_email": string;
    "refs": string;
  },
  ...
]
```

with an object for each commit. Simples; this is exactly what we need!

## Add changelog to Gatsby's data layer

Now we have a simple way to pull out the data, we next need to figure out how to expose the JSON commit data to Gastby's internal data layer, so that we can eventually consume and display this data in our page template(s).

Thankfully, Gatsby's Node API makes this pretty simple as well. There are 2 APIs we could use to achieve this: [createPages](https://www.gatsbyjs.org/docs/node-apis/#createPages) or [onCreatePage](https://www.gatsbyjs.org/docs/node-apis/#onCreatePage).

The former API, `createPages` is almost certainly something most people running Gastby blogs are familiar with, as it the primary addition to a Gastby site so that you can programmatically generate pages from Markdown content. A super basic example might look something like:

> As `createPages` is a Gatsby Node API, we'll need to ensure we add this to our `gatsby-node.js` file.

```js
// gatsby-node.js
const path = require(`path`);

exports.createPages = async ({ graphql, actions: { createPage } }) => {
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
    throw errors;
  }

  // loop over each post and tell Gastby to create the output page
  data.allMarkdownRemark.edges.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });
};
```

There is so much you can do here to configure the way Gatsby should generate your output pages, but the above is the bare essentials to get it working.

We don't want to force how our commit data should be displayed, so we want to instead add the commit data to Gatsby's internal data layer so that it can be extracted in our page templates, ready for display. The simplest way to do this, is to add the commit data to the page context (see [pageContext](https://www.gatsbyjs.org/docs/gatsby-internals-terminology/)). We can modify the above `createPages` function to achieve this:

```js
// highlight-range{11,29-31,38,42}
// gatsby-node.js
const path = require(`path`);

const createPages = async ({ graphql, actions: { createPage } }) => {
  const blogPostTemplate = path.resolve('./src/templates/blog-post.js');
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
+           fileAbsolutePath
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

  // loop over each post and tell Gastby to create the output page
+ return Promise.all(
+   data.allMarkdownRemark.edges.forEach(async (post, index) => {
+     const commits = await getChangelog(post.node.fileAbsolutePath);

      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
+         commits,
        },
      });
    }),
+ );
};
```

Now, in our template (`./src/templates/blog-post.js` in this example) we can access the commit data and display it how we like. For example,

```jsx
// Note: other props excluded for brevity
// pageContext is provided automatically to our page template by Gatsby
const BlogPostTemplate = ({ pageContext }) => {
  ...
   return (
     ...

     <section id="changelog">
        <h4>Changelog</h4>

        {pageContext.commits.map(({ hash, date, message }) => (
          <p key={hash}>
            {moment(date).format('ddd Do MMM, YYYY')} - {message}
          </p>
        ))}
      </section>

      ...
   );
};
```

This will produce a similar display as you see on this site, below.

## Gatsby Plugin

Lastly, if you want to add a changelog to your site but don't want to go through all of the above, I converted the above to a Gatsby plugin: [gatsby-plugin-changelog-context](https://github.com/tgallacher/gatsby-plugin-changelog-context).

To get the changelog data within _pageContext_ of your templates, simply add the plugin to your `gatsby-config.js` file:

```js
// gatsby-config.js
module.exports = {
  ...
  plugins: [
    'gatsby-plugin-changelog-context',
  ]
};
```

And make sure that the `fileAbsolutePath` field is part of your GraphQL query in your `createPages` API call (like above).

That's it! Thanks for reading. If you have any comments or feedback feel free to reach out on [Twitter](https://twitter.com/tfgallacher).
