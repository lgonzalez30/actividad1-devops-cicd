const express = require('express');
const healthRoutes = require('./routes/health.routes');
const metricsRoutes = require('./routes/metrics.routes');
const { getHome } = require('./controllers/home.controller');
const { httpMetricsMiddleware } = require('./middleware/http-metrics.middleware');

const app = express();

app.use(express.json());
app.use(httpMetricsMiddleware);
app.use('/health', healthRoutes);
app.use('/metrics', metricsRoutes);
app.get('/', getHome);

module.exports = app;
