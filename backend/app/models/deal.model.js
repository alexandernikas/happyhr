module.exports = mongoose => {
  var schema = new mongoose.Schema({
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

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Deal = mongoose.model("deal", schema);
  return Deal;
};