const config = require("../../config/config");
const express = require("express");
const expressJwt = require('express-jwt');
const { validate } = require("express-validation");
const paramValidation = require("../../config/param-validation");
const userCtrl = require("./user.controller");

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/users - Get list of users */
  .get(validate(paramValidation.listUsers), userCtrl.listUsers)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create)

  /** Patch /api/users/:userId - Update user */
  .patch(expressJwt({ secret: config.jwtSecret, algorithms: ['sha1', 'RS256', 'HS256'] }), validate(paramValidation.updateUser), userCtrl.update);

router
  .route("/:userId")
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param("userId", userCtrl.load);

module.exports = router;
