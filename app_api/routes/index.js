const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

// Import controllers
const tripsController = require('../controllers/trips');
const authController = require("../controllers/authentication");

// method to authenticate our JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (authHeader == null) {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.sendStatus(401);
  }
  
  let headers = authHeader.split(' ');
  if (headers.length < 1) {
    console.log('Not enough tokens in Auth Header: ' + headers.length);
    return res.sendStatus(501);
  }
  
  const token = authHeader.split(' ')[1];
  
  if (token == null) {
    console.log('Null Bearer Token');
    return res.sendStatus(401);
  }
  
  const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      return res.sendStatus(401).json('Token Validation Error!');
    }
    req.auth = verified; // sets auth 
  });
  
  next(); // continue or this will hang forever
}

// Define route for user registration
router.route("/register").post(authController.register);

// Define route for login endpoint
router
  .route('/login')
  .post(authController.login);

// define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList)         // get method routes tripList 
  .post(authenticateJWT, tripsController.tripsAddTrip);     // post method adds a Trip

// get and put methods for trips by code 
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)       // get method 
  .put(authenticateJWT, tripsController.tripsUpdateTrip); // put method Updates a trip 

module.exports = router;