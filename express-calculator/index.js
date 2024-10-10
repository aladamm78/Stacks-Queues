const express = require('express');
const app = express();

// Helper functions
function getNumbers(query) {
  if (!query.nums) {
    throw new Error("nums are required.");
  }

  let nums = query.nums.split(',').map(num => {
    let parsed = Number(num);
    if (isNaN(parsed)) {
      throw new Error(`${num} is not a number.`);
    }
    return parsed;
  });

  return nums;
}

function mean(nums) {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function median(nums) {
  nums.sort((a, b) => a - b);
  let middle = Math.floor(nums.length / 2);

  if (nums.length % 2 === 0) {
    return (nums[middle - 1] + nums[middle]) / 2;
  } else {
    return nums[middle];
  }
}

function mode(nums) {
  let frequency = {};
  let maxFreq = 0;
  let modes = [];

  nums.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
    }
  });

  for (let key in frequency) {
    if (frequency[key] === maxFreq) {
      modes.push(Number(key));
    }
  }

  return modes.length === 1 ? modes[0] : modes;
}

// Routes
app.get('/mean', (req, res) => {
  try {
    let nums = getNumbers(req.query);
    let result = mean(nums);
    return res.json({ operation: "mean", value: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.get('/median', (req, res) => {
  try {
    let nums = getNumbers(req.query);
    let result = median(nums);
    return res.json({ operation: "median", value: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.get('/mode', (req, res) => {
  try {
    let nums = getNumbers(req.query);
    let result = mode(nums);
    return res.json({ operation: "mode", value: result });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
