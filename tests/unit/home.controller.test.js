const test = require('node:test');
const assert = require('node:assert/strict');
const { getHome } = require('../../src/controllers/home.controller');

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

test('getHome returns basic application metadata', () => {
  const res = createResponseDouble();

  getHome({}, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
    name: 'actividad1-devops-cicd',
    message: 'Laboratorio DevOps activo',
    endpoints: ['/', '/health', '/metrics'],
  });
});
