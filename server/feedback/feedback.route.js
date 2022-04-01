const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../../config/param-validation");
const feedbackCtrl = require("./feedback.controller");

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/feedbacks - Get list of feedbacks */
  .get(feedbackCtrl.listFeedbacks)

  /** POST /api/feedbacks - Create new feedback */
  .post(validate(paramValidation.createFeedback), feedbackCtrl.create);

router
  .route("/:feedbackID")
  /** GET /api/feedbacks/:feedbackID - Get feedback */
  .get(feedbackCtrl.get)

  /** PATCH /api/feedbacks/:feedbackID - Update feedback */
  .patch(validate(paramValidation.updateFeedback), feedbackCtrl.update)

  /** DELETE /api/feedbacks/:feedbackID - Delete feedback */
  .delete(feedbackCtrl.remove);

router
  .route("/service/:serviceID")
  /** GET /api/feedbacks/service/:serviceID - Get feedback by service */
  .get(feedbackCtrl.getByService);

router
  .route("/rating/:serviceID")
  /** GET /api/feedbacks/rating/:serviceID - Get rating of a service */
  .get(feedbackCtrl.getRatingByService);

router
  .route("/user/:userID")
  /** GET /api/feedbacks/user/:userID - Get feedback by user */
  .get(feedbackCtrl.getByUser);

/** Load feedback when API with feedbackID route parameter is hit */
router.param("feedbackID", feedbackCtrl.load);

module.exports = router;
