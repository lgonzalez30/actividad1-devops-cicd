const { httpRequestsTotal, httpRequestDurationSeconds } = require('../metrics/register');

function resolveRoute(req) {
  if (req.baseUrl && req.route && req.route.path) {
    return `${req.baseUrl}${req.route.path}`;
  }

  if (req.route && req.route.path) {
    return req.route.path;
  }

  return req.path || 'unknown';
}

function httpMetricsMiddleware(req, res, next) {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const route = resolveRoute(req);
    const statusCode = String(res.statusCode);
    const durationInSeconds = Number(process.hrtime.bigint() - start) / 1e9;

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status_code: statusCode,
    });

    httpRequestDurationSeconds.observe(
      {
        method: req.method,
        route,
        status_code: statusCode,
      },
      durationInSeconds,
    );
  });

  next();
}

module.exports = {
  httpMetricsMiddleware,
};
