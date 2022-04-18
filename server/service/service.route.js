const express = require("express");
const { validate } = require("express-validation");
const paramValidation = require("../../config/param-validation");
const serviceCtrl = require("./service.controller");
const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/service - Get list of feedbacks */
  .get(serviceCtrl.listServices)

  /** POST /api/service - Create new feedback */
  .post(validate(paramValidation.createService), serviceCtrl.create);

router
  .route("/:serviceId")
  /** GET /api/service/:serviceId - Get feedback */
  .get(serviceCtrl.get)

  /** DELETE /api/service/:serviceId - Delete feedback */
  .delete(serviceCtrl.remove);


router
  .route("/user/:userId")
  /** GET /api/service/user/:userId - Get feedback by user */
  .get(serviceCtrl.getByUser);

module.exports = router;
