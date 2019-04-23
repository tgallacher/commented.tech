---
title: 'Thoughts on Flowtype and Typescript in 2019'
date: '2019-04-17'
labels: flowtype, typescript
hero:
  img: './hero.jpg'
  credit: Photo by <a href="https://unsplash.com/photos/czDvRp5V2b0">Alvaro Pinot</a> on <a href="https://unsplash.com/search/photos/structure">Unsplash</a>
---

The existence of [Typescript](http://www.typescriptlang.org/) and [Flowtype](https://flow.org/) in the JS community are relatively well known, and have been long established for at least a few years, with Typescript being the longer-standing and more mature of the two. In this post I would like to throw out some of my thoughts on each of these as additions to any project (large or small), and add to the ongoing discussion around which you should choose.

> The first thing to call out up front is that there is no "_right_" choice. There are too many variables involved with each developer, project, and/or company needs or restrictions. This is more of an attempt to provide another perspective so that hopefully the choice is easier to make.

## First, the why

As the JS ecosystem has continued to mature and grow over the years, the complexity of web apps, and their data consumption, has continued to grow at the same pace. The likes of [ReactJS](https://reactjs.org/), [AngularJS](https://angularjs.org/), and [VueJS](https://vuejs.org/) have only simplified how engineers can better manage this type of complexity on the frontend, at scale; and with speed, compared to, for example, the days of jQuery.

However, with the growing complexity of apps and their need to support consuming, sharing, manipulating and managing wide -- and potentially varying -- data structures, it becomes often increasingly common to be faced or bogged down by some of the classic -- and hard to debug -- JS errors: "`Cannot access foo of undefined`", or "`.barbaz() is not a function`", and many others like these. And with these hard to debug errors, speed and confidence begin to dwindle.

<!-- As a result, it wasn't long before JS' rapid prototyping benefits -- as is often the selling point with dynamically typed, interpreted languages in general -- that I actually found myself being slower instead of faster. With the growing complexity of these apps and their support for sharing, manipulating and managing wide and potentially varying data structures throughout a given codebase, I often increasingly ran into some of the classic -- and hard to debug -- JS errors: "`Cannot access foo of undefined`", or "`.barbaz() is not a function`", and many others like these. -->

The solution to managing this complexity with scale and pace, ironically, is to introduce _type checking_ to these apps. With type checking, engineers get realtime feedback if variables, data, or whatever were to be used in a way that was contradictory to how they were declared to be used: For example, trying to run `foo.map()` on foo, which was declared to be an `Object`. Better to get that feedback before you ship to production! A very familiar experience if you have ever worked with _strongly typed_ languages, such as C, C++, Java, etc.

However, we still want to capitalise on JS' core "protoyping at pace" benefits -- as it is still a dynamically typed, interpreted language. This is where Typescript or Flowtype come in: by providing [static type checking](https://hackernoon.com/i-finally-understand-static-vs-dynamic-typing-and-you-will-too-ad0c2bd0acc7).

Static type checking provides a half-way house between building quick and fast, but still being able to add realtime feedback to the code you create, where there is value to be had for that extra overhead: Writing and managing type information takes a bit more effort than not having it, so we only want to do it where the complexity demands it. Type checking is also a lower-cost alternative to increasing your test suite coverage, which is more code to write and maintain!

<!-- ## Then, What and Why? -->

<!-- The rapid growth and adoption of the "big 3" modern frontend stacks, [ReactJS](https://reactjs.org/), [AngularJS](https://angularjs.org/), and [VueJS](https://vuejs.org/), over the last few years has also seen with it the complexity of web apps grow as well. -->

<!-- These stacks provide a robust, scalable and predictable approach to building enriched web apps and has unlocked the ability to build performant, dynamic, data-driven UIs. With this growing complexity, and increased pressure to deliver features fast, there exists an larger opportunity for bugs to creep into production. -->

<!-- To mitigate this problem, one potential solution could be to increase the breadth of your test suite. However, more tests don't always translate to better apps (a topic for a later discussion). Instead, we need a lower effort way to ensure consistency: consistency and confidence in how we write, consume and manipulate data throughout an entire web app. This is where [static type checking](https://hackernoon.com/i-finally-understand-static-vs-dynamic-typing-and-you-will-too-ad0c2bd0acc7) comes to the rescue. -->

<!-- As a ReactJS user, the following will be skewed in that direction. Also, as I have considerably more experience with Flowtype, we'll start there. -->

As with anything in the JS ecosystem, the "goal posts are always moving". In that, the pros and cons that are listed below are likely to be inaccurate over time as each project continues to improve their product. I'll try to keep this up to date over time, as big changes are made to either platform. For now, the following summary is based on:

- Flowtype `v0.97`
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
