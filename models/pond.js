const mongoose = require("mongoose");

const pondSchema = new mongoose.Schema({
  DO: {
    type: Number,
    set: (value) => Math.abs(Math.abs(value * 0.01)),
  },
  S: {
    type: Number,
    set: (value) => Math.abs(value * 0.001).toFixed(2),
  },
  TEMP: {
    type: Number,
    set: (value) => Math.abs(value * 0.001).toFixed(2),
  },
  ORP: {
    type: Number,
    set: (value) => Math.abs(value * 0.01).toFixed(2),
  },
  PH: {
    type: Number,
    set: (value) => Math.abs(value * 0.0001).toFixed(2),
  },
  WL: {
    type: Number,
    set: (value) => Math.abs(value * 0.00005).toFixed(2),
  },
  IO: {
    type: Number,
    set: (value) => Math.abs(value*0.01).toFixed(2),
  },
});

const POND_1_COLLECTION = mongoose.model("pond_1", pondSchema);//the mongodb collection will be "pond_1"


module.exports = {
  POND_1_COLLECTION,
};
