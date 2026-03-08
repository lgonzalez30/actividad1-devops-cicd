function getHealth(_req, res) {
  res.status(200).json({
    status: 'ok',
    service: 'actividad1-devops-cicd',
  });
}

module.exports = {
  getHealth,
};
