const test = require('node:test');
const assert = require('node:assert/strict');
const { getMetrics } = require('../../src/controllers/metrics.controller');
const { register } = require('../../src/metrics/register');

function createResponseDouble() {
  return {
    statusCode: 200,
    body: '',
    headers: {},
    set(name, value) {
      this.headers[name] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(payload) {
      this.body = payload;
      return this;
    },
  };
}

test('getMetrics returns Prometheus-compatible content', async () => {
  const res = createResponseDouble();

  await getMetrics({}, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.headers['Content-Type'], register.contentType);
  assert.match(res.body, /process_cpu_user_seconds_total|process_cpu_seconds_total|nodejs_eventloop/);
});
