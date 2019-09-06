const { Router } = require('express');
const Habit = require('../models/Habit');

module.exports = Router()
  .get('/', (req, res, next) => {
    Habit
      .find({})
      .then(habits => res.send(habits))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    const { habit, description } = req.body;
    Habit
      .create({ habit, description, user: 'someuserid' })
      .then(habit => res.send(habit))
      .catch(next);
  });
