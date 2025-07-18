// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// CREATE task
router.post('/', async (req, res) => {
  const { text, description } = req.body;
  const task = new Task({ text, description });
  await task.save();
  res.json(task);
});

// UPDATE task
router.put('/:id', async (req, res) => {
  const { text, description } = req.body;
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    { text, description },
    { new: true }
  );
  res.json(updated);
});

// DELETE task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
