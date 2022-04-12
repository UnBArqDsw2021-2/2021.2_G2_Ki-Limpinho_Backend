const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

const ObjectId = mongoose.Types.ObjectId;
/**
 * Expenditure Schema
 * @private
 * @type {mongoose.Schema}
 * @property {Number} amount - The amount of money spent.
 * @property {Date} date - The date of the expenditure.
 * @property {Boolean} isFixed - Whether the expenditure is fixed or not.
 * @property {String} description - The description of the expenditure.
 * @property {String} title - The title of the expenditure.
 * @property {Date} createdAt - The date of creation.
 * @property {Date} updatedAt - The date of last update.
**/
const ExpenditureSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isFixed: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

ExpenditureSchema.pre("save", function (next) {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
}
);

ExpenditureSchema.pre("findOneAndUpdate", function (next) {
  now = new Date();
  this.updatedAt = now;
  next();
}
);
/**
 * Methods
 */

ExpenditureSchema.path("amount").get(function (v) {
  return Math.round(v * 100) / 100;
});

ExpenditureSchema.path("amount").set(function (v) {
  return Math.round(v * 100) / 100;
});

/**
 * Statics
 */

ExpenditureSchema.statics = {
  /**
   *  
   * @param {ObjectId} id - The objectId of expenditure.
   * @returns {Promise<Expenditure, APIError>}
   *  
   * @memberof Expenditure
   *  
   * @example
   * Expenditure.get(id)
   *  
  */



}

/**
 * @typedef Feedback
 */

module.exports = mongoose.model("Expenditure", ExpenditureSchema);