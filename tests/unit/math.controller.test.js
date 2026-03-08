const test = require('node:test');
const assert = require('node:assert/strict');
const { postMathSummary } = require('../../src/controllers/math.controller');

function createResponseDouble() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

test('postMathSummary returns a successful response', () => {
  const req = {
    body: {
      numbers: [5, 10, 15],
    },
  };
  const res = createResponseDouble();

  postMathSummary(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
    message: 'Math summary calculated successfully',
    data: {
      count: 3,
      sum: 30,
      average: 10,
      min: 5,
      max: 15,
    },
  });
});

test('postMathSummary returns a validation error when numbers is empty', () => {
  const req = {
    body: {
      numbers: [],
    },
  };
  const res = createResponseDouble();

  postMathSummary(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {
    error: 'numbers must be a non-empty array',
  });
});
