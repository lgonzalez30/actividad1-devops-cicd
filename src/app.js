const express = require('express');
const healthRoutes = require('./routes/health.routes');
const mathRoutes = require('./routes/math.routes');

const app = express();

app.use(express.json());
app.use('/health', healthRoutes);
app.use('/api/math', mathRoutes);

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Laboratorio DevOps activo',
  });
});

module.exports = app;
