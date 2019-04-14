---
title: Thoughts on static type checking in JavaScript
date: '2019-04-??'
labels: flowtype, typescript
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
