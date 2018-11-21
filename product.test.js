const product = require('./product');

test('multiply 2 and 3 to equal 6', () => {
  expect(product(2, 3)).toBe(6);
});