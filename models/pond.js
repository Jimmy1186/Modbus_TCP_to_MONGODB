const mongoose = require("mongoose");

const pondSchema = new mongoose.Schema({
  DO: {
    type: Number,
    set: (value) => Math.abs(value*0.01).toFixed(2),
  },
  S: {
    type: Number,
    set: (value) => value.toFixed(2),
  },
  TEMP: {
    type: Number,
    set: (value) =>  value.toFixed(2),
  },
  ORP: {
    type: Number,
    set: (value) => value.toFixed(2),
  },
  PH: {
    type: Number,
    set: (value) => value.toFixed(2),
  },
  WL: {
    type: Number,
    set: (value) => value.toFixed(2),
  },
  IO: {
    type: Number,
    // set: (value) => Math.abs(value*0.01).toFixed(2),
  },
  TIME:{
    type:String,
    default:  moment(new Date()).format("YYYY-MM-DD h:mm:ss")
  }
});

const POND_1_COLLECTION = mongoose.model("pond_1", pondSchema);
const POND_2_COLLECTION = mongoose.model("pond_2", pondSchema);
const POND_3_COLLECTION = mongoose.model("pond_3", pondSchema);
const POND_4_COLLECTION = mongoose.model("pond_4", pondSchema);
const POND_5_COLLECTION = mongoose.model("pond_5", pondSchema);
const POND_6_COLLECTION = mongoose.model("pond_6", pondSchema);
const POND_7_COLLECTION = mongoose.model("pond_7", pondSchema);
const POND_8_COLLECTION = mongoose.model("pond_8", pondSchema);
const POND_9_COLLECTION = mongoose.model("pond_9", pondSchema);
const POND_10_COLLECTION = mongoose.model("pond_10", pondSchema);


module.exports = {
  POND_1_COLLECTION,
  POND_2_COLLECTION,
  POND_3_COLLECTION,
  POND_4_COLLECTION,
  POND_5_COLLECTION,
  POND_6_COLLECTION,
  POND_7_COLLECTION,
  POND_8_COLLECTION,
  POND_9_COLLECTION,
  POND_10_COLLECTION
};
