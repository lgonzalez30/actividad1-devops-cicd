const { buildMathSummary } = require('../services/math.service');

function postMathSummary(req, res) {
  try {
    const { numbers } = req.body;
    const summary = buildMathSummary(numbers);

    res.status(200).json({
      message: 'Math summary calculated successfully',
      data: summary,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message || 'Unexpected error',
    });
  }
}

module.exports = {
  postMathSummary,
};
