const mongoose = require("mongoose")

const brandsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image:{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
 },
});

module.exports = mongoose.model('Brands', brandsSchema);

 
