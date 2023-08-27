module.exports = app => {
    // Import controller
    const deals = require("../controllers/deal.controller.js");

    // Define router object
    var router = require("express").Router();

    // Create a new deal
    router.post("/", deals.create);

    // Retrieve all deals
    router.get("/", deals.findAll);

    // Retrieve all published deals
    router.get("/published", deals.findAllPublished);

    // Retrieve a single deal with id
    router.get("/:id", deals.findOne);

    // Update a deal with id
    router.put("/:id", deals.update);

    // Delete a deal with id
    router.delete("/:id", deals.delete);

    // Create a new deal
    router.delete("/", deals.deleteAll);

    
    app.use('/api/deals', router);
}