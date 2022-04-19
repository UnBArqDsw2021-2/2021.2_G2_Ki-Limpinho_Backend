const express = require("express");
const { validate } = require("express-validation");
const paramValidation = require("../../config/param-validation");
const serviceCtrl = require("./service.controller");
const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/service - Get list of services */
  .get(validate(paramValidation.listServices), serviceCtrl.listServices)

  /** POST /api/service - Create new service */
  .post(validate(paramValidation.createService), serviceCtrl.create);

router
  .route("/:serviceId")
  /** GET /api/service/:serviceId - Get service */
  .get(serviceCtrl.get)

  /** DELETE /api/service/:serviceId - Delete service */
  .delete(serviceCtrl.remove);

router
  .route("/user/:userId")
  /** GET /api/service/user/:userId - Get service by user */
  .get(serviceCtrl.getServicesByUserId);

module.exports = router;
