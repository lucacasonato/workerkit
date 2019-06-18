import { Worker } from '../src/worker';
import { Router } from '../src/router';

// @ts-ignore
import { Request, Response } from 'whatwg-fetch';

test('Should respond to GET on /', async () => {
  const worker = new Worker();
  const router = new Router();
  router.get('/', () => new Response('Hello, world!'));
  worker.use(router);

  const request = new Request('https://example.com/', {
    method: 'GET',
  });
  const response = await worker.route(request);
  expect(response.status).toEqual(200);
  expect(await response.text()).toEqual('Hello, world!');
});

test('Should respond to POST on /', async () => {
  const worker = new Worker();
  const router = new Router();
  router.post('/', () => new Response('Hello, world!'));
  worker.use(router);

  const request = new Request('https://example.com/', {
    method: 'POST',
  });
  const response = await worker.route(request);
  expect(response.status).toEqual(200);
  expect(await response.text()).toEqual('Hello, world!');
});

test('Should respond to PATCH on /', async () => {
  const worker = new Worker();
  const router = new Router();
  router.patch('/', () => new Response('Hello, world!'));
  worker.use(router);

  const request = new Request('https://example.com/', {
    method: 'PATCH',
  });
  const response = await worker.route(request);
  expect(response.status).toEqual(200);
  expect(await response.text()).toEqual('Hello, world!');
});

test('Should respond to DELETE on /', async () => {
  const worker = new Worker();
  const router = new Router();
  router.delete('/', () => new Response('Hello, world!'));
  worker.use(router);

  const request = new Request('https://example.com/', {
    method: 'DELETE',
  });
  const response = await worker.route(request);
  expect(response.status).toEqual(200);
  expect(await response.text()).toEqual('Hello, world!');
});

test('Should respond to any on /', async () => {
  const worker = new Worker();
  const router = new Router();
  router.all(() => new Response('Hello, world!'));
  worker.use(router);

  const request = new Request(
    'https://example.com/this-is-not-the-correct-path',
    {
      method: 'DELETE',
    }
  );
  const response = await worker.route(request);
  expect(response.status).toEqual(200);
  expect(await response.text()).toEqual('Hello, world!');
});
