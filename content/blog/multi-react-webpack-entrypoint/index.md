---
title: 'Creating Multi Webpack Entrypoints in a React Component Library'
date: '2019-05-30'
labels:
  - webpack
  - react
hero:
  img: './hero.jpg'
  credit: Photo by <a crossorigin="anonymous" href="https://unsplash.com/photos/8OECtq8rrNg">Dil</a> on <a crossorigin="anonymous" href="https://unsplash.com/search/photos/doors">Unsplash</a>
---

This is going be a short post. I am working on a ReactJS component library at work and have been looking for a way to improve the entrypoint API for consumers of the library. For example, instead of having something like

```jsx
import { Button } from '@company/react';
```

I instead would like the API to look like

```jsx
import Button from '@company/react/Button';
```

I like this approach more, as it is more declarative than the first, in my opinion. Additionally, this entrypoint API is expressiveness and can help with library structures that are more complex than those that fit nicely into a simple context/namespace.

In my particular use case, the component library I am working on is leveraging some design principles from the popular [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) pattern, and so our components are split into a given hierarchy. The hierarchy help delineate context/expectation with regards to component functionality or complexity.

Using the above improved entrypoint API, this allows us to declarative document this additional context about the component as part of the import, i.e. where in the hierarchy does the component live and therefore what type of functionality/composition can I expect as the consumer. For a primitive component -- _atom_ -- the import would look something like:

```jsx
import Button from '@company/react/atoms/Button';
```

One other approach, which is may be less of an issue, is helping to streamline component naming and mitigating name collisions when similarly named components appear in multiple parts of the component hierarchy. I typically find this problem when dealing with `<Form>`-based components. For example, having a `<Input>` primitive (or _atom_) and then having a similar component with some additional complexity as a _molecule_. With this approach we remove the need for adding context to the component name:

```jsx
import Input from '@company/react/atoms/Input';
// We obviously wouldn't import both to the same variable
// in the same scope. This is just for illustration.
import Input from '@company/react/molecules/Input';
```

vs.

```jsx
import { InputAtom, InputMolecule } from '@component/react';
```

Enough about the benefits and motivation. How do we achieve this?

## Understanding the key parts of Webpack's entrypoint API

I've had this need with the component library for a few months now but haven't been able to find any good resources on how best to achieve this. And, maybe this is becuase the solution is pretty obvious. However, it wasn't immediately obvious to me until I thought of the approach below when working on something completely different. So, I am creating this in case it helps someone else.

It is worth pointing out that tools such as [Webpack](https://webpack.js.org/) and [Rollup](https://rollupjs.org/) are _bundlers_, which means their design, need and motivations are based around the need to assemble and optimize assets for the frontend, i.e. to bundle them. So creating a multi-entrypoint API for a library isn't _technically_ their use case, I suppose. However, the library I am currently working on will also benefit from asset optimization and -- generally -- all of the amazing automation that can be plugged into either of the bundler tools, whether it be CSS processing, image optimzation, minification, etc., etc. And so I still had a need for these tools, and thus couldn't rely solely on something like [BabelJS' CLI](https://babeljs.io/docs/en/babel-cli), or a custom script.

Although the below solution will work for Rollup (with modifications), we will use Webpack for the examples.

To understand how we can automate this, we need to understand two key aspect of how Webpack's API works: 1) is its [entries](https://webpack.js.org/concepts#entry). In short, a version of the `entry` API accepts an object with keys providing a unique ID for a module, and the value locating the module on the filesystem relative to the `webpack.config.js` file; and 2) Webpack's [output](https://webpack.js.org/concepts#output) API supports a special syntax which allows us to refer back to the unique entrypoint module ID, using the string `'[name]'` (including the square brackets).

For example, if we create the following Webpack config:

```js
// webpack.config.js
const path = require('path');

// Only relevant parts shown for brevity
module.exports = {
  ...
  entry: {
    foo: path.resolve(__dirname, './src/foo.js'),
    bar: path.resolve(__dirname, './src/bar.js'),
  },
  ...
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

With this config, Webpack will create two output files, `./dist/foo.js` and `./dist/bar.js`. Great, this is what we want for our library. However, we want this to be automatic for all of our component files, so that we don't need to remember to update the config when we add or move a component in our library `src` folder.

## Automating Webpack entrypoints
