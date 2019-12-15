# cf-worker-kit

[![GitHub Actions](https://github.com/lucacasonato/workerkit/workflows/ci/badge.svg)](https://github.com/lucacasonato/workerkit/actions)
  
A library to make writing Cloudflare Workers way nicer. It implements routing and a nice Workers KV API for you. With this library you have to write considerably less boilerplate than a standard Cloudflare Worker.

## installation

Install by running `npm i cf-worker-kit` or `yarn add cf-worker-kit` then import:

```js
const workerkit = require('cf-worker-kit');
// or
const { Worker, Router, API } = require('cf-worker-kit');
// or
import workerkit from 'cf-worker-kit';
// or
import { Worker, Router, API } from 'cf-worker-kit';
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
  return new Response(`Hello from method ${req.method}!`);
});

// get the IDs of all books in the KV namespace
router.get('.*/books', async () => {
  const books = await BOOKS.keys();

  return new Response(books.map(book => book.name).join(', '));
});

worker.use(router);
worker.listen();
```

## documentation

https://workerkit.lcas.dev

## notes on Workers KV

If you are using KV in your worker only for `get`, `set` and `delete` operations, you should use the [native Worker KV API](https://workers.cloudflare.com/docs/reference/storage/api/#worker-api), because it is considerably faster because it is implemented as a native call in the Cloudflare Worker environment. As more functions become available in the native API, workerkit might start using these.

## soon(tm)

- bulk Workers KV setting and deleting
- query params in req
- make KV give better errors

## licence

MIT License
Copyright (c) 2019 Luca Casonato
Full licence in the LICENCE file.
