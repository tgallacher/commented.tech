---
title: 'Thoughts on Flowtype and Typescript in 2019'
date: '2019-04-17'
labels: flowtype, typescript
hero:
  img: './hero.jpg'
  credit: Photo by <a href="https://unsplash.com/photos/czDvRp5V2b0">Alvaro Pinot</a> on <a href="https://unsplash.com/search/photos/structure">Unsplash</a>
---

## Typescript

- Not just typing, JS superset
- Contains language features not native/supported in JS
- Contains features available at compile time, not runtime -> misleading, e.g. `readonly`, `protected`, `private` access; `implements` class "contracting", etc
- Requires additional/separate tooling, e.g. TSLint, TSC - remove Babel, ESLint

## Flowtype

- config supported by 1 additional file, and a Babel plugin, ESlint plugin
- poorer IDE integration, e.g. VSCode
- Fewer stars on Github
- Difficult to understand error msgs (less of a problem these days)
