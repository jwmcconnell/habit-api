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
  })

  .get('/:id', (req, res, next) => {
    Habit
      .findById(req.params.id)
      .then(habit => res.send(habit))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { habit, description } = req.body;
    const updateObj = {};

    habit ? updateObj.habit = habit : null;
    description ? updateObj.description = description : null;

    Habit
      .findByIdAndUpdate(
        req.params.id, 
        updateObj,
        { new: true }
      ).then(habit => res.send(habit))
      .catch(next);
  });
