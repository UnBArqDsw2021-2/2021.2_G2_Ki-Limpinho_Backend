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
  .route("/:feedbackId")
  /** GET /api/feedbacks/:feedbackId - Get feedback */
  .get(feedbackCtrl.get)

  /** PATCH /api/feedbacks/:feedbackId - Update feedback */
  .patch(validate(paramValidation.updateFeedback), feedbackCtrl.update)

  /** DELETE /api/feedbacks/:feedbackId - Delete feedback */
  .delete(feedbackCtrl.remove);

router
  .route("/service/:serviceId")
  /** GET /api/feedbacks/service/:serviceId - Get feedback by service */
  .get(feedbackCtrl.getByService);

router
  .route("/rating/:serviceId")
  /** GET /api/feedbacks/rating/:serviceId - Get rating of a service */
  .get(feedbackCtrl.getRatingByService);

router
  .route("/user/:userId")
  /** GET /api/feedbacks/user/:userId - Get feedback by user */
  .get(feedbackCtrl.getByUser);


module.exports = router;
