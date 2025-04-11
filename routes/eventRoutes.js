// server/routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// POST create new event
router.post('/', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

// PUT update event
router.put('/:id', async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE event
router.delete('/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
