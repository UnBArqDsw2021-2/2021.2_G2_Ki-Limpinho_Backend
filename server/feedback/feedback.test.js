const mongoose = require("mongoose");
const request = require("supertest-as-promised");
const httpStatus = require("http-status");
const chai = require("chai"); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require("../../index");

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe("## Feedback APIs", () => {
  let feedback = {
    comment: "Amei a lavagem americana",
    rating: 5,
    service: "5c9b8b8f9c9d8b3f8c8b4b9f",
    ratingBy: "5c9b8b8f9c9d8b3f8c8b4b9f",
  };

  describe("# POST /api/feedbacks", () => {
    it("should create a new feedback", (done) => {
      request(app)
        .post("/api/feedbacks")
        .send(feedback)
        .expect(httpStatus.OK)
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

  describe("# GET /api/feedbacks/:feedbackId", () => {
    it("should get feedback details", (done) => {
      request(app)
        .get(`/api/feedbacks/${feedback._id}`)
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
        .get("/api/feedbacks/56c787ccc67fc16ccc1a5e92")
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal("Not Found");
          done();
        })
        .catch(done);
    });
  });

  describe("# PUT /api/feedbacks/:feedbackId", () => {
    it("should update feedback details", (done) => {
      feedback.comment = "Odiei a lavagem americana";
      request(app)
        .put(`/api/feedbacks/${feedback._id}`)
        .send(feedback)
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

  describe("# GET /api/feedbacks/", () => {
    it("should get all feedbacks", (done) => {
      request(app)
        .get("/api/feedbacks")
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });

    it("should get all feedbacks (with limit and skip)", (done) => {
      request(app)
        .get("/api/feedbacks")
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });
  });

  describe("# DELETE /api/feedbacks/", () => {
    it("should delete feedback", (done) => {
      request(app)
        .delete(`/api/feedbacks/${feedback._id}`)
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
});
