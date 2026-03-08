function validateNumbers(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    const error = new Error('numbers must be a non-empty array');
    error.statusCode = 400;
    throw error;
  }

  const hasInvalidValues = numbers.some((value) => typeof value !== 'number' || Number.isNaN(value));

  if (hasInvalidValues) {
    const error = new Error('all values in numbers must be valid numbers');
    error.statusCode = 400;
    throw error;
  }
}

function buildMathSummary(numbers) {
  validateNumbers(numbers);

  const sum = numbers.reduce((total, current) => total + current, 0);
  const count = numbers.length;
  const average = sum / count;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return {
    count,
    sum,
    average,
    min,
    max,
  };
}

module.exports = {
  buildMathSummary,
};
