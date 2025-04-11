// server/routes/goalRoutes.js

const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const Task = require('../models/Task');

// GET goals
router.get('/goals', async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
});

// GET tasks for goal
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find({ goalId: req.query.goalId });
  res.json(tasks);
});

module.exports = router;
