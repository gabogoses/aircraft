const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const planeSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  nationalOrigin: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  unitCost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  propulsion: {
    type: String,
    required: true
  },
  engineModel: {
    type: String,
    required: true
  },
  enginePower: {
    type: Number,
    required: true
  },
  crew: {
    type: Number,
    required: true
  },
  maxSeating: {
    type: Number
  },
  speed: {
    type: Number,
    required: true
  },
  serviceCeiling: {
    type: Number,
    required: true
  },
  range: {
    type: Number,
    required: true
  },
  emptyWeight: {
    type: Number,
    required: true
  },
  maxTakeoffWeight: {
    type: Number,
    required: true
  },
  maxLandingWeight: {
    type: Number,
    required: true
  },
  wingSpan: {
    type: String,
    required: true
  },
  wingArea: {
    type: Number,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  firstFlight: {
    type: String,
    required: true
  },
  productionStatus: {
    type: String,
    required: true
  },
  productionRange: {
    type: String,
    required: true
  },
  totalProduction: {
    type: Number,
    required: true
  },
  variants: {
    type: String
  },
  icaoCode: {
    type: String,
    required: true
  },
  iataCode: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Plane", planeSchema);
