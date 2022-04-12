const Expenditure = require("./expenditure.model");
const APIError = require("../helpers/APIError");
const mongoose = require("mongoose");
const httpStatus = require("http-status");

const ObjectId = mongoose.Types.ObjectId;

const apiExpenditure = {

  /**
   * Create a new expenditure
   * @property {string} req.body.amount - The amount of money spent.
   * @property {string} req.body.date - The date of the expenditure.
   * @property {string} req.body.description - The description of the expenditure.
   * @property {string} req.body.isFixed - Whether the expenditure is fixed or not.
   * @property {string} req.body.title - The title of the expenditure.
   * @returns {Expenditure}
   * 
   */
  async create(req, res, next)  {
    try {
      const expenditure = new Expenditure(req.body);
      await expenditure.save();
      return res.status(httpStatus.CREATED).json(expenditure);
    } catch (err) {
      return next(new APIError(err.message, httpStatus.BAD_REQUEST));
    }
  }
};

module.exports = apiExpenditure;