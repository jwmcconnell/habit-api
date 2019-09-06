const { Router } = require('express');
const Habit = require('../models/Habit');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .get('/', ensureAuth, (req, res, next) => {
    Habit
      .find({})
      .then(habits => res.send(habits))
      .catch(next);
  })

  .post('/', ensureAuth, (req, res, next) => {
    const { habit, description } = req.body;
    Habit
      .create({ habit, description, user: req.user.sub })
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
  })

  .delete('/:id', (req, res, next) => {
    Habit
      .findByIdAndDelete(req.params.id)
      .then(habit => res.send(habit))
      .catch(next);
  });
