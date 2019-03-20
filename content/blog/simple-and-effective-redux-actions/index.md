---
title: Simple and Effective Redux Actions
date: '2019-03-20'
labels: redux
---

Redux has been the staple for ReactJS (and other) apps for some years, and has completely transformed the frontend landscape for building complex and dynamic client-side apps ever since.

One of the common pain points, however, is often referred to as the "_Redux boilerplate_" - create your [actions](https://redux.js.org/basics/actions), [action creators](https://redux.js.org/basics/actions#action-creators), [reducers](https://redux.js.org/basics/reducers), and so on; And traditionally, each of these are defined across several files, e.g. `src/actions.js`, `src/reducer.js`, etc.

From this pain, a host of community provided plugins have appeared and disappeared over the years with the aim to help solve this particular problem. However, in my opinion, these typically offer more bloat and pain than they save, not least of which as you have to learn a completely new API for a package; just to save creating some code for another app dependency / package (in this case Redux)...

In my experience, we can solve most of the headaches using some key ingredients:

1. Adopting [Flux Standard Actions](https://github.com/redux-utilities/flux-standard-action) (FSAs)
1. Adding a simple tip to this usage (more on that below), and
1. Adopting the Redux [ducks](https://github.com/erikras/ducks-modular-redux) proposal.

## Flux Standard Actions (FSAs)

This post is more about bringing these ingredients together, so this part will be very quick - for those interested, please read more about FSAs on the [original docs](https://github.com/redux-utilities/flux-standard-action).

As we know, standard Redux actions are nothing more than JS objects, for example:

```js
const getUsers = {
  type: 'FETCH.USERS',
};
```

The `type` key is the only requirement; the rest of the content is entirely up to you. FSAs on the other hand, prescribe a predefined top-level (depth = 1) structure to the JS object. Namely,

```js
const getUsers = {
  payload: { data },
  error: false,
  meta: { metadata },
  type: 'FETCH.USERS',
};
```

<small>Here, we are not using '`action creators`', and so are assuming that both `data` and `metadata` are defined in scope wherever this action is used.</small>

Here, like classic Redux actions, only the `type` key is required. When you want to add more data, you simply add it to the relevant field which is defined as part of the FSA spec. While this might seem a bit trivial, in JS, this can help **a lot**; particularly when you come to write your reducers for pulling out data received from upstream APIs. But maybe more of that later in a future post. For now, it is the `error` key that we can use to help simplify our life.

## FSAs: A simple tip

My simple tip is specific to actions which store data; i.e. those which are typically dispatched when a side-effect has completed and we need to update our [Redux store](https://redux.js.org/basics/store) with the data. Typically, this use case is usually achieved by creating an assortment of action constants, action creators and actions to align with each part of the response process, e.g:

Define our action constants for each stage:

```js
// src/actions/constants.js
export const USERS_FETCH = 'USERS.FETCH.REQUEST';
export const USERS_FETCH_SUCCESS = 'USERS.FETCH.SUCCESS';
export const USERS_FETCH_ERROR = 'USERS.FETCH.ERROR';
```

Then, define an action creator for each of these stages:

```js
// src/actions/index.js
import * as C from './constants.js';

export const getUsers = () => ({
  type: C.USERS_FETCH',
});

export const getUsersSuccess = (data) => ({
  type: C.USERS_FETCH_SUCCESS,
  data,
})

export const getUsersError = (error) => ({
  type: C.USERS_FETCH_SUCCESS,
  error,
});
```

With these action creators, `getUsers` tells our chosen Redux middleware (highly recommend [Redux Sagas](https://redux-saga.js.org)) to make the API request; `getUsersSuccess` indicates the response completed successfully and we have some data to store; and finally, `getUsersError` indicates something went wrong and we are passing along a suitable error to handle appropriately.

Now, imagine we do this for all the different resources (API calls) that we might need for our app. Scaling this approach gets ugly and unwieldy very fast.

As an example, an app that I built in the past required 14 different API calls in order to gather all the necessary data for **1 page**. This solution would have been painful.

Instead, I arrived at this simple tip, which has served me well ever since:

> Compress you action types into 2 contexts: 1) make a request, and 2) complete a request.

Then use FSA to help automatically decipher which type of request completion was received. The "automatic" part is simply just checking the data type of data received, i.e. is it an instance of the Error object?

Taking our example above:

```js
// src/actions/constants.js
export const USERS_FETCH = 'USERS.FETCH.REQUEST';
export const USERS_FETCH_COMPLETE = 'USERS.FETCH.COMPLETE';
```

Then, define an action creator for each of these stages:

```js
// src/actions/index.js
import * as C from './constants.js';

export const getUsers = () => ({
  type: C.USERS_FETCH',
});

export const getUsersComplete = (data) => ({
  payload: { data },
  error: data instanceof Error,
  type: C.USERS_FETCH_COMPLETE,
})
```

In this example, we still signal we want to make a request as before, but we have simplified how we communicate the response -- and of what type it is -- into one action creator / constant.

As a result, we have fewer action creators and constants to manage; our action creators/constant are still semantic, and thus self documenting; the error flag is set automatically; the data structure -- error or otherwise -- is consistent across the full app, and so less prone to error; the required logic handling needed inside our reducers is simpler; and, we haven't added any additional dependencies to solve this problem!

## Bring it together for the magic "V"

> Insert obligatory [90's movie reference](https://www.imdb.com/title/tt0104868/)

The final benefit comes by combining the above into the Redux ducks proposal. This allows to solve another common (ReactJS) problem: file management.

Using the above example, we consolidate all of our Redux action pieces into a single _ducks_ file:

```js
// src/ducks.js
export const USERS_FETCH = 'USERS.FETCH.REQUEST';
export const USERS_FETCH_COMPLETE = 'USERS.FETCH.COMPLETE';

export const getUsers = () => ({
  type: USERS_FETCH',
});

export const getUsersComplete = (data) => ({
  payload: { data },
  error: data instanceof Error,
  type: USERS_FETCH_COMPLETE,
})

export default (prevState, action) => {
  // reducer logic...
};
```

Now, we've reduced the file count into 1; removed the need to export/import the constants, which can become difficult when the size of the app or number of (API) resources it needs grows; can easily see how the context of this set of actions fit together from a single view; and have simplified the maintainability and scalability -- this scales really well when increasing the action context / resource count of a given app (maybe more on that in a future post).

## Wrap up

And that's pretty much it. Here, we solved the common "_Redux boilerplate_" problems without adding additional dependencies to our app by adopting the following combination of simple tweaks to our Redux setup:

1. incorporating Flux Standard Actions;
1. Compress you action response types into a single `*_COMPLETED` type;
1. Set the FSA `error` boolean based on the primitive type of your payload data; and,
1. incorporating the Redux ducks proposal.

Also, with this approach, we have also seen that adopting these simple tweaks will help lay the foundations in your Redux app to produce a highly scalable and easily maintainable Redux approach, that will save you time and time again.

Any feedback, questions or comments, you can see me sporadically hanging in Twitter. Alternatively, feel free to raise a Github issue on the repo for this site (all links below).
