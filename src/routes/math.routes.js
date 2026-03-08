const express = require('express');
const { postMathSummary } = require('../controllers/math.controller');

const router = express.Router();

router.post('/summary', postMathSummary);

module.exports = router;
