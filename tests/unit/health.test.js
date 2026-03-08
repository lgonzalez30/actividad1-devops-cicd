const test = require('node:test');
const assert = require('node:assert/strict');
const { buildMathSummary } = require('../../src/services/math.service');

test('health placeholder test', () => {
  assert.equal(1, 1);
});

test('buildMathSummary returns the expected statistics', () => {
  const result = buildMathSummary([2, 4, 6, 8]);

  assert.deepEqual(result, {
    count: 4,
    sum: 20,
    average: 5,
    min: 2,
    max: 8,
  });
});

test('buildMathSummary throws an error for an empty array', () => {
  assert.throws(() => buildMathSummary([]), {
    message: 'numbers must be a non-empty array',
  });
});

test('buildMathSummary throws an error for invalid values', () => {
  assert.throws(() => buildMathSummary([1, '2', 3]), {
    message: 'all values in numbers must be valid numbers',
  });
});
