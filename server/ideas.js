const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
  getAllFromDatabase, getFromDatabaseById, 
  addToDatabase, updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

const ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);

  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send('Idea does not exist');
  }
});

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  const updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdeaInstance);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = ideasRouter;
