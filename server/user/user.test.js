const mongoose = require("mongoose");
const request = require("supertest");
const httpStatus = require("http-status");
const chai = require("chai"); 
const expect = chai.expect;
const app = require("../../index");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");


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

describe("## User APIs", () => {
  let user = {
    name: "Teste",
    email: "teste@gmail.com",
    cpf: "04604857192",
    password: "123456",
  };
  describe("# POST /api/user", () => {
    it("should create a new user", (done) => {
      request(app)
        .post("/api/user")
        .send(user)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.name).to.equal(user.name);
          expect(res.body.email).to.equal(user.email);
          expect(res.body.cpf).to.equal(user.cpf);
          user = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/user/:userId", () => {
    it("should get user details", (done) => {
      request(app)
        .get(`/api/user/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(user.name);
          expect(res.body.email).to.equal(user.email);
          expect(res.body.cpf).to.equal(user.cpf);
          expect(res.body.password).to.equal(user.password);
          done();
        })
        .catch(done);
    });

    it("should report error with message - Not found, when user does not exists", (done) => {
      request(app)
        .get("/api/user/56c787ccc67fc16ccc1a5e92")
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal("Not Found");
          done();
        })
        .catch(done);
    });
  });

  describe("# PATCH /api/user/:userId", () => {
    it("should update user details", (done) => {
      user.name = "João";
      let update = {
        updates: [
          {
            chave: "name",
            valor:"João",
          },
        ],
      };
      const token = jwt.sign(
        {
          idUser: user._id,
        },
        config.jwtSecret
      );
      request(app)
        .patch(`/api/user`)
        .set('Authorization', 'Bearer ' + token)
        .send(update)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal("João");
          expect(res.body.email).to.equal(user.email);
          expect(res.body.cpf).to.equal(user.cpf);
          expect(res.body.password).to.equal(user.password);
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/user/", () => {
    it("should get all users", (done) => {
      request(app)
        .get("/api/user")
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });

    it("should get all users (with limit and skip)", (done) => {
      request(app)
        .get("/api/user")
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });
  });

  // describe("# DELETE /api/user/", () => {
  //   it("should delete user", (done) => {
  //     request(app)
  //       .delete(/api/user/${user._id})
  //       .expect(httpStatus.OK)
  //       .then((res) => {
  //         expect(res.body.name).to.equal("changed name");
  //         expect(res.body.email).to.equal(user.email);
  //         expect(res.body.cpf).to.equal(user.cpf);
  //         expect(res.body.password).to.equal(user.password);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });
});