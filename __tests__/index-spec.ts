import * as index from '../src/index';

test('Should have Worker available', () => {
  expect(index.Worker).toBeTruthy();
});

test('Should have Router available', () => {
  expect(index.Router).toBeTruthy();
});
