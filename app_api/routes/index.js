const express = require('express');
const router = express.Router();

// Import controllers
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList)         // GET method routes tripList
  .post(tripsController.tripsAddTrip);     // POST method Adds a Trip

// GET and PUT methods for trips by code - requires parameter
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip); // PUT method Updates a Trip

module.exports = router;