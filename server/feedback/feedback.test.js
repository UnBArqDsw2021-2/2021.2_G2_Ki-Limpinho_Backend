const mongoose = require("mongoose");
const request = require("supertest");
const httpStatus = require("http-status");
const chai = require("chai");
const expect = chai.expect;
const app = require("../../index");

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe("## Feedback APIs", () => {
  let feedback = {
    comment: "Amei a lavagem americana",
    rating: 5,
    service: "624786d8b0cb7760736a3d6f",
    ratingBy: "5c9b8b8f9c9d8b3f8c8b4b9f",
  };

  describe("# POST /api/feedback", () => {
    it("should create a new feedback", (done) => {
      request(app)
        .post("/api/feedback")
        .send(feedback)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.comment).to.equal(feedback.comment);
          expect(res.body.rating).to.equal(feedback.rating);
          expect(res.body.service).to.equal(feedback.service);
          expect(res.body.ratingBy).to.equal(feedback.ratingBy);
          feedback = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/feedback/:feedbackId", () => {
    it("should get feedback details", (done) => {
      request(app)
        .get(`/api/feedback/${feedback._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.comment).to.equal(feedback.comment);
          expect(res.body.rating).to.equal(feedback.rating);
          expect(res.body.service).to.equal(feedback.service);
          expect(res.body.ratingBy).to.equal(feedback.ratingBy);
          done();
        })
        .catch(done);
    });

    it("should report error with message - Not found, when feedback does not exists", (done) => {
      request(app)
        .get("/api/feedback/56c787ccc67fc16ccc1a5e92")
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal("Not Found");
          done();
        })
        .catch(done);
    });
  });

  describe("# Patch /api/feedback/:feedbackId", () => {
    it("should update feedback details", (done) => {
      let update = {
        updates: [
          {
            chave: "comment",
            valor: "Odiei a lavagem americana",
          },
        ],
      };
      request(app)
        .patch(`/api/feedback/${feedback._id}`)
        .send(update)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.comment).to.equal("Odiei a lavagem americana");
          expect(res.body.rating).to.equal(feedback.rating);
          expect(res.body.service).to.equal(feedback.service);
          expect(res.body.ratingBy).to.equal(feedback.ratingBy);
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/feedback/", () => {
    it("should get all feedbacks", (done) => {
      request(app)
        .get("/api/feedback")
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });

    it("should get all feedbacks (with limit and skip)", (done) => {
      request(app)
        .get("/api/feedback")
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/feedback/service/:serviceId", () => {
    it("should get all feedbacks by service", (done) => {
      request(app)
        .get(`/api/feedback/service/${feedback.service}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });
  });
  describe("# GET /api/feedback/rating/:serviceId", () => {
    it("should get average rating by service", (done) => {
      request(app)
        .get(`/api/feedback/rating/${feedback.service}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.media).to.equal(5);
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/feedback/user/:userId", () => {
    it("should get all feedbacks by user", (done) => {
      request(app)
        .get(`/api/feedback/user/${feedback.ratingBy}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });
  });
  describe("# DELETE /api/feedback/", () => {
    it("should delete feedback", (done) => {
      request(app)
        .delete(`/api/feedback/${feedback._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.comment).to.equal("Odiei a lavagem americana");
          expect(res.body.rating).to.equal(feedback.rating);
          expect(res.body.service).to.equal(feedback.service);
          expect(res.body.ratingBy).to.equal(feedback.ratingBy);
          done();
        })
        .catch(done);
    });
    it("should get no content because the feedback already is deleted", (done) => {
      request(app)
        .delete(`/api/feedback/${feedback._id}`)
        .expect(httpStatus.NO_CONTENT)
        .then((res) => {
          done();
        })
        .catch(done);
    });
  });
});
