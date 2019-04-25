---
title: 'Flowtype and Typescript in 2019'
date: '2019-04-27'
labels: flowtype, typescript
hero:
  img: './hero.jpg'
  credit: Photo by <a href="https://unsplash.com/photos/czDvRp5V2b0">Alvaro Pinot</a> on <a href="https://unsplash.com/search/photos/structure">Unsplash</a>
---

The existence of [Typescript](http://www.typescriptlang.org/) and [Flowtype](https://flow.org/) in the JS community are relatively well known, and have been long established for at least a few years, with Typescript being the longer-standing and more mature of the two. In this post I would like to throw out some of my thoughts on each of these as additions to any project (large or small), and add to the ongoing discussion around which you should choose; if any.

> The first thing to call out up front is that there is no "_right_" choice. There are too many variables involved with each developer, project, and/or company needs or restrictions. This is more of an attempt to provide another perspective so that hopefully the choice is easier to make.

## First, the why

As the JS ecosystem has continued to mature and grow over the years, so too has the complexity of web apps, and their data consumption. The likes of [ReactJS](https://reactjs.org/), [AngularJS](https://angularjs.org/), and [VueJS](https://vuejs.org/) have only simplified how engineers can better manage this type of complexity on the frontend, at scale; and with speed, compared to, for example, the days of jQuery.

With this growing complexity in apps and their need to support consuming, sharing, manipulating and managing wide -- and typically varying -- data structures, it becomes increasingly common to hit some of the classic -- and hard to debug -- JS errors: "`Cannot access foo of undefined`", or "`.barbaz() is not a function`", and many others like these. And with these hard to debug errors, pace and confidence begin to dissipate.

<!-- As a result, it wasn't long before JS' rapid prototyping benefits -- as is often the selling point with dynamically typed, interpreted languages in general -- that I actually found myself being slower instead of faster. With the growing complexity of these apps and their support for sharing, manipulating and managing wide and potentially varying data structures throughout a given codebase, I often increasingly ran into some of the classic -- and hard to debug -- JS errors: "`Cannot access foo of undefined`", or "`.barbaz() is not a function`", and many others like these. -->

The solution to managing this complexity with scale and pace, and to catch these common bugs early, ironically, is to introduce _types_ to our code. Typing our code provides realtime feedback (in a supported IDE), as well as allows us to check code at the PR step, therefore allowing us to leverage CI tooling to prevent bugs being introduced to the mainline of the project. However, we still want to enjoy the fast pace of development that working with a dynamically typed, interpreted language brings. We instead would like to land somewhere in the middle, and that is exactly what [static type checking](https://hackernoon.com/i-finally-understand-static-vs-dynamic-typing-and-you-will-too-ad0c2bd0acc7) provides.

<!-- ## Then, What and Why? -->

<!-- The rapid growth and adoption of the "big 3" modern frontend stacks, [ReactJS](https://reactjs.org/), [AngularJS](https://angularjs.org/), and [VueJS](https://vuejs.org/), over the last few years has also seen with it the complexity of web apps grow as well. -->

<!-- These stacks provide a robust, scalable and predictable approach to building enriched web apps and has unlocked the ability to build performant, dynamic, data-driven UIs. With this growing complexity, and increased pressure to deliver features fast, there exists an larger opportunity for bugs to creep into production. -->

<!-- To mitigate this problem, one potential solution could be to increase the breadth of your test suite. However, more tests don't always translate to better apps (a topic for a later discussion). Instead, we need a lower effort way to ensure consistency: consistency and confidence in how we write, consume and manipulate data throughout an entire web app. This is where [static type checking](https://hackernoon.com/i-finally-understand-static-vs-dynamic-typing-and-you-will-too-ad0c2bd0acc7) comes to the rescue. -->

<!-- As a ReactJS user, the following will be skewed in that direction. Also, as I have considerably more experience with Flowtype, we'll start there. -->

The following is an summary of my perspective on the most popular JS static type checkers, Flowtype and Typescript. I had a brief intro to Typescript in 2015 (with React + Redux), before moving to a new position and introducing and working with Flowtype for approx. 18 months. Over the last 6 - 9 months, I have picked Typescript again, and now continue to use a mixture of both: some projects are Typescript, some Flowtype, some none at all. This is where I have landed based on my exposure so far.

- Flowtype `v0.80`
- Typescript `v3.4`

## Flowtype

> Flow is a static type checker for javascript.
>
> &mdash; https://flow.org/

Flowtype

- config supported by 1 additional file, and a Babel plugin, ESlint plugin
- poorer IDE integration, e.g. VSCode
- Fewer stars on Github
- Difficult to understand error msgs (less of a problem these days)

## Typescript

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
>
> &mdash; http://www.typescriptlang.org/

- Not just typing, JS superset
- Contains language features not native/supported in JS
- Contains features available at compile time, not runtime -> misleading, e.g. `readonly`, `protected`, `private` access; `implements` class "contracting", etc
- Requires additional/separate tooling, e.g. TSLint, TSC - remove Babel, ESLint
