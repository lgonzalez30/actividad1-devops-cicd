const { register } = require('../metrics/register');

async function getMetrics(_req, res) {
  res.set('Content-Type', register.contentType);
  res.status(200).send(await register.metrics());
}

module.exports = {
  getMetrics,
};
