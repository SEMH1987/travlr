const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips lists all the trips
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // returns resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// GET tripCode lists a single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code' : req.params.tripCode }) // Return single record
        .exec();

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // returns resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /trips adds a new trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Model({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const savedTrip = await newTrip.save();
        if (!savedTrip) {
            return res.status(400).json({ message: "Trip not saved" });
        }
        return res.status(201).json(savedTrip);
    } catch (err) {
        return res.status(400).json(err);
    }
};

// PUT: /trips/:tripCode - Updates an existing Trip
const tripsUpdateTrip = async (req, res) => {

    // Uncomment for debugging
    // console.log(req.params);
    // console.log(req.body);

    try {
        const q = await Model
            .findOneAndUpdate(
                { 'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                { new: true } // Returns the updated document
            )
            .exec();

        if (!q) {
            return res
                .status(400)
                .json({ message: "Trip not found" });
        } else {
            return res
                .status(201)
                .json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};