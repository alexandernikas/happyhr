const db = require("../models");
const Deal = db.tutorials;

// Create and Save a new Deal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.spot) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Deal
    const deal = new Deal({
        spot: req.body.spot,
        special: req.body.special,
        tags: req.body.tags,
        starts: req.body.starts,
        ends: req.body.ends,
        days: req.body.days,
        published: req.body.published ? req.body.published : false
    });
    console.log(db.url)
    // Save Deal in the database
    deal
        .save(deal)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the dealModel."
            });
        });
};

// Retrieve all Deals from the database.
exports.findAll = (req, res) => {
    const spot = req.query.spot;
    var condition = spot ? { spot: { $regex: new RegExp(spot), $options: "i" } } : {};

    Deal.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dealModels."
            });
        });
};

// Find a single Deal with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Deal.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Deal with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Deal with id=" + id });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Deal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Deal with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({ message: "Deal was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Deal with id=" + id
            });
        });
};

// Delete a Deal with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Deal with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.send({
                    message: "Deal was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Deal with id=" + id
            });
        });
};

// Delete all Deal from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Deals were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all deals."
            });
        });
};

// Find all published Deals
exports.findAllPublished = (req, res) => {
    Deal.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving deals."
            });
        });
};