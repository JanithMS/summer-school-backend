const mongoose = require("mongoose");

const { Schema } = mongoose;

const productsSchema = new Schema({
    description:  {
        type: String,
        minlength: 2,
        required: true
    },
    date: { 
        type: Date,
        default: Date.now
    },
    starred: {
        type: Boolean,
        default: false
    }
  });

  module.exports = productsSchema;