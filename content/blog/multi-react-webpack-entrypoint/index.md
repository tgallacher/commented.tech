---
title: 'Multi Bundle Entrypoints in a React Component Library using Webpack'
date: '2019-05-30'
labels:
  - webpack
  - react
hero:
  img: './hero.jpg'
  credit: Photo by <a crossorigin="anonymous" href="https://unsplash.com/photos/8OECtq8rrNg">Dil</a> on <a crossorigin="anonymous" href="https://unsplash.com/search/photos/doors">Unsplash</a>
---

This should be a short post. While working on a ReactJS component library at work, I have been looking for a way to improve and simplify how components are exposed by the library so that their consumption is simpler and more declarative. For example, instead of having something like

```jsx
import { Button } from '@company/react';
```

I would like the entrypoint API to be more like

```jsx
import Button from '@company/react/Button';
```

In my opinion, the latter approach is cleaner and more declarative than the first. Additionally, the latter form is more expressive and can help with library structures that are more complex than those that fit nicely into a simple context or namespace.

In my particular use case, the component library I am working on is leveraging some design principles from the popular [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) pattern, and so our components are split into a given hierarchy. The hierarchy helps delineate context and expectation with regards to component functionality or complexity.

Using the latter entrypoint API from above, this allows us to declaratively document this additional component context part of the import, i.e. where in the hierarchy does the component live and therefore what type of functionality/composition can I expect as the consumer. For a primitive component -- or _atom_ -- the import would look something like:

```jsx
import Button from '@company/react/atoms/Button';
```

One final benefit that I would also like to call out, which admittedly may be less of an issue depending on the complexity and range of component avaiable in the library, is this approach also streamlines component naming by mitigating name collisions when similarly named components appear in multiple parts of the component hierarchy.

I have typically run into such probelms when creating `<Form>`-based components. For example, you may have an `<Input>` primitive (or _atom_) component as well as a similarly named component with additional complexity higher up in the hierarchy, such as a _molecule_. However, with the latter entrypoint API we remove the need for adding context to the component name:

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

So question remains how the latter entrypoint API can be achieved.

## Webpack API: Understanding the important pieces which we can use to unlock this functionality

I've had this need with the component library for a few months now but haven't been able to find any good resources on how best to achieve this. And, maybe this is becuase the solution is pretty obvious. Nevertheless, it wasn't immediately obvious to me until I thought of the approach below when working on something completely different. So, I am creating this in case it helps someone else.

It is worth pointing out that tools such as [Webpack](https://webpack.js.org/) and [Rollup](https://rollupjs.org/) are _bundlers_, which means their design, need and motivations are based around the need to assemble and optimize assets for the frontend, i.e. to bundle them. So creating a multi-entrypoint API for a library isn't _technically_ their use case, I suppose. However, the library I am currently working on will also benefit from asset optimization and -- generally -- all of the amazing automation that can be plugged into either of the bundler tools, whether it be CSS (pre-, post-) processing, image optimzation, minification, etc., etc. And so I still had a need for these tools, and thus couldn't rely solely on something like [BabelJS' CLI](https://babeljs.io/docs/en/babel-cli), or a custom script.

Although the below solution will work for Rollup (with modifications), we will use Webpack for the examples.

To understand how we can automate this, we need to understand two key aspect of how Webpack's API works:

1. [entries](https://webpack.js.org/concepts#entry). In short, a version of the `entry` API accepts an object with keys providing a unique ID for a module, and the value locating the module on the filesystem relative to the `webpack.config.js` file; and
1. Webpack's [output](https://webpack.js.org/concepts#output) API supports a special syntax which allows us to refer back to the unique entrypoint module ID, using the string `[name]` (square brackets included).

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

With this config, Webpack will create two output files:

1. `./dist/foo.js`, and
1. `./dist/bar.js`.

This is exactly what we want. However, this needs to automatic for all of our component files: we don't want the cognitive load to remember and update the config when we add or move a component in our library `src` folder. So, this is where the final piece comes in.

## Automating Webpack entrypoints
