function getHome(_req, res) {
  res.status(200).json({
    name: 'actividad1-devops-cicd',
    message: 'Laboratorio DevOps activo',
    endpoints: ['/', '/health', '/metrics'],
  });
}

module.exports = {
  getHome,
};
