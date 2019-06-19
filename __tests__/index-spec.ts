import * as index from '../src/index';

test('Should have Worker available', () => {
  expect(index.Worker).toBeTruthy();
});

test('Should have Router available', () => {
  expect(index.Router).toBeTruthy();
});

test('Should have API available', () => {
  expect(index.API).toBeTruthy();
});

test('Should have KV available', () => {
  expect(index.KV).toBeTruthy();
});
