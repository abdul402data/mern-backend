// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('GET /tasks error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CREATE task
router.post('/', async (req, res) => {
  try {
    const { text, description } = req.body;
    const task = new Task({ text, description });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error('POST /tasks error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE task
router.put('/:id', async (req, res) => {
  try {
    const { text, description } = req.body;
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { text, description },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(`PUT /tasks/${req.params.id} error:`, err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(`DELETE /tasks/${req.params.id} error:`, err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
