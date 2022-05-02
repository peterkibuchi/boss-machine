const express = require('express');
const {
  getAllFromDatabase, getFromDatabaseById,
  addToDatabase, updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

const minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);

  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send('Minion does not exist');
  }
});

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinionInstance);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = minionsRouter;
