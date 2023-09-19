const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim:true,
      // minlength:5
    },
    lastName: {
      type: String,
      required: true,
      trim:true,
      // minlength:5
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // trim:true,
      // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim:true,
      // match: /^\+\d{1,3}\s?\d{1,14}$/,
    },
    address1: {
      type: String,
      required: true,
      trim:true,
    },
    address2: {
      type: String,
      trim:true,
    },
    country: {
      type: String,
      required: true,
      trim:true,
    },
    state: {
      type: String,
      required: true,
      trim:true,
    },
    city: {
      type: String,
      required: true,
      trim:true,
    },
    zipcode: {
      type: Number,
      required: true,
      trim:true,
      // min:[5],
      // max:[5]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema)