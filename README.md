# workerkit

A library to make writing Cloudflare Workers way nicer. An express style router is included

## installation

Install by running `npm i workerkit` or `yarn add workerkit` then import:

```js
const workerkit = require('workerkit');
// or
const { Worker, Router, API } = require('workerkit');
// or
import workerkit from 'workerkit';
// or
import { Worker, Router, API } from 'workerkit';
```

## example

```js
// setup for http handling
const worker = new Worker();
const router = new Router();

// setup for workers kv
const api = new API('cf_account_id', 'cf_api_email', 'cf_api_key');
const BOOKS = api.kv.get('kv_namespace_id');

// hello world function
router.any('.*/hello', req => {
  return new Request(`Hello from method ${req.method}!`);
});

// get the IDs of all books in the KV namespace
router.get('.*/books', async () => {
  const books = await BOOKS.keys();

  return new Request(books.map(book => book.name).join(', '));
});

worker.use(router);
worker.listen();
```

## documentation
https://workerkit.lcas.dev

## soon(tm)

- bulk Workers KV setting and deleting
- query params in req

## licence

MIT License
Copyright (c) 2019 Luca Casonato
Full licence in the LICENCE file.
