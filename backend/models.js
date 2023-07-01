const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
    spot: {
        type: String,
        required: true,
      },
    special: {
        type: String,
        required: true,
      },
    tags: {
        type: [String],
        required: true,
      },
    starts: {
        type: String,
        required: true,
      },
    ends: {
        type: String,
        required: true,
      },
    
    days: {
        type: [String],
        required: true,
      }

 });

const Deal = mongoose.model("Deal", dealSchema);

module.exports = Deal;

