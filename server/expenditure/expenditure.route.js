const express = require('express');
const {validate} = require("express-validation")
const paramValidation = require("../../config/param-validation");
const ExpenditureCtrl = require("./expenditure.controller");

const router = express.Router();

router.
  route("/")
  .post(validate(paramValidation.createExpenditure), ExpenditureCtrl.create);

  module.exports = router;