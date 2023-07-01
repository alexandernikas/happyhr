const express = require("express");
const dealModel = require("./models");
const app = express.Router();

// post deal
app.post("/add_deal", async (request, response) => {
    const deal = new dealModel(request.body);
  
    try {
      await deal.save();
      response.send(deal);
    } catch (error) {
      response.status(500).send(error);
    }
});

// get deals
app.get("/deals", async (request, response) => {
    const deals = await dealModel.find({});
  
    try {
      response.send(deals);
    } catch (error) {
      response.status(500).send(error);
    }
  });

// export APIs
module.exports = app;